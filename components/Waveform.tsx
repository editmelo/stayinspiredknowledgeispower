/**
 * The signature element.
 *
 * "Music is my therapy" is Miriam's flagship design, and a waveform already
 * runs through that artwork. So the page uses one as its spine: it underlines
 * the headline, and it separates every section, with an amplitude that matches
 * what the section is saying. The `silence` variant drops to nothing in the
 * middle and comes back louder — that one is reserved for the memorial.
 *
 * Amplitudes are generated from a fixed seed so the server and client render
 * identical markup.
 */

type Variant = "loud" | "calm" | "silence" | "hair";

const SEEDS: Record<Variant, number> = {
  loud: 7,
  calm: 23,
  silence: 41,
  hair: 88,
};

function amplitudes(variant: Variant, count: number): number[] {
  let s = SEEDS[variant];
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };

  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const noise = rand();

    if (variant === "silence") {
      // Full voice, a held silence through the middle, then louder than before.
      const before = Math.max(0, 1 - Math.abs(t - 0.16) * 3.4);
      const after = Math.max(0, 1 - Math.abs(t - 0.86) * 2.6);
      const envelope = Math.max(before, after * 1.15);
      return Math.max(0.02, envelope * (0.4 + noise * 0.6));
    }

    if (variant === "hair") {
      return 0.1 + noise * 0.18;
    }

    if (variant === "calm") {
      // A steady pulse that swells gently toward the centre.
      const envelope = 0.35 + Math.sin(t * Math.PI) * 0.45;
      return Math.max(0.06, envelope * (0.45 + noise * 0.55));
    }

    // loud — a rock EQ, with a couple of genuine peaks.
    const envelope = 0.55 + Math.sin(t * Math.PI * 1.1) * 0.45;
    const peak = noise > 0.9 ? 1.35 : 1;
    return Math.min(1, Math.max(0.08, envelope * (0.3 + noise * 0.75) * peak));
  });
}

export default function Waveform({
  variant = "loud",
  count = 96,
  height = 44,
  className = "",
  color = "var(--color-rose)",
  animate = true,
  label,
}: {
  variant?: Variant;
  count?: number;
  height?: number;
  className?: string;
  color?: string;
  animate?: boolean;
  label?: string;
}) {
  const amps = amplitudes(variant, count);
  const barW = 2;
  const gap = 4;
  const width = count * (barW + gap) - gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
      className={`${animate ? "wf-anim" : ""} ${className}`}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {amps.map((a, i) => {
        const h = Math.max(1, a * height);
        return (
          <rect
            key={i}
            className="wf-bar"
            x={i * (barW + gap)}
            y={(height - h) / 2}
            width={barW}
            height={h}
            fill={color}
            style={{ animationDelay: `${i * 9}ms` }}
          />
        );
      })}
    </svg>
  );
}

/** Full-bleed divider between sections. */
export function WaveDivider({
  variant = "hair",
  color = "var(--color-rose)",
  height = 26,
  className = "",
}: {
  variant?: Variant;
  color?: string;
  height?: number;
  className?: string;
}) {
  return (
    <div className={`shell ${className}`} aria-hidden="true">
      <Waveform variant={variant} count={140} height={height} color={color} />
    </div>
  );
}
