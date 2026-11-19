import Link from "next/link";
import Hero from "@/components/home/Hero";
import Occasions from "@/components/home/Occasions";
import Packages from "@/components/home/Packages";
import Reviews from "@/components/home/Reviews";
import SetExplorer from "@/components/home/SetExplorer";
import EventTeaser from "@/components/home/EventTeaser";
import About from "@/components/home/About";
import Social from "@/components/home/Social";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { Reveal } from "@/components/shared";
import { FAQS } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Hero />
      <Occasions />
      <Packages compact />
      <Reviews exclude={["Cia Mehr"]} />
      <SetExplorer />
      <EventTeaser />
      <About />
      <Social />

      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-12 md:px-10 md:py-24">
        <h2 className="display text-[2.2rem] md:text-5xl">Häufige Fragen</h2>
        <Reveal className="mt-6 md:mt-10"><Faq items={FAQS.slice(0, 5)} initialOpen={null} /></Reveal>
        <p className="mt-6 text-sm text-ink-soft">Noch eine Frage? <Link href="/#kontakt" className="underline underline-offset-4">Schreib uns kurz.</Link></p>
      </section>

      <Contact />
    </>
  );
}
