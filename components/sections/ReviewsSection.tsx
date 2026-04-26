const reviews = [
  {
    name: "Mihai D.",
    quote:
      "Curs excelent, fără comisioane ascunse. Am schimbat euro de câteva ori și de fiecare dată am găsit cel mai bun curs din Craiova.",
  },
  {
    name: "Elena P.",
    quote:
      "Personal amabil și operativ. Totul s-a rezolvat în câteva minute, fără bătăi de cap. Recomand cu încredere!",
  },
  {
    name: "Andrei S.",
    quote:
      "Locație convenabilă pe Calea București, program bun și curs corect. Îi prefer față de orice bancă.",
  },
];

const reviewsEn = [
  {
    name: "Michael D.",
    quote:
      "Excellent rates and no hidden fees. I exchanged euros multiple times and consistently found one of the best rates in Craiova.",
  },
  {
    name: "Elena P.",
    quote:
      "Friendly and efficient staff. Everything was handled in just a few minutes, with zero hassle. Highly recommended!",
  },
  {
    name: "Andrew S.",
    quote:
      "Convenient location on Calea Bucuresti, great schedule, and fair rates. I prefer them over any bank.",
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
