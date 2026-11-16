const WORDS = ["Shootings", "Content", "Podcast", "Geburtstage", "Babyparty", "Make-up-Masterclass", "Team-Shootings", "Ladies Event", "Castings", "Weihnachts-Special"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-line bg-paper py-5" aria-hidden>
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap font-serif text-3xl italic text-ink md:text-4xl">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
