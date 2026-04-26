import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M2 12 C4.5 6 19.5 6 22 12 C19.5 18 4.5 18 2 12 Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M13 2 L5 13 H12 L11 22 L20 11 H13 Z" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M12 2 L20 5.5 V12 C20 17 12 22 12 22 C12 22 4 17 4 12 V5.5 Z" strokeLinejoin="round" />
    <path d="M9 12 L11 14 L15 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path d="M12 21 C12 21 3 15 3 8.5 A5 5 0 0 1 12 6 A5 5 0 0 1 21 8.5 C21 15 12 21 12 21 Z" strokeLinejoin="round" />
  </svg>
);

const benefits = [
  {
    icon: <EyeIcon />,
    title: "Curs real",
    text: "Cursul afișat e cel pe care îl primești. Niciun comision, nicio surpriză.",
  },
  {
    icon: <BoltIcon />,
    title: "2-3 minute",
    text: "Nu completezi formulare. Intri, schimbi și pleci în câteva minute.",
  },
  {
    icon: <ShieldIcon />,
    title: "Din 2013",
    text: "Autorizați BNR, cu experiență dovedită pe piața din Craiova.",
  },
  {
    icon: <HeartIcon />,
    title: "100% local",
    text: "O casă de schimb locală, nu o sucursală. Te cunoaștem.",
  },
];

const benefitsEn = [
  {
    icon: <EyeIcon />,
    title: "Real rate",
    text: "The posted rate is what you get. No fees, no surprises.",
  },
  {
    icon: <BoltIcon />,
    title: "2-3 minutes",
    text: "No paperwork for standard amounts. In and out in minutes.",
  },
  {
    icon: <ShieldIcon />,
    title: "Since 2013",
    text: "BNR-authorized with a proven track record in Craiova.",
  },
  {
    icon: <HeartIcon />,
    title: "100% local",
    text: "A local exchange, not a chain. We know our customers.",
  },
];

export function WhySection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const data = lang === "ro" ? benefits : benefitsEn;
  const pretitle = lang === "ro" ? "De ce noi?" : "Why us?";
  const titlePrefix = lang === "ro" ? "De ce" : "Why";
  const subtitle =
    lang === "ro"
      ? "Din 2013 în Craiova — un loc în care cursul afișat este cursul real, fără surprize și fără timp pierdut."
      : "In Craiova since 2013 — a place where the displayed rate is the real rate, no surprises and no wasted time.";

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <ScrollReveal className="space-y-12">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">{pretitle}</p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              {titlePrefix} <span className="text-pv-red-600">Prima Valuta</span>?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">{subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {data.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center gap-4 text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "#CC0000" }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-[15px] font-bold" style={{ color: "#0D1B2A" }}>
                  {benefit.title}
                </h3>
                <p className="line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
