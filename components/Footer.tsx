import Link from "next/link";
import { Logo, InstagramIcon, WhatsAppIcon } from "./ui";
import { SITE, WA, waLink } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-4 md:px-10 md:py-24">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-6 max-w-[16rem] font-serif text-2xl italic leading-snug text-white">A place for everyone.</p>
        </div>

        <div className="space-y-2 text-sm leading-relaxed">
          <p className="eyebrow mb-4 text-white/45">Buchen</p>
          <Link className="block hover:text-white" href="/buchen">Studio buchen</Link>
          <Link className="block hover:text-white" href="/events/anfragen">Event anfragen</Link>
          <Link className="block hover:text-white" href="/gutscheine">Gutschein verschenken</Link>
          <Link className="block hover:text-white" href="/galerie/upload">Customer Cam</Link>
        </div>

        <div className="space-y-2 text-sm leading-relaxed">
          <p className="eyebrow mb-4 text-white/45">Studio</p>
          <p>{SITE.address.street}<br />{SITE.address.zip} {SITE.address.city}</p>
          <p className="pt-2">{SITE.hours}</p>
          <a className="block pt-2 hover:text-white" href={SITE.phoneHref}>{SITE.phone}</a>
          <a className="block hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>

        <div className="space-y-4 text-sm">
          <p className="eyebrow mb-4 text-white/45">Folge uns</p>
          <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
            <InstagramIcon /> {SITE.instagram.handle}
          </a>
          <a href={waLink(WA.default)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </a>
          <p className="pt-2 text-white/45">Teile deine Bilder mit {SITE.hashtag}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-6 text-xs text-white/40 md:flex-row md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} MYLOFT STUDIO · Impressum · Datenschutz · Buchungsbedingungen (in der Demo nicht verlinkt)</p>
          <p>Design-Demo mit Beispielbildern</p>
        </div>
      </div>
    </footer>
  );
}
