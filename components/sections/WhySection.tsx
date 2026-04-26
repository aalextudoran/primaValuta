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
    title: "Cursul pe care îl vezi e cel real",
    text: "Afișăm cursurile pe panoul de la intrare și pe site. Nu există taxă de schimb, comision de procesare sau adaosuri. Dai exact cât scrie — fără surprize la casă.",
  },
  {
    icon: <BoltIcon />,
    title: "Intri, schimbi, pleci",
    text: "Pentru sume obișnuite nu completezi niciun formular. Tranzacția durează 2–3 minute. Suntem deschiși zilnic 08:00–22:30, inclusiv weekend și sărbători legale.",
  },
  {
    icon: <ShieldIcon />,
    title: "Autorizat BNR din 2013",
    text: "Avem autorizația Băncii Naționale a României și operăm conform legislației în vigoare. Fiecare tranzacție este înregistrată și documentată legal — nu există zonă gri.",
  },
  {
    icon: <HeartIcon />,
    title: "O casă de schimb locală, nu o sucursală",
    text: "Mulți clienți vin la noi de ani de zile — înainte de concediu, după salariu, ori de câte ori au nevoie de valută rapid. Îți cunoaștem fața și îți respectăm timpul.",
  },
];

const benefitsEn = [
  {
    icon: <EyeIcon />,
    title: "The rate you see is what you pay",
    text: "Rates are displayed on the board at the entrance and on the website. No exchange fee, no processing charge, no markup. You pay exactly what's shown — no surprises at the counter.",
  },
  {
    icon: <BoltIcon />,
    title: "In and out in minutes",
    text: "No forms for standard amounts. Each transaction takes 2–3 minutes. Open every day 08:00–22:30, including weekends and public holidays.",
  },
  {
    icon: <ShieldIcon />,
    title: "BNR authorized since 2013",
    text: "We hold a National Bank of Romania authorization and operate within full legal compliance. Every transaction is recorded and documented — no grey areas.",
  },
  {
    icon: <HeartIcon />,
    title: "A local exchange, not a chain",
    text: "Many of our customers have been coming for years — before a holiday, after payday, whenever they need currency fast. We know our regulars and we respect their time.",
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
    <section className="border-y border-line/70 bg-pv-navy-50/55">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">{pretitle}</p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              {titlePrefix} <span className="text-pv-red-600">Prima Valuta</span>?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">{subtitle}</p>
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
