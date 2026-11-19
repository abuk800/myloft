import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Wall from "@/components/gallery/Wall";
import InstagramGrid from "@/components/home/InstagramGrid";
import CtaBand from "@/components/CtaBand";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Galerie & Customer Cam",
  description: "Echte Shootings aus dem MYLOFT STUDIO: Kundenbilder, Reels und Eindrücke aus dem Loft in Oberursel bei Frankfurt.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHero k="cubeModel" pos="50% 30%" eyebrow="Galerie · Customer Cam" lines={["Eure Shootings", "an unserer Wand"]} sub={`Bilder von euch, aus unserem Loft. Teile deine mit ${SITE.hashtag} oder lade sie direkt hoch.`}>
        <Link href="/galerie/upload" className="btn btn-light">Bilder hochladen</Link>
        <Link href="/buchen" className="btn btn-line-light">Selbst shooten</Link>
      </PageHero>

      <section className="mx-auto max-w-[88rem] px-5 py-16 md:px-10 md:py-24">
        <Wall />
      </section>

      <InstagramGrid />
      <CtaBand k="roomMezzanine" title={["Dein Bild", "an der Wand."]} primary={{ href: "/buchen", label: "Studio buchen" }} secondary={{ href: "/galerie/upload", label: "Bilder hochladen" }} />
    </>
  );
}
