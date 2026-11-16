"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Ico, Lines, Photo, Reveal, TodoTag } from "../ui";
import { EVENT } from "@/lib/config";

export default function EventTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section ref={ref} id="events" className="relative overflow-hidden bg-night py-24 text-white md:py-36">
      <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(233,214,166,0.14),transparent)]" />
      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-6">
          <p className="eyebrow text-champagne">Eventlocation</p>
          <Lines className="display mt-5 text-[2.9rem] md:text-[5.2rem]" lines={["Feiern im Loft:", <em key="a" className="text-champagne">750 € für den</em>, <em key="b" className="text-champagne">ganzen Tag.</em>]} />
          <Reveal>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/70">
              Geburtstag, Babyparty, Workshop oder Community-Event. Die Tafel steht, du bringst die Gäste mit.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagne/40 px-4 py-2 text-xs tracking-wide text-champagne">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Pauschale gilt bis {EVENT.validUntil}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
            {EVENT.items.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.05} className="flex items-center gap-3 text-sm text-white/85">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15">
                  <Ico name={it.icon} className="h-[1.1rem] w-[1.1rem] text-champagne" />
                </span>
                {it.label}
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/events/anfragen" className="btn btn-gold">Termin anfragen</Link>
            <Link href="/events" className="btn btn-line-light">Mehr zur Location</Link>
          </div>
          <p className="mt-5 text-xs text-white/40"><TodoTag>TODO</TodoTag> Preis ab 2027 und max. Gästezahl ergänzen</p>
        </div>

        <div className="relative md:col-span-6">
          <motion.div style={{ y: y1 }} className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] md:ml-auto md:w-[80%]">
            <Photo k="tableWhite" sizes="(min-width:768px) 40vw, 100vw" w={1400} />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden rounded-[1.3rem] border-[6px] border-night shadow-2xl md:-bottom-14 md:-left-6"
          >
            <Photo k="tableCandles" sizes="(min-width:768px) 20vw, 46vw" w={800} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
