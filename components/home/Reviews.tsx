"use client";

import { useCallback, useRef, useState } from "react";
import { GoogleG, Lines, Reveal, Stars } from "../shared";
import TestimonialMarquee from "@/components/ui/marquee-01";
import { REVIEWS, SITE } from "@/lib/config";

/**
 * Bewertungen als Swipe-Karussell mit Scroll-Snap, Zähler und Punkten.
 * exclude: Namen, deren Zitat an anderer Stelle derselben Seite schon vorkommt.
 */
export default function Reviews({ exclude = [] }: { exclude?: string[] }) {
  const items = REVIEWS.filter((r) => !exclude.includes(r.name));
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.getBoundingClientRect().width + 16;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  }, [items.length]);

  const goTo = (i: number) => {
    const el = scroller.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-28" aria-label="Google-Bewertungen">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-8">
          <Lines className="display text-[2.3rem] leading-[1.05] md:text-7xl" lines={["5,0 Sterne aus 23 Bewertungen"]} />
          <Reveal className="flex items-center gap-4">
            <GoogleG className="h-9 w-9" />
            <div>
              <Stars className="text-lg" />
              <p className="text-sm text-ink-soft">{SITE.google.rating} bei Google · {SITE.google.count} Bewertungen</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:hidden"
      >
        {items.map((r, i) => (
          <figure
            key={r.name}
            aria-label={`Bewertung ${i + 1} von ${items.length}`}
            className="flex w-[78vw] max-w-[22rem] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-white p-6"
          >
            <div>
              <Stars />
              <blockquote className="mt-4 font-serif text-[1.45rem] leading-[1.22] md:mt-5 md:text-[1.65rem]">„{r.text}“</blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 text-sm md:mt-8">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream font-serif text-lg">{r.name[0]}</span>
              <span>
                <span className="block font-medium">{r.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-ink-soft"><GoogleG className="h-3 w-3" /> Google-Bewertung</span>
              </span>
            </figcaption>
          </figure>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>

      {/* Desktop: Endlos-Laufband, pausiert bei Hover */}
      <div className="mt-14 hidden md:block">
        <TestimonialMarquee reviews={items.map((r) => ({ name: r.name, username: "Google-Bewertung", body: r.text }))} />
      </div>

      <div className="mx-auto mt-4 flex max-w-[88rem] items-center justify-between px-5 md:hidden">
        <p className="text-sm text-ink-soft" aria-live="polite">{active + 1} / {items.length}</p>
        <div className="flex">
          {items.map((r, i) => (
            <button
              key={r.name}
              onClick={() => goTo(i)}
              aria-label={`Zur Bewertung ${i + 1}`}
              aria-current={i === active}
              className="grid h-11 w-6 place-items-center"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-ink" : "w-2 bg-ink/25"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[88rem] flex-col gap-3 px-5 sm:flex-row md:mt-10 md:px-10">
        <a href={SITE.google.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">Alle Bewertungen auf Google</a>
        <a href={SITE.google.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Bewertung schreiben</a>
      </div>
    </section>
  );
}
