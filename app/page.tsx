import Link from "next/link";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Occasions from "@/components/home/Occasions";
import SetExplorer from "@/components/home/SetExplorer";
import Packages from "@/components/home/Packages";
import EventTeaser from "@/components/home/EventTeaser";
import Reviews from "@/components/home/Reviews";
import CamTeaser from "@/components/home/CamTeaser";
import InstagramGrid from "@/components/home/InstagramGrid";
import About from "@/components/home/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { Eyebrow, Reveal } from "@/components/ui";
import { FAQS } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Occasions />
      <SetExplorer />
      <Packages compact />
      <EventTeaser />
      <Reviews />
      <CamTeaser />
      <InstagramGrid />
      <About />

      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 pb-24 md:px-10 md:pb-36">
        <Eyebrow className="text-ink-soft">FAQ</Eyebrow>
        <h2 className="display mt-5 text-[2.7rem] md:text-6xl">Gut zu wissen.</h2>
        <Reveal className="mt-10"><Faq items={FAQS.slice(0, 5)} /></Reveal>
        <p className="mt-8 text-sm text-ink-soft">Noch eine Frage? <Link href="/#kontakt" className="underline underline-offset-4">Schreib uns kurz.</Link></p>
      </section>

      <Contact />
    </>
  );
}
