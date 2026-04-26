import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSectionContent } from "@/components/sections/LocationSection";
import { RatesSection } from "@/components/sections/RatesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhySection } from "@/components/sections/WhySection";

export const metadata: Metadata = {
  title: "Currency Exchange Craiova | Prima Valuta — EUR, USD, GBP, CHF, CAD, AUD, NOK, DKK, SEK",
  description:
    "Authorized currency exchange in Craiova, Romania. Daily updated EUR, USD, GBP, CHF, CAD, AUD, NOK, DKK, SEK rates. No hidden fees. Open 7 days, 08:00–22:30. Calea București - Frații Golești nr. 2, Bloc M18, Bradu.",
  keywords: [
    "currency exchange craiova",
    "exchange rates craiova romania",
    "buy euros craiova",
    "buy dollars craiova",
    "prima valuta craiova",
    "bnr authorized exchange craiova",
    "schimb valutar craiova english",
    "currency exchange near craiova",
    "best exchange rate craiova",
  ],
  alternates: {
    canonical: "https://primavaluta.ro/en",
    languages: {
      ro: "https://primavaluta.ro",
      en: "https://primavaluta.ro/en",
      "x-default": "https://primavaluta.ro",
    },
  },
  openGraph: {
    title: "Prima Valuta — Currency Exchange Craiova",
    description:
      "EUR, USD, GBP, CHF and more. Updated daily. BNR authorized since 2013. No hidden fees. Open every day 08:00–22:30.",
    locale: "en_GB",
    alternateLocale: "ro_RO",
    type: "website",
    images: ["/image1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prima Valuta — Currency Exchange Craiova",
    description: "Daily updated EUR, USD, GBP, CHF rates. No fees. BNR authorized.",
    images: ["/image1.png"],
  },
};

export default function EnPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang="en" />
      <main>
        <HeroSection lang="en" />
        <TrustBarSection lang="en" />
        <RatesSection lang="en" />
        <ReviewsSection lang="en" />
        <WhySection lang="en" />
        <LocationSectionContent lang="en" />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
