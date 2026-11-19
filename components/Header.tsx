"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo, EASE } from "./shared";
import { NAV, SITE } from "@/lib/config";

// Seiten mit vollflächigem Hero: Header startet transparent mit heller Schrift
const isImageHero = (p: string) =>
  p === "/" || p === "/studio" || p === "/events" || p === "/galerie" || p.startsWith("/anlaesse/");

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const dark = path.startsWith("/events/anfragen") || path.startsWith("/events/danke");
  const light = isImageHero(path) && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          light ? "bg-transparent text-white" : dark && !open ? "bg-night text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-paper text-ink shadow-[0_1px_0_var(--line)]"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="MYLOFT STUDIO Startseite" className="relative z-[60]">
            <Logo light={light || (dark && !open)} />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Hauptnavigation">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="group relative text-[0.8rem] font-medium uppercase tracking-[0.2em]">
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/buchen"
              className={`btn hidden !min-h-11 !px-6 md:inline-flex ${light || dark ? "btn-light" : "btn-dark"}`}
            >
              Studio buchen
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              className="relative z-[60] grid h-11 w-11 place-items-center lg:hidden"
            >
              {open ? <X className="h-6 w-6 text-ink" strokeWidth={1.4} /> : <Menu className="h-6 w-6" strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-paper px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {[{ href: "/", label: "Start" }, ...NAV].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <Link href={n.href} className="display block border-b border-line py-3 text-[2.6rem]">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-4">
              <Link href="/buchen" className="btn btn-dark w-full">Studio buchen</Link>
              <Link href="/events/anfragen" className="btn btn-line w-full">Event anfragen</Link>
              <p className="pt-2 text-center text-sm text-ink-soft">
                {SITE.address.street} · {SITE.address.zip} {SITE.address.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
