"use client";

import Link from "next/link";
import { Eyebrow, Lines, Photo, Reveal, TodoTag } from "../ui";
import { SITE } from "@/lib/config";

export default function About() {
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-cream">
            <Photo k="brightRoom" sizes="(min-width:768px) 40vw, 100vw" w={1200} />
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] text-ink-soft backdrop-blur">
            <TodoTag>TODO</TodoTag> Foto von {SITE.owner}
          </span>
        </Reveal>

        <div className="md:col-span-7">
          <Eyebrow className="text-ink-soft">Über uns</Eyebrow>
          <Lines className="display mt-5 text-[2.7rem] md:text-7xl" lines={["Mete macht das", <em key="a">Studio zum Zuhause.</em>]} />
          <Reveal>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              {SITE.owner} ist der Inhaber von MYLOFT STUDIO. In den Google-Bewertungen wird er immer wieder genannt: herzlich, hilfsbereit, er nimmt sich Zeit. Bei uns muss niemand Profi sein. <em className="font-serif text-xl text-ink">A place for everyone.</em>
            </p>
            <figure className="mt-10 border-l border-gold pl-6">
              <blockquote className="font-serif text-3xl leading-tight md:text-4xl">„Der Inhaber ist unglaublich sympathisch und herzlich.“</blockquote>
              <figcaption className="mt-3 text-sm text-ink-soft">Chrisa MO · Google-Bewertung ★★★★★</figcaption>
            </figure>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/buchen" className="btn btn-dark">Studio buchen</Link>
              <Link href="/#kontakt" className="btn btn-line">Kontakt</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
