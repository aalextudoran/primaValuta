import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primavaluta.ro"),
  title: "Schimb Valutar Craiova | Prima Valuta — EUR, USD, GBP, CHF fără comisioane",
  description:
    "Casă de schimb valutar autorizată BNR în Craiova. Curs EUR, USD, GBP, CHF actualizat zilnic, fără comisioane ascunse. Calea București - Frații Golești nr. 2, Bloc M18, Bradu — Zilnic 08:00–22:30.",
  keywords: [
    "schimb valutar craiova",
    "curs valutar craiova",
    "casa de schimb craiova",
    "euro leu craiova",
    "currency exchange craiova",
    "schimb euro craiova",
    "curs euro azi craiova",
    "schimb valutar calea bucuresti craiova",
    "prima valuta craiova",
    "casa schimb autorizata bnr craiova",
  ],
  alternates: {
    canonical: "https://primavaluta.ro",
    languages: {
      ro: "https://primavaluta.ro",
      en: "https://primavaluta.ro/en",
      "x-default": "https://primavaluta.ro",
    },
  },
  openGraph: {
    title: "Prima Valuta — Schimb Valutar Craiova fără comisioane",
    description:
      "Curs EUR, USD, GBP, CHF actualizat zilnic. Autorizat BNR din 2013. Rapid, sigur, fără comisioane ascunse. Craiova, Calea București - Frații Golești nr. 2, Bloc M18.",
    locale: "ro_RO",
    alternateLocale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prima Valuta — Schimb Valutar Craiova",
    description: "Curs EUR, USD, GBP, CHF actualizat zilnic. Fără comisioane. Autorizat BNR.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "CurrencyExchangeService",
    name: "Prima Valuta",
    description: "Casa de schimb valutar in Craiova. Cursuri EUR, USD, GBP, CHF actualizate zilnic.",
    url: "https://primavaluta.ro",
    telephone: "+40773392419",
    email: "contact@primavaluta.ro",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calea București - Frații Golești nr. 2, Bloc M18",
      addressLocality: "Craiova",
      addressRegion: "Dolj",
      postalCode: "",
      addressCountry: "RO",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:30",
      },
    ],
    currenciesAccepted: "EUR, USD, GBP, CHF, RON",
    priceRange: "EUR",
    image: "https://primavaluta.ro/image1.png",
    foundingDate: "2013",
  };

  return (
    <html
      lang="ro"
      className={`${inter.variable} ${playfairDisplay.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="prima-valuta-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        {children}
      </body>
    </html>
  );
}
