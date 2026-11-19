"use client";

import { useEffect, useRef, useState } from "react";
import { InstagramIcon, Lines, Reveal } from "../shared";
import { ArchGallery, archGalleryStageWidth, type GalleryItem } from "@/components/ui/arch-gallery";
import { IMG, src, type ImgKey } from "@/lib/images";
import { SITE } from "@/lib/config";

/**
 * Bilder der Instagram-Sektion: Shootings und Raum aus dem Studio-Fundus.
 * Die Mitte des Fächers ist das größte Bild, daher steht das beste Motiv an Position 4.
 * TODO: automatisch aus dem Profil laden (Instagram Graph API, braucht Zugriffstoken des Studios).
 */
const FAN: ImgKey[] = ["shotSport", "shotStairs", "sofaChair", "hairModel", "pregnantTulle", "cubeModel", "shotPet"];

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export default function InstagramGrid() {
  const [ref, width] = useWidth<HTMLDivElement>();

  // 7 Karten, auf schmalen Bildschirmen 5; Kartenbreite so, dass der Fächer hineinpasst
  const count = width && width < 640 ? 5 : 7;
  const fit = Math.floor((width || 360) / (archGalleryStageWidth(count, 100) / 100)) - 4;
  const cardWidth = Math.max(72, Math.min(190, fit));
  const cardHeight = Math.round(cardWidth * 1.33);

  const keys = count === 5 ? FAN.slice(1, 6) : FAN;
  const items: GalleryItem[] = keys.map((k) => ({ image: { src: src(IMG[k], 700), alt: IMG[k].alt } }));

  return (
    <section className="bg-cream/60 py-16 md:py-24">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Lines className="display text-[2.7rem] md:text-7xl" lines={[<em key="a">{SITE.instagram.handle}</em>]} />
            <Reveal><p className="mt-4 max-w-lg text-sm text-ink-soft">{SITE.instagram.followers} Follower · {SITE.igBio}</p></Reveal>
          </div>
          <Reveal>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <InstagramIcon className="h-5 w-5" /> Auf Instagram folgen
            </a>
          </Reveal>
        </div>

        <div ref={ref} className="mt-6 md:mt-10">
          <ArchGallery items={items} cardWidth={cardWidth} cardHeight={cardHeight} cornerRadius={cardWidth > 120 ? 18 : 12} className="py-6 md:py-10" />
        </div>
      </div>
    </section>
  );
}
