"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { WhatsAppIcon, EASE } from "./ui";
import { WA, waLink } from "@/lib/config";

/** Mobile: dauerhaft sichtbare Bottom-Bar mit Buchen + WhatsApp. */
export default function StickyBar() {
  const path = usePathname();
  if (path.startsWith("/buchen") || path.startsWith("/events/anfragen")) return null;
  const msg = path.includes("event") || path.includes("babyparty") ? WA.events : path.includes("gutschein") ? WA.gutschein : WA.default;

  return (
    <motion.div
      initial={{ y: 110 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-black/5 bg-paper/90 px-4 pt-3 backdrop-blur-xl md:hidden"
    >
      <Link href="/buchen" className="btn btn-dark flex-1">Studio buchen</Link>
      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Schreib uns auf WhatsApp"
        className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
      >
        <WhatsAppIcon />
      </a>
    </motion.div>
  );
}
