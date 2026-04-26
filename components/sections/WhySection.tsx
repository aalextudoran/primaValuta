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
    title: "Transparență totală",
    text: "Cursurile sunt afișate clar la intrare și pe site. Niciun cost ascuns, nicio surpriză la final — prețul pe care îl vezi este prețul pe care îl plătești.",
  },
  {
    icon: <BoltIcon />,
    title: "Tranzacții rapide",
    text: "Fiecare schimb durează câteva minute. Nu vei pierde timp la coadă sau cu formulare complicate. Respectăm timpul tău.",
  },
  {
    icon: <ShieldIcon />,
    title: "Autorizat BNR din 2013",
    text: "Operăm conform reglementărilor Băncii Naționale a României. Toate tranzacțiile sunt legale, documentate și în siguranță deplină.",
  },
  {
    icon: <HeartIcon />,
    title: "Serviciu local, pentru Craiova",
    text: "Suntem din Craiova, pentru Craiova. Cunoaștem nevoile comunității noastre și construim relații pe termen lung cu clienții noștri.",
  },
];

const benefitsEn = [
  {
    icon: <EyeIcon />,
    title: "Total transparency",
    text: "Rates are displayed clearly at the office and on the website. No hidden costs and no surprises at the counter.",
  },
  {
    icon: <BoltIcon />,
    title: "Fast transactions",
    text: "Each exchange takes only a few minutes. No waiting lines and no complicated paperwork.",
  },
  {
    icon: <ShieldIcon />,
    title: "BNR authorized since 2013",
    text: "We operate under National Bank of Romania regulations. Every transaction is legal, documented, and secure.",
  },
  {
    icon: <HeartIcon />,
    title: "Local service for Craiova",
    text: "We are from Craiova, for Craiova. We understand local needs and build long-term relationships with customers.",
  },
];

export function WhySection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const data = lang === "ro" ? benefits : benefitsEn;
  const pretitle = lang === "ro" ? "De ce noi?" : "Why us?";
  const titlePrefix = lang === "ro" ? "De ce" : "Why";
  const subtitle =
    lang === "ro"
      ? "Peste 10 ani de experiență în schimb valutar, cu mii de clienți mulțumiți din Craiova și împrejurimi."
      : "Over 10 years of exchange experience, with thousands of satisfied customers in Craiova and nearby areas.";
  return (
    <section className="border-y border-line/70 bg-pv-navy-50/55">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">{pretitle}</p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              {titlePrefix} <span className="text-pv-red-600">Prima Valuta</span>?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {data.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-pv-red-600/30 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pv-red-600/10 text-pv-red-600 transition group-hover:bg-pv-red-600 group-hover:text-white">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-pv-navy-800">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
