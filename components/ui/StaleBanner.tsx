"use client";

import { useEffect, useState } from "react";
import type { RatesPayload } from "@/lib/rates-types";

const STALE_MS = 24 * 60 * 60 * 1000;

function parseUpdatedAt(value: string): Date | null {
  const [datePart, timePart] = value.split(" ");
  if (!datePart || !timePart) return null;
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatAge(ms: number, lang: "ro" | "en"): string {
  const totalHours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);

  if (lang === "ro") {
    if (days >= 2) return `${days} zile`;
    if (days === 1) return "o zi";
    return `${totalHours} de ore`;
  }

  if (days >= 2) return `${days} days`;
  if (days === 1) return "1 day";
  return `${totalHours} hours`;
}

const copy = {
  ro: {
    label: "Atenție:",
    message: (age: string) =>
      `Cursurile valutare nu au mai fost actualizate de ${age}. Valorile afișate sunt orientative — verificați la sediu pentru cursurile actuale.`,
  },
  en: {
    label: "Notice:",
    message: (age: string) =>
      `Exchange rates haven't been updated for ${age}. Displayed values are indicative only — please verify at the office for current rates.`,
  },
} as const;

export function StaleBanner({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const [ageMs, setAgeMs] = useState<number | null>(null);
  const t = copy[lang];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/rates", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as RatesPayload;
        const date = parseUpdatedAt(data.updated_at);
        if (!date) return;
        const diff = Date.now() - date.getTime();
        if (diff > STALE_MS) setAgeMs(diff);
      } catch {
        // ignore fetch errors
      }
    })();
  }, []);

  if (ageMs === null) return null;

  return (
    <div className="border-b border-orange-200 bg-orange-50 py-3">
      <div className="mx-auto flex w-full max-w-6xl items-start gap-3 px-6">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
          aria-hidden="true"
        >
          <path d="M10 2.5 L18.5 17.5 H1.5 Z" strokeLinejoin="round" />
          <path d="M10 8 V12.5" strokeLinecap="round" />
          <circle cx="10" cy="15" r="0.75" fill="currentColor" stroke="none" />
        </svg>
        <p className="text-sm text-orange-800">
          <span className="font-semibold">{t.label}</span>{" "}
          {t.message(formatAge(ageMs, lang))}
        </p>
      </div>
    </div>
  );
}
