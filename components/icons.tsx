// components/icons.tsx
// The codex's marks, drawn rather than imported.
//
// Every one is inline SVG on purpose. The design is line art — thin gold strokes
// on obsidian — so drawing it keeps it crisp at any size, lets it inherit
// `currentColor` (which is what makes hover states work), and costs no request.
//
// These are server components: no state, no effects. They render to markup on the
// worker and ship no JavaScript.

/**
 * Round a computed coordinate to something both renderers agree on.
 *
 * Load-bearing, not tidiness. Several marks below are laid out with sin/cos, and
 * React serializes a full-precision float on the server (9.4833395016046) while
 * the browser recomputes it to more places (9.483339501604604). The strings
 * differ, so hydration reports a mismatch on every such attribute. Fixing the
 * precision makes both sides produce the same text.
 *
 * Any new generated-geometry mark must round the same way.
 */
export const at = (v: number) => Number(v.toFixed(3));

export type IconProps = { className?: string };

/** A named mark, so taxonomy data can reference an icon without importing JSX. */
export type IconName =
  | "book"
  | "eye"
  | "metatron"
  | "zodiac"
  | "compass"
  | "globe"
  | "scroll"
  | "column";

export function IconBook({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M32 20v30M32 20c-5-4-13-6-22-6v30c9 0 17 2 22 6M32 20c5-4 13-6 22-6v30c-9 0-17 2-22 6" />
      <path d="M4 14v30M60 14v30" opacity=".5" />
      {/* Rays above the book — the "illuminated" of illuminated manuscript. */}
      {[-30, -15, 0, 15, 30].map((a) => (
        <path key={a} d="M32 12V4" transform={`rotate(${a} 32 14)`} opacity=".7" />
      ))}
    </svg>
  );
}

export function IconEye({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M32 14 54 52H10z" />
      <path d="M32 22 46 46H18z" opacity=".45" />
      <path d="M23 38c3-4 6-6 9-6s6 2 9 6c-3 4-6 6-9 6s-6-2-9-6z" />
      <circle cx="32" cy="38" r="3" fill="currentColor" stroke="none" />
      {[-40, -20, 0, 20, 40].map((a) => (
        <path key={a} d="M32 10V2" transform={`rotate(${a} 32 12)`} opacity=".6" />
      ))}
    </svg>
  );
}

export function IconMetatron({ className = "" }: IconProps) {
  // Thirteen circles on a hexagonal lattice, joined — the classical construction.
  const r = 13;
  const nodes = [
    [32, 32],
    ...[0, 60, 120, 180, 240, 300].map((deg) => {
      const a = (deg * Math.PI) / 180;
      return [at(32 + r * Math.cos(a)), at(32 + r * Math.sin(a))];
    }),
    ...[0, 60, 120, 180, 240, 300].map((deg) => {
      const a = (deg * Math.PI) / 180;
      return [at(32 + 2 * r * Math.cos(a)), at(32 + 2 * r * Math.sin(a))];
    }),
  ] as [number, number][];

  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.7" className={className}>
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} opacity=".28" />
        ))
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.2" />
      ))}
    </svg>
  );
}

export function IconZodiac({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="20" opacity=".55" />
      <circle cx="32" cy="32" r="8" opacity=".8" />
      {/* Twelve houses. */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="32" y1="6" x2="32" y2="12" transform={`rotate(${i * 30} 32 32)`} opacity=".8" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`sp-${i}`}
          x1="32"
          y1="12"
          x2="32"
          y2="24"
          transform={`rotate(${i * 30 + 15} 32 32)`}
          opacity=".3"
        />
      ))}
      <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCompass({ className = "" }: IconProps) {
  // Square and compasses, with the eye where the letter G usually sits.
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M32 10 12 46M32 10l20 36" />
      <circle cx="32" cy="10" r="2.5" />
      <path d="M14 30 32 52l18-22" opacity=".85" />
      <path d="M22 30c3-3.5 6-5 10-5s7 1.5 10 5c-3 3.5-6 5-10 5s-7-1.5-10-5z" opacity=".9" />
      <circle cx="32" cy="30" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGlobe({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <circle cx="32" cy="32" r="24" />
      <ellipse cx="32" cy="32" rx="10" ry="24" opacity=".6" />
      <ellipse cx="32" cy="32" rx="19" ry="24" opacity=".35" />
      <path d="M8 32h48M12 20h40M12 44h40" opacity=".55" />
    </svg>
  );
}

/** An unrolled scroll — sacred texts and manuscripts. */
export function IconScroll({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M18 12h34v34a8 8 0 0 1-8 8H16" />
      <path d="M18 12a6 6 0 0 0-6 6v4h6" />
      <path d="M16 54a8 8 0 0 0 8-8V22" opacity=".8" />
      <path d="M28 24h16M28 32h16M28 40h10" opacity=".55" />
    </svg>
  );
}

/** A fluted column with its capital — civilizations and their architecture. */
export function IconColumn({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M14 12h36M17 18h30M20 54h24M14 58h36" />
      <path d="M17 18v36M47 18v36" />
      <path d="M26 20v32M32 20v32M38 20v32" opacity=".45" />
    </svg>
  );
}

const ICONS: Record<IconName, (p: IconProps) => React.JSX.Element> = {
  book: IconBook,
  eye: IconEye,
  metatron: IconMetatron,
  zodiac: IconZodiac,
  compass: IconCompass,
  globe: IconGlobe,
  scroll: IconScroll,
  column: IconColumn,
};

/**
 * Render a mark by name.
 *
 * The indirection is what lets the taxonomy (lib/taxonomy.ts) be plain data —
 * a topic names its icon as a string, so the taxonomy stays a serializable
 * module that a route, a nav and a seed script can all read without pulling JSX
 * into any of them.
 */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const Mark = ICONS[name] ?? IconEye;
  return <Mark className={className} />;
}

/** The mark beside the wordmark: an all-seeing eye set in a circled triangle. */
export function Emblem({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1" className={className}>
      <circle cx="32" cy="32" r="30" opacity=".55" />
      <circle cx="32" cy="32" r="26" opacity=".3" />
      <path d="M32 13 51 45H13z" />
      <path d="M21 33c3.5-4.5 7-7 11-7s7.5 2.5 11 7c-3.5 4.5-7 7-11 7s-7.5-2.5-11-7z" />
      <circle cx="32" cy="33" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The winged sun disk under the wordmark — the hero's dividing ornament. */
export function WingedEye({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 240 54" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      {[0, 1].map((side) => {
        const flip = side === 0 ? "" : "scale(-1 1) translate(-240 0)";
        return (
          <g key={side} transform={flip}>
            {/* Four feather courses, each shorter and lower than the one above. */}
            {[0, 1, 2, 3].map((row) => (
              <path
                key={row}
                d={`M104 ${21 + row * 5}C86 ${19 + row * 5} 62 ${22 + row * 6} ${44 - row * 8} ${27 + row * 5}`}
                opacity={0.85 - row * 0.16}
              />
            ))}
            <path d="M104 21c-10-4-22-6-34-5" opacity=".5" />
          </g>
        );
      })}
      {/* The disk and its eye, centred between the wings. */}
      <circle cx="120" cy="27" r="13" />
      <path d="M110 27c3-3.6 6.2-5.6 10-5.6s7 2 10 5.6c-3 3.6-6.2 5.6-10 5.6s-7-2-10-5.6z" />
      <circle cx="120" cy="27" r="2.8" fill="currentColor" stroke="none" />
      <path d="M113 44l7 8 7-8" opacity=".6" />
    </svg>
  );
}

/** A rule that fades out from the centre — used either side of an ornament. */
export function Rule({ className = "" }: IconProps) {
  return (
    <span
      className={`block h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent ${className}`}
    />
  );
}
