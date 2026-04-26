export const SUPPORTED_CURRENCIES = ["EUR", "USD", "GBP", "CHF", "CAD", "AUD", "NOK", "DKK", "SEK"] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export type RateItem = {
  currency: SupportedCurrency;
  buy: number;
  sell: number;
};

export type RatesPayload = {
  updated_at: string;
  published_by: string;
  rates: RateItem[];
};
