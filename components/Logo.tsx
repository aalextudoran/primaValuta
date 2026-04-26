interface LogoProps {
  variant?: "navbar" | "hero" | "footer";
  theme?: "dark" | "light";
}

const FONT = '"Arial Black", Impact, "Franklin Gothic Heavy", sans-serif';

export function Logo({ variant = "navbar" }: LogoProps) {
  if (variant === "hero") {
    return (
      <svg
        width="480"
        height="76"
        viewBox="0 0 480 76"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Prima Valuta - Schimb valutar Craiova"
      >
        <text
          x="0"
          y="52"
          fontFamily={FONT}
          fontSize="52"
          fontWeight="900"
          letterSpacing="-1"
          fill="#0a2d6e"
        >
          PRIMA
        </text>
        <text
          x="170"
          y="52"
          fontFamily={FONT}
          fontSize="52"
          fontWeight="900"
          letterSpacing="-1"
          fill="#C8121E"
        >
          VALUTA
        </text>
        <text x="2" y="70" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" letterSpacing="2.5" fill="#2a5a8a">
          SCHIMB VALUTAR
        </text>
        <text x="184" y="70" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2.5" fill="#2a5a8a">
          CRAIOVA
        </text>
      </svg>
    );
  }

  // navbar + footer — HTML so the two words are always flush regardless of font fallback
  return (
    <span
      aria-label="Prima Valuta"
      style={{
        display: "flex",
        alignItems: "baseline",
        fontFamily: FONT,
        fontSize: 24,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-0.5px",
      }}
    >
      <span style={{ color: "#0a2d6e" }}>PRIMA</span>
      <span style={{ color: "#C8121E" }}>VALUTA</span>
    </span>
  );
}
