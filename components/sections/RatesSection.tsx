"use client";

import { siteConfig } from "@/lib/site-config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RatesTable } from "@/components/sections/RatesTable";
import { StaleBanner } from "@/components/ui/StaleBanner";

const copy = {
  ro: {
    id: "curs",
    title: "Curs",
    accent: "valutar",
    note: siteConfig.legalNote,
  },
  en: {
    id: "rates",
    title: "Exchange",
    accent: "rates",
    note: "Indicative rates. For transactions, please verify at the office.",
  },
} as const;

export function RatesSection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const t = copy[lang];
  return (
    <section id={t.id} className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
      <ScrollReveal className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            {t.title} <span className="text-pv-red-600">{t.accent}</span>
          </h2>
        </div>
        <StaleBanner lang={lang} />
        <RatesTable lang={lang} />
        <p className="text-sm text-muted-foreground">{t.note}</p>
      </ScrollReveal>
    </section>
  );
}
