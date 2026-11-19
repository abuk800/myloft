"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Lines, Photo, Reveal } from "../shared";
import { OCCASIONS } from "@/lib/config";

export default function Occasions() {
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-14 md:px-10 md:py-36">
      <Lines className="display max-w-3xl text-[2.3rem] leading-[1.05] md:text-7xl" lines={["Was willst du machen?"]} />

      <div className="mt-6 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-5">
        {OCCASIONS.map((o, i) => {
          const wide = i % 3 === 0;
          const full = i === 6;
          return (
            <Reveal key={o.slug} delay={(i % 4) * 0.07} className={full ? "col-span-2 md:col-span-4" : wide ? "col-span-2 md:col-span-2" : ""}>
              <Link
                href={`/anlaesse/${o.slug}`}
                className={`zoom group relative block overflow-hidden rounded-2xl bg-cream ${
                  full ? "aspect-[16/11] md:aspect-[21/8]" : wide ? "aspect-[16/11] md:aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <Photo k={o.tile ?? o.image} pos={o.tilePos} sizes={wide ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"} w={1200} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 via-40% to-transparent to-70% transition-opacity duration-500 group-hover:from-black/90" />
                <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-active:opacity-100 md:right-4 md:top-4">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                  <p className="display text-[1.3rem] leading-[1.05] hyphens-auto break-words [text-shadow:0_1px_10px_rgba(0,0,0,.65)] md:text-3xl" lang="de">{o.title}</p>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-[0.82rem] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.7)] opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100 group-active:max-h-12 group-active:opacity-100 max-md:max-h-12 max-md:opacity-100">
                    {o.short}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
