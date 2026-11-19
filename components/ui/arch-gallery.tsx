'use client';

import { useState, type CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
//
// items         Gallery entries — image src and optional alt
// cardWidth     Card width in px
// cardHeight    Card height in px
// cornerRadius  Border radius in px
// className     Styles for the outer shell
//
export type GalleryItem = {
  image: { src: string; alt?: string };
};

export type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

// ---------------------------------------------------------------------------
// Defaults (Unsplash-Platzhalter, alle IDs geprüft)
// ---------------------------------------------------------------------------
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=75`;

const DEFAULT_ITEMS: GalleryItem[] = [
  { image: { src: u('1784653548770-23c8f9022c4c'), alt: 'Bright loft with cream sofas' } },
  { image: { src: u('1771371097061-3befd4b71b59'), alt: 'Large white hall with sofas' } },
  { image: { src: u('1776673449578-69107b0b9cb1'), alt: 'White staircase with lantern' } },
  { image: { src: u('1471341971476-ae15ff5dd4ea'), alt: 'Photo studio with softboxes' } },
  { image: { src: u('1767070805821-60c701885151'), alt: 'Long table with white chairs' } },
  { image: { src: u('1789381565507-c95875c82157'), alt: 'Grey modular sofa in a bright room' } },
  { image: { src: u('1543752330-bf0c7055f5bc'), alt: 'Christmas tree with red baubles' } },
];

const ROTATE_STEP = 6;
const Y_STEP = 18;
const OVERLAP = 0.58;
const HOVER_SCALE = 1.08;
const HOVER_LIFT = 16;

/** Breite der Bühne in px (für responsive Berechnungen von außen). */
export function archGalleryStageWidth(count: number, cardWidth: number) {
  const mid = (count - 1) / 2;
  return cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
}

export function ArchGallery({
  items = DEFAULT_ITEMS,
  cardWidth = 180,
  cardHeight = 240,
  cornerRadius = 18,
  className = '',
}: ArchGalleryProps) {
  const deck = items.length ? items : DEFAULT_ITEMS;
  const total = deck.length;
  const mid = (total - 1) / 2;
  const [hovered, setHovered] = useState<number | null>(null);

  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 48;

  return (
    <div
      className={['flex w-full items-center justify-center py-10', className]
        .filter(Boolean)
        .join(' ')}
      role='group'
      aria-label='Image gallery'
    >
      <div
        className='relative'
        style={{ width: stageWidth, height: stageHeight }}
      >
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * Y_STEP;
          const translateX = offset * cardWidth * OVERLAP;
          const baseZ = total - Math.abs(offset);
          const isHovered = hovered === index;

          const cardStyle: CSSProperties = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            marginTop: -cardHeight / 2,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            transformOrigin: 'center center',
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
              : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
            zIndex: isHovered ? total + 1 : baseZ,
            transition:
              'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms',
            boxShadow:
              '0 12px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            backgroundColor: '#f3f4f6',
          };

          return (
            <div
              key={`${entry.image.src}-${index}`}
              style={cardStyle}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-label={entry.image.alt || `Photo ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.image.src}
                alt={entry.image.alt || ''}
                draggable={false}
                className='pointer-events-none absolute inset-0 h-full w-full select-none object-cover'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
