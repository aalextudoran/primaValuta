import { promises as fs } from "node:fs";
import path from "node:path";
import { SUPPORTED_CURRENCIES, type RateItem, type RatesPayload } from "@/lib/rates-types";

const FILE_PATH = path.join(process.cwd(), "data", "rates.json");
const KV_KEY = "prima-valuta:rates";

function toNumericRate(rate: RateItem): RateItem {
  return {
    currency: rate.currency,
    buy: Number(rate.buy),
    sell: Number(rate.sell),
  };
}

function normalizeRates(payload: RatesPayload): RatesPayload {
  const rates = payload.rates
    .filter((rate) => SUPPORTED_CURRENCIES.includes(rate.currency))
    .map(toNumericRate)
    .sort(
      (a, b) => SUPPORTED_CURRENCIES.indexOf(a.currency) - SUPPORTED_CURRENCIES.indexOf(b.currency)
    );

  return {
    updated_at: payload.updated_at,
    published_by: payload.published_by,
    rates,
  };
}

function shouldUseVercelKv(): boolean {
  return process.env.USE_VERCEL_KV === "true";
}

async function readFromFile(): Promise<RatesPayload> {
  const raw = await fs.readFile(FILE_PATH, "utf-8");
  return normalizeRates(JSON.parse(raw) as RatesPayload);
}

async function writeToFile(payload: RatesPayload): Promise<void> {
  await fs.writeFile(FILE_PATH, `${JSON.stringify(normalizeRates(payload), null, 2)}\n`, "utf-8");
}

function getKvCredentials() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("KV credentials missing. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
  }

  return { url, token };
}

async function readFromKv(): Promise<RatesPayload | null> {
  const { url, token } = getKvCredentials();
  const response = await fetch(`${url}/get/${encodeURIComponent(KV_KEY)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`KV read failed with status ${response.status}`);
  }

  // Upstash returns the value as a JSON string in result, not a parsed object.
  const json = (await response.json()) as { result: string | null };
  if (!json.result) return null;
  return normalizeRates(JSON.parse(json.result) as RatesPayload);
}

async function writeToKv(payload: RatesPayload): Promise<void> {
  const { url, token } = getKvCredentials();
  // Use pipeline with body to avoid URL-length limits and encoding issues.
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([["SET", KV_KEY, JSON.stringify(normalizeRates(payload))]]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`KV write failed with status ${response.status}`);
  }
}

export async function getRates(): Promise<RatesPayload> {
  if (!shouldUseVercelKv()) {
    return readFromFile();
  }

  // On Vercel, filesystem writes are read-only. Keep the same interface and switch storage to KV.
  const kvData = await readFromKv();
  if (kvData) {
    return kvData;
  }

  // KV is empty — seed it from the bundled file (first deploy).
  // If the file is also unavailable, throw a clear error rather than crashing opaquely.
  let fallback: RatesPayload;
  try {
    fallback = await readFromFile();
  } catch {
    throw new Error(
      "KV store is empty and fallback rates file is not available. Deploy with outputFileTracingIncludes or seed KV manually."
    );
  }

  try {
    await writeToKv(fallback);
  } catch {
    // Non-fatal: return the file data even if the KV seed write fails.
  }

  return fallback;
}

export async function saveRates(payload: RatesPayload): Promise<void> {
  if (!shouldUseVercelKv()) {
    await writeToFile(payload);
    return;
  }

  // On Vercel, filesystem writes are read-only. Keep the same interface and switch storage to KV.
  await writeToKv(payload);
}
