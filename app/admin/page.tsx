"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { SUPPORTED_CURRENCIES, type SupportedCurrency } from "@/lib/rates-types";

type RatesResponse = {
  updated_at: string;
  published_by: string;
  rates: Array<{
    currency: SupportedCurrency;
    buy: number;
    sell: number;
  }>;
};

type FormState = Record<SupportedCurrency, { buy: string; sell: string }>;

const STORAGE_KEY = "prima-valuta-admin-token";

const CURRENCY_FLAGS: Record<SupportedCurrency, string> = {
  EUR: "🇪🇺",
  USD: "🇺🇸",
  GBP: "🇬🇧",
  CHF: "🇨🇭",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  NOK: "🇳🇴",
  DKK: "🇩🇰",
  SEK: "🇸🇪",
};

function emptyForm(): FormState {
  return Object.fromEntries(
    SUPPORTED_CURRENCIES.map((c) => [c, { buy: "", sell: "" }])
  ) as FormState;
}

function toFixedMaybe(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(4) : "—";
}

// ─── Login screen ────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
}: {
  onLogin: (token: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Parolă incorectă. Încearcă din nou.");
      return;
    }

    const payload = (await response.json()) as { token: string };
    window.localStorage.setItem(STORAGE_KEY, payload.token);
    onLogin(payload.token);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pv-blue-mid via-pv-navy-600 to-pv-red-600" />

          <div className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pv-navy-800">
                <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" className="h-5 w-5">
                  <rect x="4" y="9" width="12" height="9" rx="1.5" />
                  <path d="M7 9 V6 A3 3 0 0 1 13 6 V9" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin</p>
                <h1 className="text-lg font-bold text-pv-navy-800">Panou administrare</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Parolă
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-line bg-pv-navy-50 px-4 py-3 text-sm text-pv-navy-800 outline-none transition focus:border-pv-blue-mid focus:ring-2 focus:ring-pv-blue-mid/20"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-red-600">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 5 V8.5" strokeLinecap="round" />
                    <circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                  <p className="text-xs font-medium text-pv-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-pv-navy-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-pv-navy-900 disabled:opacity-60"
              >
                {loading ? "Se verifică..." : "Intră în admin"}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prima Valuta · Panou intern
        </p>
      </div>
    </div>
  );
}

// ─── Currency row ─────────────────────────────────────────────────────────────

function CurrencyRow({
  currency,
  buyValue,
  sellValue,
  bnrRef,
  onBuyChange,
  onSellChange,
}: {
  currency: SupportedCurrency;
  buyValue: string;
  sellValue: string;
  bnrRef: number | null;
  onBuyChange: (v: string) => void;
  onSellChange: (v: string) => void;
}) {
  const buy = Number(buyValue);
  const sell = Number(sellValue);
  const spread = Number.isFinite(buy) && Number.isFinite(sell) && buyValue && sellValue
    ? (sell - buy).toFixed(2)
    : "—";

  const bnrDiff =
    bnrRef && Number.isFinite(buy)
      ? ((buy - bnrRef) / bnrRef) * 100
      : null;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{CURRENCY_FLAGS[currency]}</span>
          <div>
            <p className="text-lg font-black tracking-tight text-pv-navy-800">{currency}</p>
            {bnrRef && (
              <p className="text-xs text-muted-foreground">
                BNR: <span className="font-semibold text-pv-navy-400">{toFixedMaybe(bnrRef)}</span>
                {bnrDiff !== null && (
                  <span className={`ml-1 ${bnrDiff >= 0 ? "text-green-600" : "text-pv-red-600"}`}>
                    ({bnrDiff >= 0 ? "+" : ""}{bnrDiff.toFixed(2)}%)
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-lg bg-pv-navy-50 px-3 py-1 text-center">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Spread</p>
          <p className="text-sm font-bold text-pv-navy-800">{spread}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-green-700">
            Cumpărăm
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0001"
              value={buyValue}
              onChange={(e) => onBuyChange(e.target.value)}
              placeholder="0.0000"
              className="w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-base font-semibold text-pv-navy-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
              RON
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-pv-blue-mid">
            Vindem
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0001"
              value={sellValue}
              onChange={(e) => onSellChange(e.target.value)}
              placeholder="0.0000"
              className="w-full rounded-xl border border-pv-blue-mid/30 bg-pv-navy-50 px-4 py-3 text-base font-semibold text-pv-navy-800 outline-none transition focus:border-pv-blue-mid focus:ring-2 focus:ring-pv-blue-mid/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
              RON
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [formState, setFormState] = useState<FormState>(emptyForm());
  const [bnrRates, setBnrRates] = useState<Record<SupportedCurrency, number | null>>(
    Object.fromEntries(SUPPORTED_CURRENCIES.map((c) => [c, null])) as Record<SupportedCurrency, number | null>
  );
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublished, setLastPublished] = useState<string>("—");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [ratesResponse, bnrResponse] = await Promise.all([
        fetch("/api/rates", { cache: "no-store" }),
        fetch("/api/bnr", { cache: "no-store" }),
      ]);

      if (ratesResponse.ok) {
        const rates = (await ratesResponse.json()) as RatesResponse;
        setLastPublished(rates.updated_at);
        setFormState(
          Object.fromEntries(
            SUPPORTED_CURRENCIES.map((c) => {
              const r = rates.rates.find((x) => x.currency === c);
              return [c, { buy: r?.buy.toString() ?? "", sell: r?.sell.toString() ?? "" }];
            })
          ) as FormState
        );
      }

      if (bnrResponse.ok) {
        const bnr = (await bnrResponse.json()) as { rates: Record<SupportedCurrency, number | null> };
        setBnrRates(bnr.rates);
      }

      setIsLoading(false);
    };

    loadData().catch(() => {
      setError("Nu am putut încărca datele.");
      setIsLoading(false);
    });
  }, [token]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const parsedRates = useMemo(
    () => SUPPORTED_CURRENCIES.map((currency) => ({
      currency,
      buy: Number(formState[currency].buy),
      sell: Number(formState[currency].sell),
    })),
    [formState]
  );

  async function publishRates() {
    setError(null);
    const invalid = parsedRates.some((r) => !Number.isFinite(r.buy) || !Number.isFinite(r.sell));
    if (invalid) {
      setError("Completează toate valorile cu numere valide.");
      return;
    }
    setIsPublishing(true);
    const response = await fetch("/api/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ rates: parsedRates }),
    });
    setIsPublishing(false);
    if (!response.ok) {
      setError("Publicarea a eșuat. Verifică token-ul sau datele.");
      return;
    }
    const payload = (await response.json()) as { updated_at: string };
    setLastPublished(payload.updated_at);
    setToast("✓ Cursul a fost publicat cu succes.");
  }

  function setBuy(currency: SupportedCurrency, v: string) {
    setFormState((prev) => ({ ...prev, [currency]: { ...prev[currency], buy: v } }));
  }
  function setSell(currency: SupportedCurrency, v: string) {
    setFormState((prev) => ({ ...prev, [currency]: { ...prev[currency], sell: v } }));
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      {/* Page header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin</p>
          <h1 className="text-2xl font-black text-pv-navy-800">Editor cursuri valutare</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ultima publicare: <span className="font-semibold text-pv-navy-800">{lastPublished}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-pv-red-600/50 hover:text-pv-red-600"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M10 8 H3 M6 5 L3 8 L6 11" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 4 V2.5 A1.5 1.5 0 0 1 8.5 1 H13 A1.5 1.5 0 0 1 14.5 2.5 V13.5 A1.5 1.5 0 0 1 13 15 H8.5 A1.5 1.5 0 0 1 7 13.5 V12" strokeLinecap="round" />
          </svg>
          Deconectare
        </button>
      </div>

      {/* BNR info banner */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-pv-blue-mid/20 bg-pv-blue-mid/5 px-4 py-3">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-blue-mid">
          <circle cx="10" cy="10" r="8.5" />
          <path d="M10 9 V14" strokeLinecap="round" />
          <circle cx="10" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
        <p className="text-xs text-pv-blue-mid">
          Valorile de referință BNR sunt afișate sub fiecare valută. Diferența procentuală față de cursul BNR este calculată automat.
        </p>
      </div>

      {/* Currency grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(SUPPORTED_CURRENCIES.length)].map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-line/50" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {SUPPORTED_CURRENCIES.map((currency) => (
            <CurrencyRow
              key={currency}
              currency={currency}
              buyValue={formState[currency].buy}
              sellValue={formState[currency].sell}
              bnrRef={bnrRates[currency]}
              onBuyChange={(v) => setBuy(currency, v)}
              onSellChange={(v) => setSell(currency, v)}
            />
          ))}
        </div>
      )}

      {/* Publish footer */}
      <div className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-pv-navy-800">Publică cursul pe site</p>
            <p className="text-xs text-muted-foreground">Modificările devin vizibile imediat pentru toți utilizatorii.</p>
          </div>
          <button
            type="button"
            onClick={publishRates}
            disabled={isPublishing || isLoading}
            className="flex items-center gap-2 rounded-xl bg-pv-navy-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-pv-navy-900 disabled:opacity-60"
          >
            {isPublishing ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Publicăm...
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
                  <path d="M8 1.5 V10.5 M4.5 7 L8 10.5 L11.5 7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 13 H14" strokeLinecap="round" />
                </svg>
                Publică cursul
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-red-600">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5 V8.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none" />
            </svg>
            <p className="text-xs font-medium text-pv-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-pv-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-green-400">
            <path d="M2.5 8 L6.5 12 L13.5 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });

  function handleLogin(newToken: string) {
    setToken(newToken);
  }

  function handleLogout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
