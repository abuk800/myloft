"use client";

import { GoogleG, Lines, Reveal, Stars } from "../shared";
import { REVIEWS, SITE } from "@/lib/config";

export default function Reviews() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Lines className="display mt-5 text-[2.7rem] md:text-7xl" lines={["5,0 Sterne aus 23 Bewertungen"]} />
          </div>
          <Reveal className="flex items-center gap-4">
            <GoogleG className="h-9 w-9" />
            <div>
              <Stars className="text-lg" />
              <p className="text-sm text-ink-soft">{SITE.google.rating} bei Google · {SITE.google.count} Bewertungen</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 md:scroll-px-10 overflow-x-auto px-5 pb-4 md:mt-16 md:px-10 md:[padding-inline:max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.07} className="shrink-0 snap-start">
            <figure className="flex h-full w-[80vw] max-w-[22rem] flex-col justify-between rounded-2xl border border-line bg-white p-7 md:w-[22rem] md:p-8">
              <div>
                <Stars />
                <blockquote className="mt-5 font-serif text-[1.65rem] leading-[1.2]">„{r.text}“</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cream font-serif text-lg">{r.name[0]}</span>
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="flex items-center gap-1.5 text-sm text-ink-soft"><GoogleG className="h-3 w-3" /> Google-Bewertung</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>

      <Reveal className="mx-auto mt-10 flex max-w-[88rem] flex-col gap-3 px-5 sm:flex-row md:px-10">
        <a href={SITE.google.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">Alle Bewertungen auf Google</a>
        <a href={SITE.google.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Bewertung schreiben</a>
      </Reveal>
    </section>
  );
}
