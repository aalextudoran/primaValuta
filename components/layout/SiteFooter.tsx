import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const t = {
  ro: {
    tagline: `Casă de schimb valutar autorizată BNR, activă în Craiova din ${siteConfig.foundedIn}. Cursuri corecte, fără comisioane ascunse.`,
    contact: "Contact",
    hours: "Program",
    openMaps: "Deschide în Maps",
    rights: `© ${new Date().getFullYear()} Prima Valuta · Toate drepturile rezervate`,
    terms: "Termeni și condiții",
    privacy: "Politica de confidențialitate",
    schedule: "Luni – Duminică: 08:00 – 22:30",
  },
  en: {
    tagline: `BNR-authorized currency exchange in Craiova since ${siteConfig.foundedIn}. Transparent rates, no hidden fees.`,
    contact: "Contact",
    hours: "Hours",
    openMaps: "Open in Maps",
    rights: `© ${new Date().getFullYear()} Prima Valuta · All rights reserved`,
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    schedule: "Monday – Sunday: 08:00 – 22:30",
  },
};

export function SiteFooter({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const tx = t[lang];

  return (
    <footer id="contact" className="border-t border-line bg-pv-navy-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="footer" theme="light" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{tx.tagline}</p>
            <p className="text-xs text-muted-foreground">CUI {siteConfig.cui}</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-navy-400">{tx.contact}</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-pv-navy-800">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-4 w-4 shrink-0 text-pv-red-600">
                  <path d="M8 1.5 C5.5 1.5 3.5 3.5 3.5 6 C3.5 9.5 8 14.5 8 14.5 C8 14.5 12.5 9.5 12.5 6 C12.5 3.5 10.5 1.5 8 1.5 Z" strokeLinejoin="round" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-red-600">
                  <path d="M3 2.5 C3 2 3.5 1.5 4 1.5 L5.5 1.5 L6.5 4.5 L5.5 5.5 C5.5 5.5 6 7.5 7.5 9 C9 10.5 11 11 11 11 L12 10 L15 11 L15 12.5 C15 13 14.5 13.5 14 13.5 C8 13.5 3 8.5 3 2.5 Z" strokeLinejoin="round" />
                </svg>
                <a href={`tel:${siteConfig.phone}`} className="font-bold text-pv-red-600 hover:underline">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-navy-400">{tx.hours}</p>
            <p className="text-sm text-pv-navy-800">{tx.schedule}</p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-pv-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pv-red-700"
            >
              {tx.openMaps}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted-foreground">
          <p>{tx.rights}</p>
          <div className="flex gap-4">
            <Link href="/termeni-si-conditii" className="transition hover:text-pv-navy-800">
              {tx.terms}
            </Link>
            <Link href="/politica-confidentialitate" className="transition hover:text-pv-navy-800">
              {tx.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
