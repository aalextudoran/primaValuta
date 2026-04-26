"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const NAV_LINKS = {
  ro: [
    { href: "#curs", label: "Curs valutar" },
    { href: "#locatie", label: "Locație" },
    { href: "#program", label: "Program" },
    { href: "#contact", label: "Contact" },
  ],
  en: [
    { href: "#rates", label: "Exchange Rates" },
    { href: "#location", label: "Location" },
    { href: "#hours", label: "Hours" },
    { href: "#contact", label: "Contact" },
  ],
};

export function SiteHeader({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = NAV_LINKS[lang];
  const closeLabel = lang === "ro" ? "Închide meniu" : "Close menu";
  const openLabel = lang === "ro" ? "Deschide meniu" : "Open menu";
  const homeHref = lang === "ro" ? "/" : "/en";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link href={homeHref} aria-label="Prima Valuta">
          <Logo variant="navbar" theme="light" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-x-5 text-sm font-medium text-pv-navy-400 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-pv-navy-800">
              {link.label}
            </a>
          ))}
          <span className="mx-1 h-4 w-px bg-pv-navy-600" />
          <Link href="/" className={`font-bold transition hover:text-pv-navy-800 ${lang === "ro" ? "text-pv-red-600" : "text-pv-navy-400"}`}>
            RO
          </Link>
          <span className="text-pv-navy-600">|</span>
          <Link href="/en" className={`font-bold transition hover:text-pv-navy-800 ${lang === "en" ? "text-pv-red-600" : "text-pv-navy-400"}`}>
            EN
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isOpen ? closeLabel : openLabel}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-pv-navy-800 transition hover:bg-pv-navy-50 md:hidden"
        >
          {isOpen ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
              <path d="M4 4 L16 16 M16 4 L4 16" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
              <path d="M3 5 H17 M3 10 H17 M3 15 H17" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <nav className="border-t border-line bg-white px-6 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-pv-navy-800 transition hover:bg-pv-navy-50"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3 pt-2">
              <Link href="/" className={`text-sm font-bold transition hover:text-pv-navy-800 ${lang === "ro" ? "text-pv-red-600" : "text-pv-navy-400"}`} onClick={() => setIsOpen(false)}>
                RO
              </Link>
              <span className="text-pv-navy-600">|</span>
              <Link href="/en" className={`text-sm font-bold transition hover:text-pv-navy-800 ${lang === "en" ? "text-pv-red-600" : "text-pv-navy-400"}`} onClick={() => setIsOpen(false)}>
                EN
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
