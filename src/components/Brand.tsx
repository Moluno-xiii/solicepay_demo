type SealProps = {
  size?: number;
  spin?: boolean;
  tone?: "gold" | "ink" | "protected";
  label?: string;
};

/**
 * The SolicePay wax seal — concentric rings with rotating text and a serif "S"
 * monogram. The recurring brand mark, used at every scale.
 */
export function BrandSeal({
  size = 96,
  spin = false,
  tone = "gold",
  label = "SOLICEPAY · TRUSTLINK · PROTECTED · SOLICEPAY · TRUSTLINK · PROTECTED · ",
}: SealProps) {
  const palette =
    tone === "gold"
      ? { ring: "#c8a552", text: "#8a6f2f", core: "#c8a552", mono: "#0e0f12" }
      : tone === "protected"
      ? { ring: "#1f5f4a", text: "#1f5f4a", core: "#1f5f4a", mono: "#fbf6e8" }
      : { ring: "#0e0f12", text: "#0e0f12", core: "#0e0f12", mono: "#fbf6e8" };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden
      className="select-none"
    >
      <defs>
        <path
          id="seal-circle"
          d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          fill="none"
        />
      </defs>
      <g className={spin ? "seal-spin" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <circle cx="100" cy="100" r="92" fill="none" stroke={palette.ring} strokeWidth="1" />
        <circle cx="100" cy="100" r="84" fill="none" stroke={palette.ring} strokeWidth="0.6" />
        <text
          fill={palette.text}
          style={{
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.32em",
            fontWeight: 600,
          }}
        >
          <textPath href="#seal-circle" startOffset="0">
            {label}
          </textPath>
        </text>
        <circle cx="100" cy="100" r="68" fill="none" stroke={palette.ring} strokeWidth="0.5" strokeDasharray="1.4 2.4" />
      </g>
      {/* Inner core */}
      <circle cx="100" cy="100" r="58" fill={palette.core} />
      <circle cx="100" cy="100" r="58" fill="none" stroke={palette.mono} strokeWidth="0.4" strokeOpacity="0.35" />
      {/* Serif S monogram */}
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fill={palette.mono}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: 78,
          fontVariationSettings: '"SOFT" 100, "opsz" 144',
        }}
      >
        S
      </text>
      {/* Tiny ornament dots */}
      <circle cx="100" cy="48" r="1.6" fill={palette.mono} />
      <circle cx="100" cy="152" r="1.6" fill={palette.mono} />
      <circle cx="48" cy="100" r="1.6" fill={palette.mono} />
      <circle cx="152" cy="100" r="1.6" fill={palette.mono} />
    </svg>
  );
}

/**
 * The SolicePay wordmark — Fraunces with custom letter-spacing and a small
 * ornament dot. Designed to read like a financial institution masthead.
 */
export function Wordmark({
  size = 48,
  withMark = true,
  tone = "ink",
}: {
  size?: number;
  withMark?: boolean;
  tone?: "ink" | "paper";
}) {
  const color = tone === "ink" ? "var(--color-ink)" : "var(--color-paper)";
  return (
    <div className="flex items-center gap-3" style={{ color }}>
      {withMark && <BrandSeal size={size * 0.95} tone="gold" />}
      <div className="flex flex-col leading-none">
        <span
          className="font-display-soft"
          style={{
            fontSize: size,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 500',
          }}
        >
          Solice<span style={{ fontStyle: "italic", color: "var(--color-seal-deep)" }}>P</span>ay
        </span>
        <span
          className="tiny-caps"
          style={{ marginTop: size * 0.18, color: "var(--color-ink-3)" }}
        >
          Trust Infrastructure · Est. 2026
        </span>
      </div>
    </div>
  );
}
