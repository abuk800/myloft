"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InstagramIcon, Lines, Reveal } from "../shared";
import Loop from "../Loop";
import { ArchGallery, archGalleryStageWidth, type GalleryItem } from "@/components/ui/arch-gallery";
import { IMG, src, VIDEO, type ImgKey, type VideoKey } from "@/lib/images";
import { SITE } from "@/lib/config";

const REELS: VideoKey[] = ["shooting", "farben", "geburtstag", "setup"];

/** Fächer der Customer Cam: bewusst Bilder, die weiter oben auf der Startseite nicht vorkommen. */
const FAN: ImgKey[] = ["shotMasterclass", "shotSport", "shotBW", "hairSofa", "shotCube", "stillKinder", "kidCube"];

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

/**
 * Eine Social-Sektion statt drei: Instagram-Kopf, Reels (Video-Loops) und Customer-Cam-Fächer.
 * TODO-frei: Live-Daten aus dem Profil brauchen einen Instagram-Zugriffstoken des Studios (Graph API).
 */
export default function Social() {
  const [ref, width] = useWidth<HTMLDivElement>();
  const count = width && width < 640 ? 5 : 7;
  const fit = Math.floor((width || 360) / (archGalleryStageWidth(count, 100) / 100)) - 4;
  const cardWidth = Math.max(72, Math.min(180, fit));
  const cardHeight = Math.round(cardWidth * 1.33);
  const keys = count === 5 ? FAN.slice(1, 6) : FAN;
  const items: GalleryItem[] = keys.map((k) => ({ image: { src: src(IMG[k], 700), alt: IMG[k].alt } }));

  return (
    <section className="bg-cream/60 py-12 md:py-24">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Lines className="display text-[2.3rem] leading-[1.05] md:text-7xl" lines={[SITE.instagram.handle]} />
            <Reveal><p className="mt-3 max-w-lg text-sm text-ink-soft">{SITE.instagram.followers} Follower · {SITE.igBio}</p></Reveal>
          </div>
          <Reveal>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <InstagramIcon className="h-5 w-5" /> Auf Instagram folgen
            </a>
          </Reveal>
        </div>
      </div>

      {/* Reels */}
      <div className="no-scrollbar mt-7 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 after:w-px after:shrink-0 after:content-[''] md:mt-12 md:grid md:snap-none md:grid-cols-4 md:gap-4 md:overflow-visible md:px-10 md:[padding-inline:max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
        {REELS.map((v) => (
          <figure key={v} className="w-[46vw] max-w-[14rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <Loop v={v} className="aspect-[2/3] overflow-hidden rounded-2xl bg-night-2" />
            <figcaption className="mt-2 text-sm text-ink-soft">{VIDEO[v].label}</figcaption>
          </figure>
        ))}
      </div>

      {/* Customer Cam */}
      <div className="mx-auto mt-10 max-w-[88rem] border-t border-ink/10 px-5 pt-8 md:mt-16 md:px-10 md:pt-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h3 className="font-serif text-[1.9rem] leading-tight md:text-5xl">Dein Shooting an unserer Wand</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              Im Studio hängen QR-Codes: scannen, Lieblingsbilder hochladen, nach Freigabe erscheinst du hier. Oder poste mit {SITE.hashtag}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/galerie" className="btn btn-dark">Zur Galerie</Link>
            <Link href="/galerie/upload" className="btn btn-line">Bilder hochladen</Link>
          </div>
        </div>
        <div ref={ref} className="mt-2 md:mt-6">
          <ArchGallery items={items} cardWidth={cardWidth} cardHeight={cardHeight} cornerRadius={cardWidth > 120 ? 18 : 12} className="py-4 md:py-8" />
        </div>
      </div>
    </section>
  );
}
