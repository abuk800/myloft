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
      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-6">
          <Lines className="display text-[2.6rem] md:text-[4.6rem]" lines={["Feiern im Loft:", "750 € für den ganzen Tag"]} />
          <Reveal>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/80">
              Geburtstag, Babyparty, Workshop oder Community-Event. Die Tafel steht, du bringst die Gäste mit. Die Pauschale gilt bis {EVENT.validUntil}.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
            {EVENT.items.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.05} className="flex items-center gap-3 text-base text-white/90">
                <Ico name={it.icon} className="h-5 w-5 shrink-0 text-champagne" />
                {it.label}
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/events/anfragen" className="btn btn-gold">Termin anfragen</Link>
            <Link href="/events" className="btn btn-line-light">Mehr zur Location</Link>
          </div>
          <p className="mt-5 text-sm text-white/70"><TodoTag>TODO</TodoTag> Preis ab 2027 und max. Gästezahl ergänzen</p>
        </div>

        <div className="relative md:col-span-6">
          <motion.div style={{ y: y1 }} className="relative aspect-[4/5] overflow-hidden rounded-2xl md:ml-auto md:w-[80%]">
            <Photo k="tableWhite" sizes="(min-width:768px) 40vw, 100vw" w={1400} />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden rounded-2xl border-[6px] border-night md:-bottom-14 md:-left-6"
          >
            <Photo k="tableCandles" sizes="(min-width:768px) 20vw, 46vw" w={800} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
