"use client";

import { Play } from "lucide-react";
import { Eyebrow, InstagramIcon, Lines, Photo, Reveal } from "../ui";
import { IG_TILES } from "@/lib/cam";
import { SITE } from "@/lib/config";

export default function InstagramGrid() {
  return (
    <section className="bg-cream/60 py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow className="flex items-center gap-2 text-ink-soft"><InstagramIcon className="h-4 w-4" /> Instagram</Eyebrow>
            <Lines className="display mt-5 text-[2.7rem] md:text-7xl" lines={[<em key="a">{SITE.instagram.handle}</em>]} />
            <Reveal><p className="mt-4 text-sm text-ink-soft">{SITE.instagram.followers} Follower · Events | Foto | Video | Podcast | Content</p></Reveal>
          </div>
          <Reveal>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Auf Instagram folgen</a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-2 md:mt-16 md:grid-cols-6 md:gap-3">
          {IG_TILES.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.06}>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beitrag auf Instagram ansehen"
                className="zoom group relative block aspect-[4/5] overflow-hidden rounded-xl bg-cream-deep"
              >
                <Photo k={t.k} sizes="(min-width:768px) 15vw, 33vw" w={600} />
                {t.reel && (
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                )}
                <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7 text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
