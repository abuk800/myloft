import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Ico, Photo, Reveal, TodoTag } from "@/components/shared";
import { EVENT, OCCASIONS, WA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Eventlocation Oberursel bei Frankfurt",
  description: "Eventlocation in Oberursel: 66 Stühle, 6 Bankett-Tische, Küche, Getting-Ready-Room, zwei Etagen und Reinigung. 750 € ganztägig bis 31.12.2026.",
};

const STEPS = [
  { n: "01", t: "Anfragen", d: "Anlass, Wunschdatum und Gästezahl in vier kurzen Schritten." },
  { n: "02", t: "Wir melden uns", d: "Antwort meist innerhalb von X Stunden." },
  { n: "03", t: "Feiern", d: "Du bringst die Gäste mit. Tische, Stühle und Küche sind bereit." },
];

export default function EventsPage() {
  return (
    <div className="bg-night text-white">
      <PageHero k="eventOpening" pos="50% 40%" eyebrow="Eventlocation" lines={["Feiern, wo", <em key="a">andere shooten.</em>]} sub="Zwei Etagen, festliche Tafel und Küche. Alles steht, du bringst nur die Gäste mit.">
        <Link href="/events/anfragen" className="btn btn-gold">Termin anfragen</Link>
        <a href="#ausstattung" className="btn btn-line-light">Ausstattung</a>
      </PageHero>

      <section className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="display mt-4 text-[6rem] leading-none text-champagne md:text-[11rem]">750 €</p>
              <p className="mt-4 font-serif text-3xl md:text-4xl">für den ganzen Tag.</p>
            </Reveal>
          </div>
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-white/70">
              Inklusive Möbel, Küche, Getting-Ready-Room und Reinigung danach. Das Angebot gilt bis {EVENT.validUntil}.
            </p>
            <p className="mt-4 text-sm text-white/70"><TodoTag>{EVENT.todo.price2027}</TodoTag></p>
            <Link href="/events/anfragen" className="btn btn-gold mt-8">Termin anfragen</Link>
          </Reveal>
        </div>
      </section>

      <section id="ausstattung" className="mx-auto max-w-[88rem] scroll-mt-16 px-5 pb-24 md:px-10 md:pb-36">
        <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Das gehört zur Ausstattung.</h2>
        <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
          {EVENT.items.map((it) => (
            <li key={it.label} className="flex items-center gap-5 border-b border-white/15 py-5 font-serif text-2xl md:text-3xl">
              <Ico name={it.icon} className="h-6 w-6 shrink-0 text-champagne" /> {it.label}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <TodoTag>{EVENT.todo.sqm}</TodoTag>
          <TodoTag>{EVENT.todo.capacity}</TodoTag>
          <TodoTag>{EVENT.todo.parking}</TodoTag>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          <Reveal className="col-span-2 md:col-span-7"><div className="zoom relative aspect-[16/11] overflow-hidden rounded-2xl"><Photo k="eventBirthday" sizes="(min-width:768px) 58vw, 100vw" w={1600} /></div></Reveal>
          <Reveal delay={0.1} className="md:col-span-5"><div className="zoom relative aspect-[4/5] overflow-hidden rounded-2xl md:h-full md:aspect-auto"><Photo k="eventPaint" sizes="(min-width:768px) 40vw, 50vw" w={1000} /></div></Reveal>
          <Reveal delay={0.15} className="md:col-span-5"><div className="zoom relative aspect-[4/5] overflow-hidden rounded-2xl"><Photo k="roomCurtain" sizes="(min-width:768px) 40vw, 50vw" w={1000} /></div></Reveal>
          <Reveal delay={0.2} className="col-span-2 md:col-span-7"><div className="zoom relative aspect-[16/11] overflow-hidden rounded-2xl md:h-full md:aspect-auto"><Photo k="roomMezzanine" sizes="(min-width:768px) 58vw, 100vw" w={1600} /></div></Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-2 py-24 md:py-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <h2 className="display text-[2.5rem] md:text-6xl">So läuft&apos;s</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <p className="font-serif text-6xl text-champagne">{s.n}</p>
                <p className="mt-4 font-serif text-3xl">{s.t}</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                  {s.d.includes("X Stunden") ? <>Antwort meist innerhalb von <TodoTag>X</TodoTag> Stunden.</> : s.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
        <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Was wird bei dir gefeiert?</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {OCCASIONS.filter((o) => o.cta === "event").concat(OCCASIONS.filter((o) => o.slug === "bestie-shoot")).map((o) => (
            <Link key={o.slug} href={`/anlaesse/${o.slug}`} className="btn btn-line-light">{o.title}</Link>
          ))}
        </div>
        <div className="mt-16 max-w-3xl">
          <Faq dark items={[
            { q: "Was kostet die Location?", a: "750 € ganztägig. Das Angebot gilt bis 31.12.2026." },
            { q: "Was ist alles enthalten?", a: "66 Stühle, 6 große Bankett-Tische, Tischdecken, Küche, zwei Toiletten, Getting-Ready-Room, zwei Stockwerke und die Reinigung danach." },
            { q: "Wie viele Gäste passen rein?", a: "Es stehen 66 Stühle bereit. Die maximale Gästezahl stehend und sitzend ergänzen wir noch (TODO)." },
          ]} />
        </div>
      </section>

      <CtaBand k="eventBirthday" title={["Dein Fest", "im Loft."]} primary={{ href: "/events/anfragen", label: "Termin anfragen" }} secondary={{ href: "/buchen", label: "Studio buchen" }} wa={WA.events} />
    </div>
  );
}
