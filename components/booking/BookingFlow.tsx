"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { StepBody, StepHeader } from "../Stepper";
import { EASE, Photo, WhatsAppIcon } from "../shared";
import { EXTRAS, PACKAGES, SITE, WEEKDAY, eur, extraPrice, waLink, type Pkg } from "@/lib/config";

const STEPS = ["Paket", "Termin", "Personen", "Extras", "Bestätigung"];
const DAY = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONTH = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const LONG = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long" });

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Deterministische Fake-Verfügbarkeit (Demo, es gibt kein Backend). */
function taken(dateIso: string, hour: number) {
  let h = 0;
  for (const c of `${dateIso}-${hour}`) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 100 < 34;
}

function slotsFor(dateIso: string, hours: number) {
  const out: { start: number; end: number; free: boolean }[] = [];
  for (let s = 7; s + hours <= 24; s++) {
    let free = true;
    for (let h = s; h < s + hours; h++) if (taken(dateIso, h)) free = false;
    out.push({ start: s, end: s + hours, free });
  }
  return out;
}

type Field = "name" | "email" | "phone";

export default function BookingFlow({ initialPackage = null }: { initialPackage?: string | null }) {
  const initial = PACKAGES.find((p) => p.id === initialPackage);

  const [step, setStep] = useState(initial ? 1 : 0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [pkg, setPkg] = useState<Pkg | null>(initial ?? null);
  const [days, setDays] = useState<Date[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [people, setPeople] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);
  const [form, setForm] = useState<Record<Field, string>>({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, phone: false });
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), phone: useRef<HTMLInputElement>(null) };

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setDays(Array.from({ length: 21 }, (_, i) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + i)));
  }, []);

  const slots = useMemo(() => (date && pkg ? slotsFor(date, pkg.hours) : []), [date, pkg]);
  const maxP = pkg?.people ?? 4;

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const errors: Record<Field, string> = {
    name: form.name.trim().length < 2 ? "Bitte gib deinen Namen an." : "",
    email: !form.email.trim() ? "Bitte gib deine E-Mail-Adresse an." : !/^\S+@\S+\.\S+$/.test(form.email.trim()) ? "Bitte gib eine gültige E-Mail-Adresse an." : "",
    phone: form.phone.trim() && form.phone.replace(/\D/g, "").length < 6 ? "Bitte prüfe die Telefonnummer." : "",
  };
  const showErr = (k: Field) => (touched[k] || submitted) && errors[k];

  const stepValid = (step === 0 && !!pkg) || (step === 1 && !!date && slot !== null) || step === 2 || step === 3;

  const next = () => { if (step < 4) go(step + 1); };

  /** Demo: schließt die Buchung nur im Browser ab. Es wird nichts versendet. */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const bad = (["name", "email", "phone"] as Field[]).find((k) => errors[k]);
    if (bad) { refs[bad].current?.focus(); return; }
    setDone("ML-" + Math.random().toString(36).slice(2, 7).toUpperCase());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dateObj = date ? new Date(date + "T12:00:00") : null;
  const dateLabel = dateObj ? LONG.format(dateObj) : "";
  const timeLabel = slot !== null && pkg ? `${pad(slot)}:00–${pad(slot + pkg.hours)}:00 Uhr` : "";
  const isWeekday = !!dateObj && dateObj.getDay() >= 1 && dateObj.getDay() <= 5;
  const extrasLabel = extras.length ? extras.map((e) => EXTRAS.find((x) => x.id === e)?.label).join(", ") : "keine";

  /* ── Bestätigt ─────────────────────────── */
  if (done && pkg) {
    const msg = `Hi! Ich habe gerade ${pkg.name} im Studio gebucht (${dateLabel}, ${timeLabel}), Buchungsnummer ${done}.`;
    return (
      <div className="mx-auto max-w-xl px-5 pb-24 pt-32 text-center md:pt-40">
        <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink text-white">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }} />
          </svg>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="display mt-8 text-5xl md:text-7xl">
          Buchung bestätigt.
        </motion.h1>
        <p className="mt-4 text-ink-soft">Wir freuen uns auf dich, {form.name.trim().split(" ")[0]}. Eine Bestätigung geht an {form.email.trim()}.</p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease: EASE }} className="mt-10 rounded-2xl bg-cream/70 p-7 text-left">
          <p className="text-sm text-ink-soft">Buchungsnummer {done}</p>
          <dl className="mt-5 space-y-4 text-sm">
            {[
              ["Paket", `${pkg.name} · ${eur(pkg.price)}`],
              ["Termin", `${dateLabel} · ${timeLabel}`],
              ["Personen", `${people}`],
              ["Extras", extrasLabel],
              ["Ort", `${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3">
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-ink"><WhatsAppIcon className="h-5 w-5" /> Rückfrage auf WhatsApp</a>
          <Link href="/" className="btn btn-line">Zur Startseite</Link>
        </div>
        <p className="mt-8 text-sm text-ink-soft">Demo-Modus: Es wurde keine echte Buchung angelegt und nichts versendet.</p>
      </div>
    );
  }

  const total = pkg?.price ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-[calc(9.5rem+env(safe-area-inset-bottom))] pt-28 md:px-10 md:pb-32 md:pt-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="min-w-0 md:col-span-7">
          <StepHeader steps={STEPS} current={step} onBack={step > 0 ? () => go(step - 1) : undefined} />

          <StepBody stepKey={step} dir={dir}>
            {step === 0 && (
              <div>
                <h1 className="display text-5xl md:text-6xl">Welches Paket?</h1>
                <p className="mt-3 text-ink-soft">Studio, Canon R6, Dauerlicht und 128-GB-Karte sind immer dabei.</p>
                <div className="mt-8 space-y-3">
                  {PACKAGES.map((p) => {
                    const on = pkg?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => { setPkg(p); setPeople((v) => Math.min(v, p.people)); setSlot(null); }}
                        aria-pressed={on}
                        className={`relative flex min-h-11 w-full items-center justify-between rounded-2xl border p-6 text-left transition-all duration-500 ${on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40"}`}
                      >
                        <div>
                          <p className="font-serif text-3xl">{p.name}</p>
                          <p className={`mt-1 text-sm ${on ? "text-white/70" : "text-ink-soft"}`}>Bis {p.people} Personen · {p.lights} Dauerlichter</p>
                        </div>
                        <p className="display text-4xl">{eur(p.price)}</p>
                        {p.featured && <span className="absolute -top-2.5 left-6 rounded-full bg-champagne px-2.5 py-1 text-[0.78rem] font-medium text-ink">Beliebt</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && pkg && (
              <div>
                <h1 className="display text-5xl md:text-6xl">Wann passt&apos;s?</h1>
                <p className="mt-3 text-ink-soft">Täglich 07:00–24:00 Uhr. Freie Zeiten für {pkg.name}:</p>

                <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 after:w-px after:shrink-0 after:content-[''] md:mx-0 md:px-0">
                  {days.map((d) => {
                    const k = iso(d);
                    const on = date === k;
                    return (
                      <button
                        key={k}
                        onClick={() => { setDate(k); setSlot(null); }}
                        aria-pressed={on}
                        aria-label={LONG.format(d)}
                        className={`flex w-[4.2rem] shrink-0 flex-col items-center rounded-2xl border py-3 transition-all duration-300 ${on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40"}`}
                      >
                        <span className="text-[0.8rem] opacity-70">{DAY[d.getDay()]}</span>
                        <span className="font-serif text-3xl leading-tight">{d.getDate()}</span>
                        <span className="text-[0.8rem] opacity-70">{MONTH[d.getMonth()]}</span>
                      </button>
                    );
                  })}
                </div>

                {date ? (
                  <motion.div key={date} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots.map((s) => (
                      <button
                        key={s.start}
                        disabled={!s.free}
                        onClick={() => setSlot(s.start)}
                        aria-pressed={slot === s.start}
                        className={`min-h-12 rounded-xl border px-3 text-sm transition-all duration-300 ${
                          slot === s.start ? "border-ink bg-ink text-white" : s.free ? "border-line bg-white hover:border-ink/50" : "cursor-not-allowed border-transparent bg-cream/50 text-ink/45 line-through"
                        }`}
                      >
                        {pad(s.start)}:00 – {pad(s.end)}:00
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <p className="mt-8 rounded-2xl bg-cream/60 p-5 text-sm text-ink-soft">Wähle oben einen Tag, dann siehst du die freien Zeiten.</p>
                )}
                {WEEKDAY.price && isWeekday && (
                  <p className="mt-5 rounded-2xl bg-cream/60 p-4 text-sm text-ink">Unter der Woche gilt der Bestie-Deal: {WEEKDAY.price}.</p>
                )}
              </div>
            )}

            {step === 2 && pkg && (
              <div>
                <h1 className="display text-5xl md:text-6xl">Wie viele seid ihr?</h1>
                <p className="mt-3 text-ink-soft">Im {pkg.name}-Paket sind bis zu {pkg.people} Personen möglich.</p>
                <div className="mt-12 flex items-center justify-center gap-8">
                  <button aria-label="Weniger Personen" onClick={() => setPeople((v) => Math.max(1, v - 1))} className="grid h-16 w-16 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-white active:scale-95"><Minus className="h-5 w-5" /></button>
                  <motion.span key={people} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display w-28 text-center text-[7rem] leading-none" aria-live="polite">{people}</motion.span>
                  <button aria-label="Mehr Personen" onClick={() => setPeople((v) => Math.min(maxP, v + 1))} className="grid h-16 w-16 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-white active:scale-95"><Plus className="h-5 w-5" /></button>
                </div>
                <p className="mt-6 text-center text-sm text-ink-soft">{people === maxP ? "Das ist das Maximum für dieses Paket." : `Noch Platz für ${maxP - people} weitere.`}</p>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="display text-5xl md:text-6xl">Noch Extras?</h1>
                <p className="mt-3 text-ink-soft">Optional. Die Preise der Extras nennen wir dir persönlich.</p>
                <div className="mt-8 space-y-2.5">
                  {EXTRAS.map((e) => {
                    const on = extras.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => setExtras((x) => (on ? x.filter((i) => i !== e.id) : [...x, e.id]))}
                        aria-pressed={on}
                        className={`flex min-h-11 w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${on ? "border-ink bg-cream/80" : "border-line bg-white hover:border-ink/40"}`}
                      >
                        <span>
                          <span className="block font-serif text-2xl">{e.label}</span>
                          <span className="mt-1 block text-sm text-ink-soft">{extraPrice(e.id)}</span>
                        </span>
                        <span className={`grid h-7 w-7 place-items-center rounded-full border transition-all ${on ? "border-ink bg-ink text-white" : "border-ink/25"}`}>{on && <Check className="h-4 w-4" />}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && pkg && (
              <form id="book-form" onSubmit={submit} noValidate>
                <h1 className="display text-5xl md:text-6xl">Fast geschafft.</h1>
                <p className="mt-3 text-ink-soft">Prüfe deine Angaben und gib deine Daten ein.</p>

                <dl className="mt-8 divide-y divide-ink/10 rounded-2xl bg-cream/70 px-5 text-sm md:hidden">
                  {[
                    { k: "Paket", v: `${pkg.name}`, to: 0 },
                    { k: "Termin", v: date && slot !== null ? `${dateLabel}, ${timeLabel}` : "–", to: 1 },
                    { k: "Personen", v: String(people), to: 2 },
                    { k: "Extras", v: extrasLabel, to: 3 },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-4 py-3.5">
                      <div className="min-w-0">
                        <dt className="text-ink-soft">{r.k}</dt>
                        <dd className="mt-0.5 font-medium">{r.v}</dd>
                      </div>
                      <button type="button" onClick={() => go(r.to)} aria-label={`${r.k} ändern`} className="-mr-2 inline-flex min-h-11 items-center px-2 text-sm underline underline-offset-4">Ändern</button>
                    </div>
                  ))}
                  <div className="flex items-end justify-between py-3.5">
                    <dt className="text-ink-soft">Preis</dt>
                    <dd className="display text-3xl">{eur(total)}</dd>
                  </div>
                </dl>

                <div className="mt-8 space-y-4">
                  {([
                    ["name", "Name", "text", "name", "text", true],
                    ["email", "E-Mail", "email", "email", "email", true],
                    ["phone", "Telefon / WhatsApp (optional)", "tel", "tel", "tel", false],
                  ] as const).map(([k, label, type, ac, mode, req]) => (
                    <div key={k}>
                      <label htmlFor={`f-${k}`} className="text-sm text-ink-soft">{label}{req && <span aria-hidden> *</span>}</label>
                      <input
                        id={`f-${k}`}
                        ref={refs[k]}
                        type={type}
                        inputMode={mode}
                        autoComplete={ac}
                        required={req}
                        aria-required={req}
                        aria-invalid={showErr(k) ? true : undefined}
                        aria-describedby={showErr(k) ? `e-${k}` : undefined}
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
                        className={`mt-2 h-14 w-full rounded-xl border bg-white px-4 text-base outline-none transition-colors focus:border-ink ${showErr(k) ? "border-red-700" : "border-line"}`}
                      />
                      {showErr(k) && <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-red-800">{errors[k]}</p>}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-soft">Mit „Zahlungspflichtig buchen“ gibst du eine verbindliche Buchung ab. Pflichtfelder sind mit * markiert.</p>
              </form>
            )}
          </StepBody>
        </div>

        {/* Zusammenfassung Desktop */}
        <aside className="hidden md:col-span-5 md:block">
          <div className="sticky top-28 overflow-hidden rounded-2xl bg-cream/70">
            <div className="relative aspect-[16/10]"><Photo k="roomSoftbox" sizes="40vw" w={900} /></div>
            <div className="p-7">
              <p className="text-sm text-ink-soft">Deine Buchung</p>
              <dl className="mt-5 space-y-3 text-sm">
                <Row k="Paket" v={pkg ? `${pkg.name}` : "–"} to={step === 4 ? 0 : undefined} go={go} />
                <Row k="Termin" v={date && slot !== null ? `${dateLabel}, ${timeLabel}` : "–"} to={step === 4 ? 1 : undefined} go={go} />
                <Row k="Personen" v={step >= 2 ? String(people) : "–"} to={step === 4 ? 2 : undefined} go={go} />
                <Row k="Extras" v={step >= 3 ? extrasLabel : "–"} to={step === 4 ? 3 : undefined} go={go} />
              </dl>
              <div className="mt-6 flex items-end justify-between border-t border-ink/10 pt-5">
                <span className="text-sm text-ink-soft">Gesamt</span>
                <span className="display text-5xl">{pkg ? eur(total) : "–"}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Aktionsleiste: mobil fest am unteren Rand, Inhalt darüber hat Abstand in Leistenhöhe */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-paper px-4 pt-3 md:static md:z-auto md:mt-10 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-5xl items-center gap-4 md:max-w-none md:justify-start">
          <div className="md:hidden">
            <p className="text-[0.8rem] text-ink-soft">Gesamt</p>
            <p className="display text-3xl leading-none">{pkg ? eur(total) : "–"}</p>
          </div>
          {step === 4 ? (
            <button type="submit" form="book-form" className="btn btn-dark flex-1 md:max-w-xs md:flex-none">Zahlungspflichtig buchen</button>
          ) : (
            <button type="button" onClick={next} disabled={!stepValid} className="btn btn-dark flex-1 disabled:opacity-30 md:max-w-xs md:flex-none">Weiter</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, to, go }: { k: string; v: string; to?: number; go: (n: number) => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-ink-soft">{k}</dt>
      <dd className="text-right font-medium">
        {v}
        {to !== undefined && (
          <button type="button" onClick={() => go(to)} aria-label={`${k} ändern`} className="ml-3 text-sm font-normal text-ink-soft underline underline-offset-4 hover:text-ink">Ändern</button>
        )}
      </dd>
    </div>
  );
}
