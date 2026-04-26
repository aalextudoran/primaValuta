"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/site-config";
import { SUPPORTED_CURRENCIES, type RatesPayload, type SupportedCurrency } from "@/lib/rates-types";

const PILL_CURRENCIES = ["EUR", "USD", "GBP", "CHF"] as const;
const REFRESH_MS = 60_000;

function parseUpdatedAt(value: string): Date | null {
  const [datePart, timePart] = value.split(" ");
  if (!datePart || !timePart) return null;
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

function useRates() {
  const [ratesData, setRatesData] = useState<RatesPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastLoadedAt, setLastLoadedAt] = useState<number>(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/rates", { cache: "no-store" });
      if (!res.ok) throw new Error("Invalid server response.");
      setRatesData((await res.json()) as RatesPayload);
      setError(null);
      setLastLoadedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error.");
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => { void load(); }, 0);
    const i = window.setInterval(load, REFRESH_MS);
    return () => { window.clearTimeout(t); window.clearInterval(i); };
  }, [load]);

  return { ratesData, error, lastLoadedAt };
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function EnHero({ ratesData }: { ratesData: RatesPayload | null }) {
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");

  const currentRate = useMemo(
    () => ratesData?.rates.find((r) => r.currency === currency) ?? null,
    [currency, ratesData]
  );

  const appliedRate = currentRate ? (direction === "buy" ? currentRate.sell : currentRate.buy) : null;
  const converted = appliedRate ? (Number.parseFloat(amount || "0") * appliedRate).toFixed(2) : "—";
  const resultLabel = direction === "buy" ? "You pay" : "You receive";
  const rateHint = direction === "buy" ? "sell rate" : "buy rate";

  return (
    <section className="relative flex min-h-[600px] items-end overflow-hidden pb-10 pt-6">
      <Image
        src="/image4.png"
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: "center 35%" }}
        priority
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8,20,45,0.72)", backdropFilter: "blur(3px)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">

          <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-[1fr_300px_220px] md:divide-x md:divide-y-0">

            {/* Col 1 — Tag + Headline */}
            <div className="flex flex-col justify-center p-8">
              <p
                className="mb-5 font-bold uppercase tracking-[0.16em] text-[#C8121E]"
                style={{ fontSize: "11px" }}
              >
                ● CURRENCY EXCHANGE · CRAIOVA · BNR AUTHORIZED
              </p>
              <h1 className="text-[38px] font-bold leading-tight text-pv-navy-800">
                Fair exchange rates.<br />No hidden fees.
              </h1>
            </div>

            {/* Col 2 — Converter */}
            <div className="flex flex-col">
              <div className="flex border-b border-line">
                <button
                  type="button"
                  onClick={() => setDirection("buy")}
                  className={`flex-1 py-3 text-sm font-semibold transition ${
                    direction === "buy"
                      ? "border-b-2 border-[#C8121E] text-[#C8121E]"
                      : "text-muted-foreground hover:text-pv-navy-800"
                  }`}
                >
                  I want to buy
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("sell")}
                  className={`flex-1 py-3 text-sm font-semibold transition ${
                    direction === "sell"
                      ? "border-b-2 border-[#C8121E] text-[#C8121E]"
                      : "text-muted-foreground hover:text-pv-navy-800"
                  }`}
                >
                  I want to sell
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-center space-y-3 p-5">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="min-w-0 flex-1 rounded-xl border border-line px-4 py-3 text-lg font-semibold text-pv-navy-800 outline-none focus:border-[#1560BD] focus:ring-2 focus:ring-[#1560BD]/20"
                  />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                    className="rounded-xl border border-line px-3 py-3 text-base font-bold text-pv-navy-800 outline-none focus:border-[#1560BD]"
                  >
                    {SUPPORTED_CURRENCIES.map((code) => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border-l-4 border-[#1560BD] bg-pv-navy-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-pv-navy-400">
                    {resultLabel}
                  </p>
                  <p className="text-[34px] font-black leading-none tracking-tight text-pv-navy-800">
                    {converted}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#1560BD]">RON · {rateHint}</p>
                </div>
              </div>
            </div>

            {/* Col 3 — Rate pills */}
            <div className="flex flex-col justify-center gap-2.5 p-5">
              {PILL_CURRENCIES.map((code) => {
                const rate = ratesData?.rates.find((r) => r.currency === code);
                return (
                  <div key={code} className="flex items-center justify-between rounded-lg bg-pv-navy-50 px-4 py-2.5">
                    <span className="text-sm font-extrabold text-pv-navy-800">{code}</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wide text-pv-navy-400">We buy</span>
                        <span className="text-sm font-bold text-green-600">
                          {rate ? rate.buy.toFixed(4) : "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wide text-pv-navy-400">We sell</span>
                        <span className="text-sm font-bold text-pv-navy-800">
                          {rate ? rate.sell.toFixed(4) : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line bg-pv-navy-50 px-8 py-4">
            {["BNR Authorized", "Since 2013", "No hidden fees", siteConfig.phone].map((item) => (
              <span key={item} className="text-sm font-medium text-pv-navy-600">● {item}</span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Trust bar ─────────────────────────────────────────────────────────────────

function EnTrustBar() {
  const items = [
    {
      text: "BNR Authorized",
      icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5"><path d="M8 1.5 L13.5 3.5 V8 C13.5 11.5 8 14.5 8 14.5 C8 14.5 2.5 11.5 2.5 8 V3.5 Z" strokeLinejoin="round" /><path d="M5.5 8 L7 9.5 L10.5 6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
    {
      text: "Since 2013",
      icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5"><rect x="1.5" y="3" width="13" height="11.5" rx="1.5" /><path d="M1.5 6.5 H14.5" strokeLinecap="round" /><path d="M5 1.5 V4.5" strokeLinecap="round" /><path d="M11 1.5 V4.5" strokeLinecap="round" /></svg>,
    },
    {
      text: "No hidden fees",
      icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5"><path d="M2 2 H7.5 L13.5 8 L8 13.5 L2 7.5 Z" strokeLinejoin="round" /><circle cx="5.5" cy="5.5" r="1" fill="currentColor" stroke="none" /></svg>,
    },
    {
      text: "Craiova · Daily 08:00–22:30",
      icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5"><path d="M8 1.5 C5.5 1.5 3.5 3.5 3.5 6 C3.5 9.5 8 14.5 8 14.5 C8 14.5 12.5 9.5 12.5 6 C12.5 3.5 10.5 1.5 8 1.5 Z" strokeLinejoin="round" /><circle cx="8" cy="6" r="1.5" /></svg>,
    },
  ];

  return (
    <section className="border-y border-line bg-pv-navy-50">
      <div className="mx-auto grid w-full max-w-6xl gap-3 px-6 py-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-pv-navy-800">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pv-red-600 text-white">
              {item.icon}
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Rates section ─────────────────────────────────────────────────────────────

function EnRatesSection({ ratesData, error, lastLoadedAt }: { ratesData: RatesPayload | null; error: string | null; lastLoadedAt: number }) {
  const isStale = useMemo(() => {
    if (!ratesData) return false;
    const date = parseUpdatedAt(ratesData.updated_at);
    if (!date) return false;
    return lastLoadedAt - date.getTime() > 24 * 60 * 60 * 1000;
  }, [ratesData, lastLoadedAt]);

  const updatedLabel = useMemo(() => {
    if (!ratesData) return null;
    const date = parseUpdatedAt(ratesData.updated_at);
    if (!date) return `Updated at ${ratesData.updated_at}`;
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `Updated today at ${h}:${m}`;
  }, [ratesData]);

  return (
    <section id="rates" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
      <ScrollReveal className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Exchange <span className="text-pv-red-600">rates</span>
          </h2>
        </div>

        {!ratesData ? (
          <div className="rounded-2xl border border-line bg-surface p-6 text-sm text-muted-foreground">
            {error ? `Unable to load rates: ${error}` : "Loading rates…"}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[0_18px_45px_-35px_rgba(15,34,57,0.35)]">
              <table className="w-full min-w-[360px] border-collapse">
                <thead>
                  <tr className="border-b border-line bg-pv-navy-50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">Currency</th>
                    <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">We buy</th>
                    <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">We sell</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground md:px-6">Spread</th>
                  </tr>
                </thead>
                <tbody>
                  {ratesData.rates.map((rate) => (
                    <tr key={rate.currency} className="border-b border-line/70 last:border-none">
                      <td className="px-4 py-4 text-base font-bold text-pv-navy-800 md:px-6">{rate.currency}</td>
                      <td className="px-4 py-4 text-base font-semibold text-green-600 md:px-6">{rate.buy.toFixed(2)}</td>
                      <td className="px-4 py-4 text-base font-semibold text-pv-navy-400 md:px-6">{rate.sell.toFixed(2)}</td>
                      <td className="px-4 py-4 text-xs text-muted-foreground md:px-6">+{(rate.sell - rate.buy).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span>{updatedLabel}</span>
            </div>

            {isStale && (
              <p className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">
                Rates not updated — please visit our office for confirmed rates
              </p>
            )}
            {error && <p className="text-xs text-orange-700">Last refresh error: {error}</p>}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Indicative rates only. For confirmed rates, please visit our office.
        </p>
      </ScrollReveal>
    </section>
  );
}

// ── Reviews section ───────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Mihai D.",
    quote: "Excellent rates, no hidden fees. I've exchanged euros here several times and always found the best rate in Craiova.",
  },
  {
    name: "Elena P.",
    quote: "Friendly and efficient staff. Everything was done in a few minutes, no hassle at all. Highly recommended!",
  },
  {
    name: "Andrei S.",
    quote: "Convenient location on Calea București, great hours and fair rates. I prefer them over any bank.",
  },
];

function EnReviewsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-pv-navy-800 md:text-3xl">What our clients say</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <p className="text-sm text-pv-yellow">★★★★★</p>
              <p className="mt-3 text-sm leading-relaxed text-pv-navy-800">{review.quote}</p>
              <p className="mt-4 text-sm font-semibold text-pv-navy-400">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why section ───────────────────────────────────────────────────────────────

const benefits = [
  {
    title: "Full transparency",
    text: "Rates are clearly displayed at our office and on this site. No hidden costs, no surprises — the price you see is the price you pay.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M2 12 C4.5 6 19.5 6 22 12 C19.5 18 4.5 18 2 12 Z" strokeLinejoin="round" /><circle cx="12" cy="12" r="3.5" /></svg>,
  },
  {
    title: "Fast transactions",
    text: "Every exchange takes just a few minutes. No queues or complex paperwork. We respect your time.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M13 2 L5 13 H12 L11 22 L20 11 H13 Z" strokeLinejoin="round" strokeLinecap="round" /></svg>,
  },
  {
    title: "BNR authorized since 2013",
    text: "We operate under National Bank of Romania regulations. All transactions are legal, documented, and fully secure.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M12 2 L20 5.5 V12 C20 17 12 22 12 22 C12 22 4 17 4 12 V5.5 Z" strokeLinejoin="round" /><path d="M9 12 L11 14 L15 10" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    title: "Local service, for Craiova",
    text: "We are from Craiova, for Craiova. We understand our community's needs and build long-term relationships with our clients.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M12 21 C12 21 3 15 3 8.5 A5 5 0 0 1 12 6 A5 5 0 0 1 21 8.5 C21 15 12 21 12 21 Z" strokeLinejoin="round" /></svg>,
  },
];

function EnWhySection() {
  return (
    <section className="border-y border-line/70 bg-pv-navy-50/55">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">Why us?</p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Why <span className="text-pv-red-600">Prima Valuta</span>?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              Over 10 years of currency exchange experience, with thousands of satisfied clients in Craiova.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-pv-red-600/30 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pv-red-600/10 text-pv-red-600 transition group-hover:bg-pv-red-600 group-hover:text-white">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-pv-navy-800">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Location section ──────────────────────────────────────────────────────────

function EnLocationSection() {
  const mapSrc = siteConfig.mapsEmbedUrl.startsWith("TODO_")
    ? "https://www.google.com/maps?q=Calea+Fratii+Golesti+nr+2+Bloc+M18+Craiova&output=embed"
    : siteConfig.mapsEmbedUrl;

  return (
    <section id="location" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal className="space-y-8">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Location &amp; Hours
          </h2>

          <div className="grid items-start gap-5 md:grid-cols-[60fr_40fr]">
            {/* Map */}
            <div className="overflow-hidden rounded-xl">
              <iframe
                title="Prima Valuta Craiova"
                src={mapSrc}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              {/* Address card */}
              <div className="rounded-xl border border-line bg-pv-navy-50 p-5">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-4 w-4 shrink-0 text-pv-red-600">
                      <path d="M10 2 C6.5 2 4 4.5 4 7.5 C4 12 10 18 10 18 C10 18 16 12 16 7.5 C16 4.5 13.5 2 10 2 Z" strokeLinejoin="round" />
                      <circle cx="10" cy="7.5" r="2" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-pv-navy-800">
                        Calea București - Frații Golești nr. 2, Bloc M18
                      </p>
                      <p className="text-xs text-muted-foreground">Bradu, Craiova, Romania</p>
                    </div>
                  </div>

                  <div className="h-px bg-line" />

                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-navy-400">
                      <circle cx="10" cy="10" r="8" />
                      <path d="M10 6 V10.5 L13 12.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex flex-1 items-baseline justify-between">
                      <span className="text-sm text-pv-navy-800">Monday – Sunday</span>
                      <span className="text-sm font-semibold text-pv-navy-800">08:00 – 22:30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="overflow-hidden rounded-xl border border-line">
                <Image
                  src="/image1.png"
                  alt="Prima Valuta — currency exchange Craiova"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* CTA */}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-pv-red-600 py-3.5 text-sm font-bold text-white transition hover:bg-pv-red-700"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 1.5 C5.5 1.5 3.5 3.5 3.5 6 C3.5 9.5 8 14.5 8 14.5 C8 14.5 12.5 9.5 12.5 6 C12.5 3.5 10.5 1.5 8 1.5 Z" strokeLinejoin="round" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Open in Maps
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function EnLanding() {
  const { ratesData, error, lastLoadedAt } = useRates();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang="en" />
      <main>
        <EnHero ratesData={ratesData} />
        <EnTrustBar />
        <EnRatesSection ratesData={ratesData} error={error} lastLoadedAt={lastLoadedAt} />
        <EnReviewsSection />
        <EnWhySection />
        <EnLocationSection />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
