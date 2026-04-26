"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SUPPORTED_CURRENCIES, type RatesPayload, type SupportedCurrency } from "@/lib/rates-types";
import { siteConfig } from "@/lib/site-config";

const PILL_CURRENCIES = ["EUR", "USD", "GBP", "CHF"] as const;

type HeroSectionProps = {
  lang?: "ro" | "en";
};

const copy = {
  ro: {
    badge: "● SCHIMB VALUTAR · CRAIOVA · AUTORIZAT BNR",
    title: "Curs valutar corect.",
    titleBreak: "Fără comisioane.",
    buyTab: "Cumpăr valută",
    sellTab: "Vând valută",
    resultPay: "Plătiți",
    resultReceive: "Primiți",
    sellRateHint: "cursul de vânzare",
    buyRateHint: "cursul de cumpărare",
    buyLabel: "Cumpăr",
    sellLabel: "Vând",
    trust: ["Autorizat BNR", "Din 2013", "Fără comisioane"],
  },
  en: {
    badge: "● CURRENCY EXCHANGE · CRAIOVA · BNR AUTHORIZED",
    title: "Fair exchange rates.",
    titleBreak: "No hidden fees.",
    buyTab: "Buy currency",
    sellTab: "Sell currency",
    resultPay: "You pay",
    resultReceive: "You receive",
    sellRateHint: "sell rate",
    buyRateHint: "buy rate",
    buyLabel: "Buy",
    sellLabel: "Sell",
    trust: ["BNR authorized", "Since 2013", "No hidden fees"],
  },
} as const;

export function HeroSection({ lang = "ro" }: HeroSectionProps) {
  const t = copy[lang];
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState<SupportedCurrency>("EUR");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [ratesData, setRatesData] = useState<RatesPayload | null>(null);

  useEffect(() => {
    const loadRates = async () => {
      const response = await fetch("/api/rates", { cache: "no-store" });
      if (!response.ok) return;
      const payload = (await response.json()) as RatesPayload;
      setRatesData(payload);
    };
    const timer = window.setTimeout(() => { void loadRates(); }, 0);
    const interval = window.setInterval(() => { void loadRates(); }, 60_000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, []);

  const currentRate = useMemo(
    () => ratesData?.rates.find((r) => r.currency === currency) ?? null,
    [currency, ratesData]
  );

  const appliedRate = currentRate ? (direction === "buy" ? currentRate.sell : currentRate.buy) : null;
  const converted = appliedRate ? (Number.parseFloat(amount || "0") * appliedRate).toFixed(2) : "—";
  const resultLabel = direction === "buy" ? t.resultPay : t.resultReceive;
  const rateHint = direction === "buy" ? t.sellRateHint : t.buyRateHint;

  return (
    <section className="relative flex min-h-[600px] items-end overflow-hidden pb-10 pt-6">
      {/* Background photo */}
      <Image
        src="/image4.png"
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: "center 35%" }}
        priority
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8,20,45,0.72)", backdropFilter: "blur(3px)" }}
      />

      {/* White card container */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* 3-column grid */}
          <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-[1fr_300px_220px] md:divide-x md:divide-y-0">

            {/* Col 1 — Tag + Headline */}
            <div className="flex flex-col justify-center p-8">
              <p
                className="mb-5 font-bold uppercase tracking-[0.16em] text-[#C8121E]"
                style={{ fontSize: "11px" }}
              >
                {t.badge}
              </p>
              <h1 className="text-[38px] font-bold leading-tight text-pv-navy-800">
                {t.title}
                <br />
                {t.titleBreak}
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
                  {t.buyTab}
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
                  {t.sellTab}
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
                  <p className="mt-1 text-xs font-semibold text-[#1560BD]">
                    RON · {rateHint}
                  </p>
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
                        <span className="text-[10px] uppercase tracking-wide text-pv-navy-400">{t.buyLabel}</span>
                        <span className="text-sm font-bold text-green-600">
                          {rate ? rate.buy.toFixed(4) : "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wide text-pv-navy-400">{t.sellLabel}</span>
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
            {[...t.trust, siteConfig.phone].map((item) => (
              <span key={item} className="text-sm font-medium text-pv-navy-600">
                ● {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
