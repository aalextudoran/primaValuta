import { NextResponse } from "next/server";
import { getRates, saveRates } from "@/lib/rates-store";
import { SUPPORTED_CURRENCIES, type RateItem, type RatesPayload } from "@/lib/rates-types";

export const dynamic = "force-dynamic";

function isValidRateItem(value: unknown): value is RateItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.currency === "string" &&
    SUPPORTED_CURRENCIES.includes(item.currency as (typeof SUPPORTED_CURRENCIES)[number]) &&
    typeof item.buy === "number" &&
    Number.isFinite(item.buy) &&
    typeof item.sell === "number" &&
    Number.isFinite(item.sell)
  );
}

function isValidPayload(value: unknown): value is Omit<RatesPayload, "updated_at" | "published_by"> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const body = value as Record<string, unknown>;
  return Array.isArray(body.rates) && body.rates.length > 0 && body.rates.every(isValidRateItem);
}

export async function GET() {
  try {
    const rates = await getRates();
    return NextResponse.json(rates);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Nu am putut încărca cursurile.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Payload invalid." }, { status: 400 });
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}`;

    const payload: RatesPayload = {
      updated_at: timestamp,
      published_by: "admin",
      rates: body.rates,
    };

    await saveRates(payload);
    return NextResponse.json({ success: true, updated_at: payload.updated_at });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Nu am putut salva cursurile.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
