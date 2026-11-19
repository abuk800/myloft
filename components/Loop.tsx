"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { VIDEO, type VideoKey } from "@/lib/images";

/**
 * Stummer Video-Loop mit Poster. Startet nur im Sichtbereich, pausiert außerhalb,
 * bleibt bei "weniger Bewegung" oder Datensparmodus auf dem Poster und hat einen Play/Pause-Knopf.
 */
export default function Loop({
  v, className = "", controls = true, label, style, eager = false,
}: { v: VideoKey; className?: string; controls?: boolean; label?: string; style?: React.CSSProperties; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const base = VIDEO[v].base;

  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData;
    if (reduce) { setBlocked(true); return; }

    // iOS/Safari: Autoplay nur mit gesetztem muted-Attribut + playsinline (React setzt muted nur als Property).
    vid.muted = true;
    vid.defaultMuted = true;
    vid.setAttribute("muted", "");
    vid.setAttribute("playsinline", "");
    vid.setAttribute("webkit-playsinline", "");

    let visible = false;
    const tryPlay = () => {
      if (!visible || !vid.paused) return;
      vid.play().then(() => { setPlaying(true); setBlocked(false); }).catch(() => setBlocked(true));
    };

    // Start kurz nach Load, damit das Poster (nicht das erste Videobild) der LCP bleibt.
    let io: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          if (visible) tryPlay();
          else { vid.pause(); setPlaying(false); }
        },
        { threshold: 0.25 },
      );
      io.observe(vid);
    };
    // Falls der Browser Autoplay erst nach einer Geste erlaubt (Stromsparmodus): bei erster Berührung erneut versuchen.
    const retry = () => tryPlay();
    const onVis = () => { if (!document.hidden) tryPlay(); };
    const arm = () => { timer = setTimeout(start, eager ? 0 : 800); };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    window.addEventListener("touchstart", retry, { passive: true });
    window.addEventListener("scroll", retry, { passive: true, once: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("load", arm);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("scroll", retry);
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(timer); io?.disconnect();
    };
  }, [eager]);

  const toggle = () => {
    const vid = ref.current;
    if (!vid) return;
    if (vid.paused) { vid.play().then(() => { setPlaying(true); setBlocked(false); }).catch(() => {}); }
    else { vid.pause(); setPlaying(false); }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={style}
        poster={`${base}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label ?? VIDEO[v].label}
      >
        <source src={`${base}.mp4`} type="video/mp4" />
        <source src={`${base}.webm`} type="video/webm" />
      </video>
      {controls && (
        <button
          onClick={toggle}
          aria-label={playing ? "Video pausieren" : "Video abspielen"}
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white transition-opacity hover:bg-black/75"
          style={{ opacity: blocked || !playing ? 1 : 0.85 }}
        >
          {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
        </button>
      )}
    </div>
  );
}
