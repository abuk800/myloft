import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RoomShowcase from "@/components/home/RoomShowcase";
import SetExplorer from "@/components/home/SetExplorer";
import Packages from "@/components/home/Packages";
import Reviews from "@/components/home/Reviews";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Ico, Reveal } from "@/components/shared";
import { FAQS, INCLUDED, EXTRAS, WA, extraPrice } from "@/lib/config";
import { OPEN } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fotostudio mieten Frankfurt & Oberursel",
  description: "Fotostudio mieten bei Frankfurt: zwei Etagen, Canon R6, Dauerlicht und viele Sets. 2 Std. 190 €, 4 Std. 315 €, 6 Std. 465 €. Online buchen.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero k="roomSoftbox" aspect="aspect-[4/3] lg:aspect-[4/5]" pos="42% 50%" eyebrow="Studio mieten" lines={["Dein Studio.", <em key="a">Deine Story.</em>]} sub="Zwei Etagen, Profi-Kamera und Licht inklusive. Slot wählen, buchen, kommen.">
        <Link href="/buchen" className="btn btn-light">Studio buchen</Link>
        <a href="#pakete" className="btn btn-line-light">Preise ansehen</a>
      </PageHero>

      <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Das ist im Preis dabei.</h2>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {INCLUDED.map((x) => (
                <li key={x.label} className="flex items-center gap-4 py-4 text-lg">
                  <Ico name={x.icon} className="h-6 w-6 shrink-0 text-gold-deep" /> {x.label}
                </li>
              ))}
            </ul>
            <Reveal className="mt-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                Der Raum: helles Loft auf zwei Ebenen mit weißen Wänden und weißem Boden-Set, offener Treppe mit schwarzen Stufen und Metallgeländer, Rundbogen-Tür, cremefarbenen Sofas und Sesseln, weißen Würfeln und Hockern, Studioblitzen und Softboxen. Dazu saisonale Sets.
              </p>
              {OPEN.sqm && <p className="mt-3 text-sm text-ink-soft">Fläche beider Etagen: {OPEN.sqm}</p>}
            </Reveal>
          </div>
        </div>
      </section>

      <RoomShowcase />
      <SetExplorer />
      <div id="pakete" className="scroll-mt-16"><Packages /></div>

      <section className="bg-cream/60 py-20 md:py-28">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <h2 className="display text-[2.5rem] md:text-5xl">Extras zum Dazubuchen</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            {EXTRAS.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06}>
                <div className="h-full rounded-xl bg-white p-5">
                  <p className="font-serif text-xl leading-tight">{e.label}</p>
                  <p className="mt-3 text-sm text-ink-soft">{extraPrice(e.id)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section className="mx-auto max-w-4xl px-5 pb-24 md:px-10 md:pb-32">
        <h2 className="display text-[2.5rem] md:text-5xl">Häufige Fragen</h2>
        <div className="mt-10"><Faq items={FAQS} /></div>
      </section>

      <CtaBand k="eventOpening" title={["Such dir", "deinen Slot aus."]} wa={WA.studio} />
    </>
  );
}
