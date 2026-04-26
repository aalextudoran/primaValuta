import { NextResponse } from "next/server";
import { SUPPORTED_CURRENCIES } from "@/lib/rates-types";

export const dynamic = "force-dynamic";

function extractBnrRate(xml: string, currency: (typeof SUPPORTED_CURRENCIES)[number]): number | null {
  const regex = new RegExp(
    `<Rate\\s+currency="${currency}"(?:\\s+multiplier="(\\d+)")?>([\\d,.]+)<\\/Rate>`,
    "i"
  );
  const match = xml.match(regex);

  if (!match) {
    return null;
  }

  const multiplier = Number(match[1] ?? "1");
  const value = Number(match[2].replace(",", "."));
  if (!Number.isFinite(value) || !Number.isFinite(multiplier) || multiplier <= 0) {
    return null;
  }

  return value / multiplier;
}

export async function GET() {
  try {
    const response = await fetch("https://www.bnr.ro/nbrfxrates.xml", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Nu am putut prelua cursul BNR." }, { status: 502 });
    }

    const xml = await response.text();
    const rates = Object.fromEntries(
      SUPPORTED_CURRENCIES.map((currency) => [currency, extractBnrRate(xml, currency)])
    );

    return NextResponse.json({ source: "BNR", rates });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Eroare la citirea cursului BNR.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
