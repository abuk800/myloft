import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import CtaBand from "@/components/CtaBand";
import { Photo, Reveal, TodoTag } from "@/components/ui";
import { OCCASIONS, PACKAGES, WA, EVENT, eur } from "@/lib/config";

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = OCCASIONS.find((x) => x.slug === slug);
  if (!o) return {};
  return { title: o.seoTitle, description: o.seoDesc };
}

export default async function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = OCCASIONS.find((x) => x.slug === slug);
  if (!o) notFound();

  const isEvent = o.cta === "event";
  const others = OCCASIONS.filter((x) => x.slug !== o.slug).slice(0, 3);
  const cta = isEvent ? { href: "/events/anfragen", label: "Termin anfragen" } : { href: `/buchen?paket=2h`, label: "Studio buchen" };

  return (
    <>
      <PageHero k={o.image} eyebrow={o.title} lines={o.headline.split(". ").map((s, i, a) => (i < a.length - 1 && !s.endsWith(".") ? `${s}.` : s))} sub={o.short}>
        <Link href={cta.href} className="btn btn-light">{cta.label}</Link>
        <Link href={isEvent ? "/buchen" : "/events/anfragen"} className="btn btn-line-light">{isEvent ? "Oder Studio buchen" : "Oder Event anfragen"}</Link>
      </PageHero>

      <section className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-6">
            <p className="display mt-5 text-[2rem] leading-[1.12] md:text-5xl">{o.intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <ul className="divide-y divide-line border-y border-line">
              {o.points.map((p) => (
                <li key={p} className="flex items-start gap-4 py-5 text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{p.includes("TODO") ? <>{p.replace(/:?\s*TODO.*$/, "")} <TodoTag>TODO</TodoTag></> : p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {o.gallery.map((k, i) => (
            <Reveal key={k} delay={i * 0.08} className={i % 3 === 0 ? "md:mt-12" : ""}>
              <div className="zoom relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
                <Photo k={k} sizes="(min-width:768px) 25vw, 50vw" w={900} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`py-20 md:py-28 ${isEvent ? "bg-night text-white" : "bg-cream/60"}`}>
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          {isEvent ? (
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="display mt-3 text-6xl text-champagne md:text-8xl">{eur(EVENT.price)} <span className="text-3xl text-white md:text-5xl">ganztägig</span></p>
                <p className="mt-3 text-sm text-white/60">Gültig bis {EVENT.validUntil}. Reinigung danach inklusive.</p>
              </div>
              <Link href="/events/anfragen" className="btn btn-gold">Termin anfragen</Link>
            </div>
          ) : (
            <>
              <h2 className="display text-4xl md:text-5xl">Preise</h2>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {PACKAGES.map((p) => (
                  <Link key={p.id} href={`/buchen?paket=${p.id}`} className="group flex items-end justify-between rounded-2xl bg-white p-6 transition-transform duration-500 hover:-translate-y-1">
                    <div>
                      <p className="eyebrow !text-[0.78rem] text-ink-soft">{p.name} · bis {p.people} Pers.</p>
                      <p className="display mt-2 text-5xl">{eur(p.price)}</p>
                    </div>
                    <span className="text-2xl transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 md:px-10 md:py-32">
        <h2 className="display text-[2.5rem] md:text-5xl">Häufige Fragen</h2>
        <div className="mt-10"><Faq items={o.faqs} /></div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 pb-24 md:px-10">
        <h2 className="display text-4xl md:text-5xl">Mehr Anlässe</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {others.map((x) => (
            <Link key={x.slug} href={`/anlaesse/${x.slug}`} className="zoom group relative block aspect-[16/10] overflow-hidden rounded-2xl">
              <Photo k={x.image} sizes="(min-width:768px) 30vw, 100vw" w={900} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="display absolute bottom-4 left-5 text-3xl text-white">{x.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <Contact waMessage={WA[o.waKey]} />
      <CtaBand k={o.image} primary={cta} wa={WA[o.waKey]} title={["Los geht’s", "bei dir."]} />
    </>
  );
}
