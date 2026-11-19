"use client";

import Link from "next/link";
import { Lines, Photo, Reveal, WhatsAppIcon } from "./shared";
import { WA, waLink } from "@/lib/config";
import type { ImgKey } from "@/lib/images";

/** Abschluss-Handlung am Ende einer Seite, nie eine Sackgasse. */
export default function CtaBand({
  k = "sofaLounge", title = ["Bereit für", "dein Studio?"], primary = { href: "/buchen", label: "Studio buchen" },
  secondary = { href: "/events/anfragen", label: "Event anfragen" }, wa = WA.default,
}: {
  k?: ImgKey; title?: string[]; primary?: { href: string; label: string }; secondary?: { href: string; label: string }; wa?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div className="absolute inset-0 -z-10"><Photo k={k} sizes="100vw" w={1800} /><div className="absolute inset-0 bg-black/45" /></div>
      <div className="mx-auto max-w-[88rem] px-5 py-24 text-center md:px-10 md:py-40">
        <Lines className="display mx-auto text-[2.7rem] md:text-[4.8rem]" lines={[title[0], title[1]]} />
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="btn btn-light">{primary.label}</Link>
          <Link href={secondary.href} className="btn btn-line-light">{secondary.label}</Link>
          <a href={waLink(wa)} target="_blank" rel="noopener noreferrer" className="btn btn-line-light">
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
