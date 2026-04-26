const ShieldCheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
    <path d="M8 1.5 L13.5 3.5 V8 C13.5 11.5 8 14.5 8 14.5 C8 14.5 2.5 11.5 2.5 8 V3.5 Z" strokeLinejoin="round" />
    <path d="M5.5 8 L7 9.5 L10.5 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
    <rect x="1.5" y="3" width="13" height="11.5" rx="1.5" />
    <path d="M1.5 6.5 H14.5" strokeLinecap="round" />
    <path d="M5 1.5 V4.5" strokeLinecap="round" />
    <path d="M11 1.5 V4.5" strokeLinecap="round" />
    <circle cx="5.5" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="8" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
    <path
      d="M2 2 H7.5 L13.5 8 L8 13.5 L2 7.5 Z"
      strokeLinejoin="round"
    />
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
    <path d="M9 5 L12.5 5" strokeLinecap="round" />
    <path d="M7 11 L7 12" strokeLinecap="round" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
    <path d="M8 1.5 C5.5 1.5 3.5 3.5 3.5 6 C3.5 9.5 8 14.5 8 14.5 C8 14.5 12.5 9.5 12.5 6 C12.5 3.5 10.5 1.5 8 1.5 Z" strokeLinejoin="round" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);

const copy = {
  ro: ["Autorizat BNR", "Din 2013", "Fără comisioane ascunse", "Craiova · Zilnic 08:00–22:30"],
  en: ["BNR authorized", "Since 2013", "No hidden fees", "Craiova · Daily 08:00–22:30"],
} as const;

export function TrustBarSection({ lang = "ro" }: { lang?: "ro" | "en" }) {
  const text = copy[lang];
  const trustItems = [
    { icon: <ShieldCheckIcon />, text: text[0] },
    { icon: <CalendarIcon />, text: text[1] },
    { icon: <TagIcon />, text: text[2] },
    { icon: <MapPinIcon />, text: text[3] },
  ];

  return (
    <section className="border-y border-line bg-pv-navy-50">
      <div className="mx-auto grid w-full max-w-6xl gap-3 px-6 py-4 md:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-pv-navy-800">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pv-red-600 text-white">
              {item.icon}
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
