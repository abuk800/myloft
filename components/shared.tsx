"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion, type HTMLMotionProps } from "framer-motion";
import {
  Armchair, Bath, Building2, Camera, CookingPot, HardDrive, Layers, Lightbulb, Shirt, Sparkles, SprayCan, Table2, type LucideIcon,
} from "lucide-react";
import { IMG, src, type ImgKey } from "@/lib/images";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Bild mit festem Seitenverhältnis-Container (Eltern muss relative + Größe haben). */
export function Photo({
  k, sizes = "100vw", priority = false, className = "", w = 1600, pos,
}: { k: ImgKey; sizes?: string; priority?: boolean; className?: string; w?: number; pos?: string }) {
  const img = IMG[k];
  return (
    <Image src={src(img, w)} alt={img.alt} fill sizes={sizes} priority={priority} quality={85} style={pos ? { objectPosition: pos } : undefined} className={`object-cover ${className}`} />
  );
}

/** Scroll-Reveal: blendet beim Eintritt in den Viewport sanft ein. */
export function Reveal({
  children, delay = 0, y = 28, className = "", ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Headline, Zeile für Zeile aus einer Maske hochgeschoben. Trigger sitzt am (nicht geclippten) Heading. */
export function Lines({
  lines, className = "", delay = 0, as: Tag = "h2", inView = true, immediate = false,
}: { lines: React.ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3"; inView?: boolean; immediate?: boolean }) {
  const M = motion[Tag];
  // immediate: Überschrift im sichtbaren Bereich wird mit dem fertigen Zustand ausgeliefert (kein versteckter Server-HTML)
  const parent = immediate
    ? { initial: false as const, animate: "show" }
    : inView
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -6% 0px" } }
      : { initial: "hidden", animate: "show" };
  return (
    <M className={className} {...parent}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1.1, delay: delay + i * 0.11, ease: EASE } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

const ICONS: Record<string, LucideIcon> = {
  building: Building2, camera: Camera, light: Lightbulb, card: HardDrive,
  chair: Armchair, table: Table2, linen: Shirt, kitchen: CookingPot, wc: Bath,
  mirror: Sparkles, floors: Layers, clean: SprayCan,
};

export function Ico({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const I = ICONS[name] ?? Sparkles;
  return <I className={className} strokeWidth={1.3} />;
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${light ? "text-white" : "text-ink"} ${className}`}>
      <span className="text-[1.45rem] font-semibold tracking-[-0.02em]">MYLOFT</span>
      <span className="mt-1 text-[0.5rem] font-medium tracking-[0.62em] pl-[0.62em]">STUDIO</span>
    </span>
  );
}

export function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.2em] ${light ? "text-white" : "text-ink"}`}
    >
      <span className="border-b border-current pb-1">{children}</span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
    </Link>
  );
}

/** Eigene Marken-Icons (Lucide führt keine Brand-Icons). */
export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24s8.24 3.7 8.24 8.24-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.88 2.4 1 2.56c.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoogleG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.5 12.27c0-.8-.07-1.56-.2-2.3H12v4.36h5.9a5.05 5.05 0 0 1-2.19 3.31v2.75h3.54c2.07-1.91 3.25-4.72 3.25-8.12Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.75c-.98.66-2.24 1.05-3.74 1.05-2.88 0-5.31-1.94-6.18-4.55H2.16v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.82 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.16a11 11 0 0 0 0 9.86l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.36c1.62 0 3.07.56 4.21 1.65l3.15-3.15A10.57 10.57 0 0 0 12 1 11 11 0 0 0 2.16 7.07l3.66 2.84C6.69 7.3 9.12 5.36 12 5.36Z" />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return <span className={`tracking-[0.15em] text-gold ${className}`} aria-label="5 von 5 Sternen">★★★★★</span>;
}
