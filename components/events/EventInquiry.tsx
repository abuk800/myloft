"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { StepBody, StepHeader } from "../Stepper";
import { EASE } from "../shared";
import { EVENT_EXTRAS, EVENT_OCCASIONS, MAX_GUESTS } from "@/lib/config";

const STEPS = ["Anlass", "Datum", "Gäste", "Extras", "Kontakt"];

export default function EventInquiry() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("14:00");
  const [alt, setAlt] = useState("");
  const [guests, setGuests] = useState(30);
  const [extras, setExtras] = useState<string[]>([]);
  const [f, setF] = useState({ name: "", phone: "", email: "", msg: "" });

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const valid =
    (step === 0 && !!occasion) || (step === 1 && !!date) || step === 2 || step === 3 ||
    (step === 4 && f.name.trim().length > 1 && /\S+@\S+\.\S+/.test(f.email));

  const next = () => {
    if (step < 4) return go(step + 1);
    const q = new URLSearchParams({ name: f.name.split(" ")[0], anlass: occasion ?? "", datum: date, gaeste: String(guests) });
    router.push(`/events/danke?${q.toString()}`);
  };

  const input = "mt-2 h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-white outline-none transition-colors focus:border-champagne [color-scheme:dark]";

  return (
    <div className="min-h-screen bg-night text-white">
      <div className="mx-auto max-w-2xl px-5 pb-44 pt-28 md:pb-32 md:pt-36">
        <StepHeader dark steps={STEPS} current={step} onBack={step > 0 ? () => go(step - 1) : undefined} />

        <StepBody stepKey={step} dir={dir}>
          {step === 0 && (
            <div>
              <h1 className="display text-5xl md:text-6xl">Was wird <em className="text-champagne">gefeiert?</em></h1>
              <p className="mt-3 text-white/60">750 € ganztägig, Pauschale gültig bis 31.12.2026.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {EVENT_OCCASIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    className={`flex min-h-28 items-end rounded-2xl border p-5 text-left font-serif text-2xl leading-tight transition-all duration-300 ${occasion === o ? "border-champagne bg-champagne text-ink" : "border-white/15 hover:border-white/40"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="display text-5xl md:text-6xl">Wann soll&apos;s <em className="text-champagne">sein?</em></h1>
              <div className="mt-8 space-y-4">
                <label className="block"><span className="eyebrow !text-[0.78rem] text-white/70">Wunschdatum</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} /></label>
                <label className="block"><span className="eyebrow !text-[0.78rem] text-white/70">Uhrzeit (Beginn)</span>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={input} /></label>
                <label className="block"><span className="eyebrow !text-[0.78rem] text-white/70">Ausweichdatum (optional)</span>
                  <input type="date" value={alt} onChange={(e) => setAlt(e.target.value)} className={input} /></label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="display text-5xl md:text-6xl">Wie viele <em className="text-champagne">Gäste?</em></h1>
              <p className="display mt-12 text-center text-[8rem] leading-none text-champagne">{guests}</p>
              <input
                type="range" min={5} max={MAX_GUESTS} value={guests} onChange={(e) => setGuests(+e.target.value)}
                aria-label="Gästezahl" className="mt-8 h-2 w-full cursor-pointer accent-[#e9d6a6]"
              />
              <div className="mt-2 flex justify-between text-sm text-white/70"><span>5</span><span>{MAX_GUESTS} Stühle vorhanden</span></div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="display text-5xl md:text-6xl">Noch <em className="text-champagne">Extras?</em></h1>
              <p className="mt-3 text-white/60">Optional. Wir besprechen alles persönlich mit dir.</p>
              <div className="mt-8 space-y-2.5">
                {EVENT_EXTRAS.map((e) => {
                  const on = extras.includes(e);
                  return (
                    <button
                      key={e}
                      onClick={() => setExtras((x) => (on ? x.filter((i) => i !== e) : [...x, e]))}
                      className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${on ? "border-champagne bg-white/8" : "border-white/15 hover:border-white/40"}`}
                    >
                      <span className="font-serif text-2xl">{e}</span>
                      <span className={`grid h-7 w-7 place-items-center rounded-full border ${on ? "border-champagne bg-champagne text-ink" : "border-white/30"}`}>{on && <Check className="h-4 w-4" />}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="display text-5xl md:text-6xl">Wie erreichen <em className="text-champagne">wir dich?</em></h1>
              <div className="mt-8 space-y-4">
                {([["name", "Name", "text", "name"], ["phone", "Telefon / WhatsApp", "tel", "tel"], ["email", "E-Mail", "email", "email"]] as const).map(([k, l, t, ac]) => (
                  <label key={k} className="block"><span className="eyebrow !text-[0.78rem] text-white/70">{l}</span>
                    <input type={t} inputMode={t === "tel" ? "tel" : t === "email" ? "email" : "text"} autoComplete={ac} required={k !== "phone"} aria-required={k !== "phone"} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={input} /></label>
                ))}
                <label className="block"><span className="eyebrow !text-[0.78rem] text-white/70">Nachricht (optional)</span>
                  <textarea rows={4} autoComplete="off" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} className={`${input} h-auto py-3`} /></label>
              </div>
            </div>
          )}
        </StepBody>
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night px-4 pt-3">
        <div className="mx-auto max-w-2xl">
          <button onClick={next} disabled={!valid} className="btn btn-gold w-full disabled:opacity-30" style={{ transition: `all .4s cubic-bezier(${EASE.join(",")})` }}>
            {step === 4 ? "Anfrage senden" : "Weiter"}
          </button>
        </div>
      </div>
    </div>
  );
}
