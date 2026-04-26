"use client";

import { useEffect, useRef, useState } from "react";

export function LazyMap({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[420px] w-full overflow-hidden rounded-xl">
      {loaded ? (
        <iframe
          title={title}
          src={src}
          className="h-full w-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-full w-full animate-pulse items-center justify-center rounded-xl bg-pv-navy-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-8 w-8 text-pv-navy-200"
          >
            <path d="M12 2 C8 2 5 5 5 8.5 C5 14 12 22 12 22 C12 22 19 14 19 8.5 C19 5 16 2 12 2 Z" strokeLinejoin="round" />
            <circle cx="12" cy="8.5" r="2.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
