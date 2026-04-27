const reviews = [
  {
    initials: "R.C.",
    name: "Radu C.",
    quote:
      "Vin de ani de zile înainte de fiecare concediu. Știu că găsesc un curs corect și nu pierd timp — intru, schimb și plec în 3 minute. Nu am mai umblat la bancă de mult.",
  },
  {
    initials: "I.M.",
    name: "Ioana M.",
    quote:
      "Program până la 22:30 înseamnă că pot ajunge și după serviciu. Altundeva dacă nu prindeai orele de birou rămâneai fără soluție. E singurul loc din Craiova unde nu te uiți la ceas.",
  },
  {
    initials: "B.T.",
    name: "Bogdan T.",
    quote:
      "Am comparat cu două bănci — diferența la EUR a fost clară. Pe lângă asta, nu completez niciun formular pentru sume obișnuite. Simplu și fără bătăi de cap.",
  },
];

const reviewsEn = [
  {
    initials: "J.W.",
    name: "James W.",
    quote:
      "I live in Craiova and come here every month. Rates are consistently better than the banks and there's no paperwork for normal amounts. Quick and no fuss.",
  },
  {
    initials: "S.R.",
    name: "Sofia R.",
    quote:
      "Stopped in while visiting family — they were still open at 9pm, which saved me. Good GBP rate, no hidden charges, done in minutes. Didn't expect it to be that easy.",
  },
  {
    initials: "C.F.",
    name: "Cătălin F.",
    quote:
      "Been going here for years before every trip abroad. The rate on the board is the rate you get — no surprises at the counter. That kind of straightforwardness is rare.",
  },
];

export function ReviewsSection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const data = lang === "ro" ? reviews : reviewsEn;
  const title = lang === "ro" ? "Ce spun clienții noștri" : "What our customers say";
  const verified = lang === "ro" ? "Client verificat" : "Verified client";

  return (
    <section style={{ backgroundColor: "#F8F9FA" }} className="py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="mb-8 text-2xl font-semibold text-pv-navy-800 md:text-3xl">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {data.map((review) => (
            <article
              key={review.name}
              className="rounded-xl bg-white p-6"
              style={{ border: "1px solid #eee" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#0D1B2A" }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-pv-navy-800">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{verified}</p>
                </div>
              </div>
              <p className="mb-3" style={{ color: "#F59E0B", fontSize: "18px", letterSpacing: "3px" }}>
                ★★★★★
              </p>
              <p className="text-[13px] leading-relaxed text-pv-navy-800">{review.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
