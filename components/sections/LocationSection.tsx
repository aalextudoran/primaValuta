import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LazyMap } from "@/components/ui/LazyMap";

export function LocationSection() {
  return <LocationSectionContent lang="ro" />;
}

export function LocationSectionContent({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const isRo = lang === "ro";
  const idLocation = isRo ? "locatie" : "location";
  const idHours = isRo ? "program" : "hours";
  const title = isRo ? "Locație și program" : "Location and hours";
  const addressLine = siteConfig.address;
  const days = isRo ? "Luni – Duminică" : "Monday – Sunday";
  const openMaps = isRo ? "Deschide în Maps" : "Open in Maps";

  const mapSrc =
    siteConfig.mapsEmbedUrl.startsWith("TODO_")
      ? "https://www.google.com/maps?q=Calea+Bucuresti+68+Bloc+R2+Craiova&output=embed"
      : siteConfig.mapsEmbedUrl;

  return (
    <section id={idLocation} className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal className="space-y-8">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>

          {/* Grid — 60/40 on desktop, stacked on mobile */}
          <div className="grid items-start gap-5 md:grid-cols-[60fr_40fr]">

            {/* ── Left: Map ── */}
            <LazyMap src={mapSrc} title="Prima Valuta Craiova" />

            {/* ── Right: photo + address + CTA ── */}
            <div className="flex flex-col gap-4">
              {/* Address card */}
              <div id={idHours} className="rounded-xl border border-line bg-pv-navy-50 p-5">
                <div className="space-y-3.5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-4 w-4 shrink-0 text-pv-red-600">
                      <path d="M10 2 C6.5 2 4 4.5 4 7.5 C4 12 10 18 10 18 C10 18 16 12 16 7.5 C16 4.5 13.5 2 10 2 Z" strokeLinejoin="round" />
                      <circle cx="10" cy="7.5" r="2" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-pv-navy-800">
                        {addressLine}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-line" />

                  {/* Every day */}
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-pv-navy-400">
                      <circle cx="10" cy="10" r="8" />
                      <path d="M10 6 V10.5 L13 12.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex items-baseline justify-between flex-1">
                      <span className="text-sm text-pv-navy-800">{days}</span>
                      <span className="text-sm font-semibold text-pv-navy-800">08:00 – 22:30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="overflow-hidden rounded-xl border border-line">
                <Image
                  src="/image1.png"
                  alt="Prima Valuta — casă de schimb valutar Craiova"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* CTA — full width */}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-pv-red-600 py-3.5 text-sm font-bold text-white transition hover:bg-pv-red-700"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 1.5 C5.5 1.5 3.5 3.5 3.5 6 C3.5 9.5 8 14.5 8 14.5 C8 14.5 12.5 9.5 12.5 6 C12.5 3.5 10.5 1.5 8 1.5 Z" strokeLinejoin="round" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                {openMaps}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
