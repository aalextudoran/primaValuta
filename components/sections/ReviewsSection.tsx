const reviews = [
  {
    name: "Radu C.",
    quote:
      "Vin de ani de zile înainte de fiecare concediu. Știu că găsesc un curs corect și nu pierd timp — intru, schimb și plec în 3 minute. Nu am mai umblat la bancă de mult.",
  },
  {
    name: "Ioana M.",
    quote:
      "Program până la 22:30 înseamnă că pot ajunge și după serviciu. Altundeva dacă nu prindeai orele de birou rămâneai fără soluție. E singurul loc din Craiova unde nu te uiți la ceas.",
  },
  {
    name: "Bogdan T.",
    quote:
      "Am comparat cu două bănci — diferența la EUR a fost clară. Pe lângă asta, nu completez niciun formular pentru sume obișnuite. Simplu și fără bătăi de cap.",
  },
];

const reviewsEn = [
  {
    name: "James W.",
    quote:
      "I live in Craiova and come here every month. Rates are consistently better than the banks and there's no paperwork for normal amounts. Quick and no fuss.",
  },
  {
    name: "Sofia R.",
    quote:
      "Stopped in while visiting family — they were still open at 9pm, which saved me. Good GBP rate, no hidden charges, done in minutes. Didn't expect it to be that easy.",
  },
  {
    name: "Cătălin F.",
    quote:
      "Been going here for years before every trip abroad. The rate on the board is the rate you get — no surprises at the counter. That kind of straightforwardness is rare.",
  },
];

export function ReviewsSection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const data = lang === "ro" ? reviews : reviewsEn;
  const title = lang === "ro" ? "Ce spun clienții noștri" : "What our customers say";
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-pv-navy-800 md:text-3xl">{title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.map((review) => (
            <article key={review.name} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <p className="text-sm text-pv-yellow">★★★★★</p>
              <p className="mt-3 text-sm leading-relaxed text-pv-navy-800">{review.quote}</p>
              <p className="mt-4 text-sm font-semibold text-pv-navy-400">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
