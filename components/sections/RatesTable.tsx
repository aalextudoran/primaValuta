"use client";

import { useCallback, useEffect, useState } from "react";
import type { RatesPayload } from "@/lib/rates-types";

const REFRESH_INTERVAL_MS = 60_000;

function parseUpdatedAt(value: string): Date | null {
  const [datePart, timePart] = value.split(" ");
  if (!datePart || !timePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatUpdatedLabel(updatedAt: string, lang: "ro" | "en"): string {
  const date = parseUpdatedAt(updatedAt);
  if (!date) {
    return lang === "ro" ? `Actualizat la ${updatedAt}` : `Updated at ${updatedAt}`;
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return lang === "ro" ? `Actualizat azi la ${hours}:${minutes}` : `Updated today at ${hours}:${minutes}`;
}

function formatRate(value: number): string {
  return value < 1 ? value.toFixed(4) : value.toFixed(2);
}

function formatSpread(buy: number, sell: number): string {
  const spread = sell - buy;
  if (spread < 0 || spread > 2) return "—";
  return `+${spread.toFixed(2)}`;
}

const copy = {
  ro: {
    invalidResponse: "Răspuns invalid de la server.",
    unknownError: "Eroare necunoscută.",
    cannotLoad: "Nu putem încărca cursurile",
    loading: "Încărcăm cursurile...",
    currency: "Valuta",
    buy: "Cumpărăm",
    sell: "Vindem",
    lastRefreshError: "Ultima eroare la refresh",
  },
  en: {
    invalidResponse: "Invalid response from server.",
    unknownError: "Unknown error.",
    cannotLoad: "Unable to load rates",
    loading: "Loading rates...",
    currency: "Currency",
    buy: "We buy",
    sell: "We sell",
    lastRefreshError: "Last refresh error",
  },
} as const;

export function RatesTable({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const t = copy[lang];
  const [data, setData] = useState<RatesPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(async () => {
    try {
      const response = await fetch("/api/rates", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(t.invalidResponse);
      }

      const payload = (await response.json()) as RatesPayload;
      setData(payload);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t.unknownError);
    }
  }, [t.invalidResponse, t.unknownError]);

  useEffect(() => {
    const initialTimeout = window.setTimeout(() => {
      void loadRates();
    }, 0);
    const interval = window.setInterval(loadRates, REFRESH_INTERVAL_MS);
    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(interval);
    };
  }, [loadRates]);

  if (!data) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-sm text-muted-foreground">
        {error ? `${t.cannotLoad}: ${error}` : t.loading}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[0_18px_45px_-35px_rgba(15,34,57,0.35)]">
        <table className="w-full min-w-[360px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-pv-navy-50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">{t.currency}</th>
              <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">{t.buy}</th>
              <th className="px-4 py-3 text-sm font-semibold text-pv-blue-mid md:px-6">{t.sell}</th>
              <th className="px-4 py-3 text-sm font-semibold text-muted-foreground md:px-6">Spread</th>
            </tr>
          </thead>
          <tbody>
            {data.rates.map((rate) => (
              <tr key={rate.currency} className="border-b border-line/70 last:border-none">
                <td className="px-4 py-4 text-base font-bold text-pv-navy-800 md:px-6">{rate.currency}</td>
                <td className="px-4 py-4 text-base font-semibold text-green-600 md:px-6">
                  {formatRate(rate.buy)}
                </td>
                <td className="px-4 py-4 text-base font-semibold text-pv-navy-400 md:px-6">
                  {formatRate(rate.sell)}
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground md:px-6">
                  {formatSpread(rate.buy, rate.sell)}
                </td>
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
        <span>{formatUpdatedLabel(data.updated_at, lang)}</span>
      </div>

      {error ? <p className="text-xs text-orange-700">{t.lastRefreshError}: {error}</p> : null}
    </div>
  );
}
