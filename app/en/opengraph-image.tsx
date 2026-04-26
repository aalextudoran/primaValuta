import { ImageResponse } from "next/og";

export const alt = "Prima Valuta — Currency Exchange Craiova";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#0d1f3c",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Dollar sign */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "240px",
            flexShrink: 0,
            marginRight: "64px",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              backgroundColor: "#c8121e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 130, color: "white", fontWeight: 900, lineHeight: 1 }}>
              $
            </span>
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 13,
              letterSpacing: "0.18em",
              color: "#8aafd4",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
            }}
          >
            CURRENCY EXCHANGE · CRAIOVA · BNR AUTHORIZED
          </p>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              marginBottom: 14,
              lineHeight: 1.05,
            }}
          >
            Prima Valuta
          </h1>
          <p style={{ fontSize: 28, color: "#8aafd4", margin: 0, marginBottom: 40 }}>
            EUR · USD · GBP · CHF · No hidden fees
          </p>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                backgroundColor: "rgba(200,18,30,0.2)",
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <span style={{ fontSize: 16, color: "#f8a0a8" }}>BNR Authorized</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>Since 2013</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>No hidden fees</span>
            </div>
          </div>

          <p style={{ fontSize: 16, color: "#4b6280", margin: 0, marginTop: 28 }}>
            primavaluta.ro
          </p>
        </div>
      </div>
    ),
    size,
  );
}
