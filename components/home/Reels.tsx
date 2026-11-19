"use client";

import { Lines, Reveal, InstagramIcon } from "../shared";
import Loop from "../Loop";
import { VIDEO, type VideoKey } from "@/lib/images";
import { SITE } from "@/lib/config";

const REELS: VideoKey[] = ["shooting", "farben", "geburtstag", "setup"];

/** Kurze Loops aus dem Studio: auf dem Handy seitlich wischbar, am Desktop vier Karten nebeneinander. */
export default function Reels() {
  return (
    <section className="bg-night py-16 text-white md:py-28">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Lines className="display text-[2.5rem] md:text-6xl" lines={["Das Studio in Bewegung"]} />
          <Reveal>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-line-light">
              <InstagramIcon className="h-5 w-5" /> Mehr Reels auf Instagram
            </a>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 after:w-px after:shrink-0 after:content-[''] md:mt-14 md:grid md:snap-none md:grid-cols-4 md:overflow-visible md:px-10 md:[padding-inline:max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
        {REELS.map((v, n) => (
          <Reveal key={v} delay={n * 0.08} className="w-[68vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <figure>
              <Loop v={v} className="aspect-[2/3] overflow-hidden rounded-2xl bg-night-2" />
              <figcaption className="mt-3 text-sm text-white/75">{VIDEO[v].label}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
