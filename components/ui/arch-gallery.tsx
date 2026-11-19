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
// Defaults (lokale Studiofotos)
// ---------------------------------------------------------------------------
const DEFAULT_ITEMS: GalleryItem[] = [
  { image: { src: '/studio/sofa-sessel.jpg', alt: 'Cream boucle armchair on a white set' } },
  { image: { src: '/studio/model-weisse-wuerfel.jpg', alt: 'Model lying on white cubes' } },
  { image: { src: '/studio/schwanger-tuell.jpg', alt: 'Maternity shoot in a pink tulle gown' } },
  { image: { src: '/studio/produkt-haarmarke-model.jpg', alt: 'Product shoot with a clothing rail' } },
  { image: { src: '/studio/treppe-gelaender-hd.jpg', alt: 'Model on the open staircase' } },
  { image: { src: '/studio/event-opening-kerzen.jpg', alt: 'Opening event with balloons and candlelit tables' } },
  { image: { src: '/studio/familie-logo-wand.jpg', alt: 'Family on cream sofas below the studio logo' } },
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
