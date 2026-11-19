"use client";

import Link from "next/link";
import { Lines, Photo, Reveal, ArrowLink } from "../shared";
import { CAM_ITEMS } from "@/lib/cam";
import { SITE } from "@/lib/config";

export default function CamTeaser() {
  const items = CAM_ITEMS.slice(0, 8);
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
          <Lines className="display mt-5 text-[2.7rem] md:text-6xl" lines={["Dein Shooting an unserer Wand"]} />
          <Reveal>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
              Im Studio hängen QR-Codes. Scan, hochladen, fertig: Deine Lieblingsbilder landen (nach Freigabe) hier, mit deinem @Handle. Mehr Reichweite für dich, echter Content für uns.
            </p>
            <p className="mt-4 text-sm text-ink-soft">Oder poste mit <strong className="font-medium text-ink">{SITE.hashtag}</strong>.</p>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/galerie" className="btn btn-dark">Zur Galerie</Link>
              <ArrowLink href="/galerie/upload">Bilder hochladen</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="columns-2 gap-3 md:col-span-8 md:gap-4">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={(i % 2) * 0.08} className="mb-3 break-inside-avoid md:mb-4">
              <div className={`zoom group relative overflow-hidden rounded-xl bg-cream ${it.ratio}`}>
                <Photo k={it.k} sizes="(min-width:768px) 30vw, 50vw" w={900} />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-10 text-sm text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100">
                  {it.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
