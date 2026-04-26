export type CurrencyRate = {
  code: "EUR" | "USD" | "GBP" | "CHF" | "CAD" | "AUD" | "NOK" | "DKK" | "SEK";
  name: string;
  flag: string;
  buy: number;
  sell: number;
};

export const rates: CurrencyRate[] = [
  { code: "EUR", name: "Euro", flag: "EUR", buy: 4.95, sell: 5.03 },
  { code: "USD", name: "US Dollar", flag: "USD", buy: 4.56, sell: 4.67 },
  { code: "GBP", name: "British Pound", flag: "GBP", buy: 5.79, sell: 5.94 },
  { code: "CHF", name: "Swiss Franc", flag: "CHF", buy: 5.18, sell: 5.34 },
  { code: "CAD", name: "Dolar Canadian", flag: "CAD", buy: 3.25, sell: 3.38 },
  { code: "AUD", name: "Dolar Australian", flag: "AUD", buy: 2.90, sell: 3.02 },
  { code: "NOK", name: "Coroana Norvegiană", flag: "NOK", buy: 0.41, sell: 0.45 },
  { code: "DKK", name: "Coroana Daneză", flag: "DKK", buy: 0.65, sell: 0.70 },
  { code: "SEK", name: "Coroana Suedeză", flag: "SEK", buy: 0.43, sell: 0.47 },
];
