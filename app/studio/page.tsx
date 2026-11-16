import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SetExplorer from "@/components/home/SetExplorer";
import Packages from "@/components/home/Packages";
import Reviews from "@/components/home/Reviews";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Eyebrow, Ico, Reveal, TodoTag } from "@/components/ui";
import { FAQS, INCLUDED, EXTRAS, WA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fotostudio mieten Frankfurt & Oberursel",
  description: "Fotostudio mieten bei Frankfurt: zwei Etagen, Canon R6, Dauerlicht und viele Sets. 2 Std. 190 €, 4 Std. 315 €, 6 Std. 465 €. Online buchen.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero k="studioCyc" eyebrow="Studio mieten" lines={["Dein Studio.", <em key="a">Deine Story.</em>]} sub="Zwei Etagen, Profi-Kamera und Licht inklusive. Slot wählen, buchen, kommen.">
        <Link href="/buchen" className="btn btn-light">Studio buchen</Link>
        <a href="#pakete" className="btn btn-line-light">Preise ansehen</a>
      </PageHero>

      <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="text-ink-soft">Im Preis dabei</Eyebrow>
            <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Nichts mitbringen. <em>Alles da.</em></h2>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              {INCLUDED.map((x, i) => (
                <Reveal key={x.label} delay={i * 0.07}>
                  <div className="flex h-full flex-col gap-4 rounded-[1.4rem] bg-cream/70 p-6">
                    <Ico name={x.icon} className="h-7 w-7 text-gold" />
                    <p className="font-serif text-2xl leading-tight">{x.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                Der Raum: helles Loft auf zwei Ebenen mit weißen Wänden und weißem Boden-Set, offener Treppe mit schwarzen Stufen und Metallgeländer, Rundbogen-Tür, cremefarbenen Sofas und Sesseln, weißen Würfeln und Hockern, Studioblitzen und Softboxen. Dazu saisonale Sets.
              </p>
              <p className="mt-3 text-xs text-ink-soft"><TodoTag>TODO</TodoTag> Quadratmeter beider Etagen ergänzen</p>
            </Reveal>
          </div>
        </div>
      </section>

      <SetExplorer />
      <div id="pakete" className="scroll-mt-16"><Packages /></div>

      <section className="bg-cream/60 py-20 md:py-28">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <Eyebrow className="text-ink-soft">Extras</Eyebrow>
          <h2 className="display mt-5 text-[2.5rem] md:text-5xl">Mehr rausholen.</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            {EXTRAS.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06}>
                <div className="h-full rounded-[1.2rem] bg-white p-5">
                  <p className="font-serif text-xl leading-tight">{e.label}</p>
                  <p className="mt-3"><TodoTag>TODO: {e.note}</TodoTag></p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section className="mx-auto max-w-4xl px-5 pb-24 md:px-10 md:pb-32">
        <Eyebrow className="text-ink-soft">FAQ</Eyebrow>
        <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Gut zu wissen.</h2>
        <div className="mt-10"><Faq items={FAQS} /></div>
      </section>

      <CtaBand k="stairsWhite" title={["Dein Slot", "wartet."]} wa={WA.studio} />
    </>
  );
}
