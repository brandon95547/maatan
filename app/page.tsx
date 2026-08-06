"use client";

import { useState } from "react";

// ── content ──────────────────────────────────────────────────────────────────
// Kept as data rather than markup so the page reads as a layout and the copy can
// be edited without touching structure. Category names follow the codex outline
// in MAATAN.md; the six shown here are the entry points from the homepage design.

const NAV = ["Library", "Traditions", "Symbols", "Learn", "Media", "Shop", "About"];

const QUICK_LINKS = ["Sacred Texts", "Esoteric Symbols", "Universal Laws", "Ancient Wisdom"];

const CATEGORIES = [
  {
    id: "religion",
    title: "Religion",
    text: "Explore the world's major religions, sacred texts, theology, and spiritual traditions.",
    Icon: IconBook,
  },
  {
    id: "esotericism",
    title: "Esotericism",
    text: "Dive into the hidden wisdom, occult sciences, mysticism, and universal laws.",
    Icon: IconEye,
  },
  {
    id: "symbols",
    title: "Symbols & Sigils",
    text: "Discover the meanings behind ancient symbols, sigils, and sacred geometry.",
    Icon: IconMetatron,
  },
  {
    id: "astrology",
    title: "Astrology",
    text: "Study the stars, planets, houses, and their influence on life and consciousness.",
    Icon: IconZodiac,
  },
  {
    id: "traditions",
    title: "Traditions",
    text: "Explore mystical orders, secret societies, and esoteric traditions through history.",
    Icon: IconCompass,
  },
  {
    id: "media",
    title: "Media & Books",
    text: "Watch, read, and listen to thousands of resources, eBooks, videos, and more.",
    Icon: IconGlobe,
  },
];

// ── ornament ─────────────────────────────────────────────────────────────────
// Every mark is inline SVG rather than an image file. The design is line art at
// heart — thin gold strokes on obsidian — and drawing it means it stays crisp at
// any size, inherits `currentColor`, and adds nothing to load.

/**
 * Round a computed coordinate to something both renderers agree on.
 *
 * Load-bearing, not tidiness. These marks are laid out with sin/cos, and React
 * serializes a full-precision float on the server (9.4833395016046) while the
 * browser recomputes it to more places (9.483339501604604). The strings differ,
 * so hydration reports a mismatch on every such attribute. Fixing the precision
 * makes both sides produce the same text.
 */
const at = (v: number) => Number(v.toFixed(3));

function IconBook({ className = "" }: { className?: string }) {
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

function IconEye({ className = "" }: { className?: string }) {
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

function IconMetatron({ className = "" }: { className?: string }) {
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

function IconZodiac({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="20" opacity=".55" />
      <circle cx="32" cy="32" r="8" opacity=".8" />
      {/* Twelve houses. */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="32"
          y1="6"
          x2="32"
          y2="12"
          transform={`rotate(${i * 30} 32 32)`}
          opacity=".8"
        />
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

function IconCompass({ className = "" }: { className?: string }) {
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

function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <circle cx="32" cy="32" r="24" />
      <ellipse cx="32" cy="32" rx="10" ry="24" opacity=".6" />
      <ellipse cx="32" cy="32" rx="19" ry="24" opacity=".35" />
      <path d="M8 32h48M12 20h40M12 44h40" opacity=".55" />
    </svg>
  );
}

/** The mark beside the wordmark: an all-seeing eye set in a circled triangle. */
function Emblem({ className = "" }: { className?: string }) {
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
function WingedEye({ className = "" }: { className?: string }) {
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

/**
 * The Flower of Life: nineteen circles on a hexagonal lattice, inside two rings.
 *
 * Drawn rather than approximated in CSS. An earlier version stacked repeating
 * radial-gradients and had to hand-place each ring — which produced a cluster
 * rather than the lattice, because the pattern's geometry is polar and
 * background-position is not. Here the construction IS the code: every centre
 * sits at a multiple of the radius around the origin.
 */
function FlowerOfLife({ className = "" }: { className?: string }) {
  const R = 24;
  const ring = (count: number, dist: number, offsetDeg: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((offsetDeg + i * (360 / count)) * Math.PI) / 180;
      return [at(100 + dist * Math.cos(a)), at(100 + dist * Math.sin(a))] as const;
    });

  const centres = [
    [100, 100] as const,
    ...ring(6, R, 0),
    ...ring(6, R * Math.sqrt(3), 30),
    ...ring(6, R * 2, 0),
  ];

  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className={className}>
      <circle cx="100" cy="100" r={at(R * 3)} strokeWidth="1.4" opacity=".75" />
      <circle cx="100" cy="100" r={at(R * 3 + 5)} strokeWidth="0.8" opacity=".4" />
      {centres.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={R} strokeWidth="0.9" opacity=".7" />
      ))}
    </svg>
  );
}

/** A rule that fades out from the centre — used either side of the wordmark rule. */
function Rule({ className = "" }: { className?: string }) {
  return <span className={`block h-px bg-gradient-to-r from-transparent via-[#b59655]/60 to-transparent ${className}`} />;
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#080706] text-[#e9e2d3] selection:bg-[#b59655] selection:text-black">
      {/* ── header ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#b59655]/20 bg-[#08070699] backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1560px] items-center justify-between gap-6 px-5 lg:px-9">
          <a href="#top" className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
            <Emblem className="h-9 w-9 shrink-0 text-[#c9a961] sm:h-10 sm:w-10" />
            <span className="min-w-0 leading-none">
              {/* Tracking is the thing that has to give on a narrow header: at .30em
                  the wordmark alone is wider than the icon cluster beside it, and the
                  menu button was being pushed off the right edge at 375px. */}
              <span className="font-display block truncate text-[19px] tracking-[.18em] text-[#d9bd7c] sm:text-[26px] sm:tracking-[.30em]">
                MAATAN
              </span>
              <span className="mt-1 hidden text-[8px] tracking-[.34em] text-[#b59655]/70 sm:block">
                ESOTERIC KNOWLEDGE CODEX
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 xl:flex">
            {NAV.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative py-2 text-[11px] tracking-[.22em] transition hover:text-[#d9bd7c] ${
                  i === 0 ? "text-[#d9bd7c]" : "text-stone-300"
                }`}
              >
                {item.toUpperCase()}
                {i === 0 && <span className="absolute inset-x-0 -bottom-px h-px bg-[#c9a961]" />}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              aria-label="Open the codex compass"
              className="hidden h-9 w-9 place-items-center rounded-full border border-[#b59655]/50 text-[#d9bd7c] transition hover:bg-[#b59655] hover:text-black sm:grid"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="12" cy="12" r="9" />
                <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
              </svg>
            </button>
            <button type="button" aria-label="Your account" className="text-stone-300 transition hover:text-[#d9bd7c]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="12" cy="8" r="3.6" />
                <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
              </svg>
            </button>
            <button type="button" aria-label="Your cart, 0 items" className="flex items-center gap-1.5 text-stone-300 transition hover:text-[#d9bd7c]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M8 9V7a4 4 0 0 1 8 0v2" />
                <path d="M5.5 9h13l-1 11h-11z" />
              </svg>
              <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#c9a961] px-1 text-[10px] font-semibold text-black">
                0
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center border border-[#b59655]/40 text-[#d9bd7c] xl:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col border-t border-[#b59655]/20 xl:hidden">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#b59655]/10 px-6 py-3.5 text-[11px] tracking-[.24em] text-stone-300"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── hero ── */}
      <section id="top" className="codex-hero relative overflow-hidden pt-[74px]">
        {/* Ornamental background. Standing in for the mockup's photographic
            temple plate — see the note in globals.css. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <FlowerOfLife className="flower-of-life absolute left-[6%] top-[24%] hidden h-[340px] w-[340px] text-[#b59655]/45 lg:block" />
          <div className="absolute right-[5%] top-[22%] hidden h-[360px] w-[360px] place-items-center lg:grid">
            <IconCompass className="h-full w-full text-[#b59655]/25" />
            <div className="absolute inset-0 rounded-full border border-[#b59655]/15" />
          </div>
          <div className="colonnade colonnade-left absolute inset-y-0 left-0 hidden w-[16%] xl:block" />
          <div className="colonnade colonnade-right absolute inset-y-0 right-0 hidden w-[16%] xl:block" />
        </div>

        <div className="relative mx-auto max-w-[1160px] px-5 pb-16 pt-16 text-center lg:pb-24 lg:pt-24">
          <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-medium leading-[0.95] tracking-[.14em] text-[#d9bd7c] drop-shadow-[0_0_60px_rgba(201,169,97,.25)]">
            MAATAN
          </h1>

          <div className="mx-auto mt-6 flex max-w-[620px] items-center gap-4">
            <Rule className="flex-1" />
            <WingedEye className="h-[52px] w-[220px] shrink-0 text-[#c9a961]" />
            <Rule className="flex-1" />
          </div>

          <p className="font-display mx-auto mt-6 max-w-[620px] text-[clamp(1.05rem,2.2vw,1.45rem)] leading-relaxed text-[#efe7d6]">
            A Codex of Eternal Truths, Timeless Wisdom,
            <br className="hidden sm:block" /> and the Mysteries of Existence.
          </p>

          {/* Search — the primary way into the codex, per the design brief. */}
          <form
            className="mx-auto mt-10 flex max-w-[640px] items-center gap-3 rounded-full border border-[#b59655]/45 bg-black/55 py-2 pl-6 pr-2 shadow-[0_0_60px_rgba(0,0,0,.6)] backdrop-blur-sm transition focus-within:border-[#c9a961]"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#b59655]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for knowledge, texts, symbols, and more..."
              aria-label="Search the codex"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-[#e9e2d3] outline-none placeholder:text-stone-500"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#d9bd7c] to-[#b08c42] text-black transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="12" r="9" />
                <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
              </svg>
            </button>
          </form>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="font-display text-[15px] text-stone-400">Explore:</span>
            {QUICK_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-sm border border-[#b59655]/35 px-4 py-1.5 text-[12px] text-stone-300 transition hover:border-[#c9a961] hover:bg-[#b59655]/10 hover:text-[#d9bd7c]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── the six gateways ── */}
      <section id="library" className="relative border-t border-[#b59655]/15 bg-[#0a0908]">
        <div className="mx-auto grid max-w-[1560px] gap-px bg-[#b59655]/15 px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map(({ id, title, text, Icon }) => (
            <a
              key={id}
              id={id}
              href={`#${id}`}
              className="group flex flex-col items-center bg-[#0c0b09] px-6 py-9 text-center transition hover:bg-[#12100c]"
            >
              <Icon className="h-16 w-16 text-[#c9a961] transition group-hover:text-[#e5cd92]" />
              <h2 className="font-display mt-6 text-[19px] tracking-[.12em] text-[#efe7d6]">
                {title.toUpperCase()}
              </h2>
              <p className="mt-3 max-w-[240px] text-[13px] leading-relaxed text-stone-400">{text}</p>
              {/* mt-auto, not a fixed margin: the descriptions run to three or four
                  lines, and the row only reads as a set if every "Explore" sits on
                  the same baseline regardless. */}
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] text-[#c9a961] transition group-hover:gap-3">
                Explore <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── featured band ── */}
      <section className="border-y border-[#b59655]/20 bg-[#080706]">
        <div className="mx-auto grid max-w-[1560px] divide-y divide-[#b59655]/15 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {/* Featured text */}
          <article id="media" className="flex items-start gap-5 px-8 py-9">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] tracking-[.28em] text-[#b59655]">FEATURED TEXT</p>
              <h3 className="font-display mt-3 text-[26px] leading-tight text-[#efe7d6]">The Kybalion</h3>
              <p className="mt-1 text-[13px] text-stone-400">The Three Initiates</p>
              <a href="#library" className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#c9a961] transition hover:gap-3">
                Read Now <span aria-hidden="true">→</span>
              </a>
            </div>
            {/* The volume itself, drawn rather than photographed. */}
            <div className="relative hidden h-[132px] w-[92px] shrink-0 rounded-[2px] border border-[#b59655]/45 bg-gradient-to-br from-[#1c1813] to-[#080706] shadow-[0_18px_40px_#000] sm:block">
              <div className="absolute inset-[7px] border border-[#b59655]/25" />
              <div className="absolute left-1/2 top-[26%] h-9 w-9 -translate-x-1/2">
                <IconEye className="h-full w-full text-[#c9a961]/80" />
              </div>
              <p className="font-display absolute inset-x-2 bottom-4 text-center text-[8px] tracking-[.18em] text-[#c9a961]/80">
                KYBALION
              </p>
            </div>
          </article>

          {/* Quotation */}
          <article className="grid place-items-center px-8 py-9">
            <blockquote className="text-center">
              <p className="font-display text-[17px] italic leading-relaxed text-[#d8cdb5]">
                “The study of esotericism is the study of the self, the universe, and the divine.”
              </p>
              <footer className="mt-4 text-[12px] text-stone-500">— Manly P. Hall</footer>
            </blockquote>
          </article>

          {/* Daily insight */}
          <article id="learn" className="flex items-start gap-5 px-8 py-9">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] tracking-[.28em] text-[#b59655]">DAILY INSIGHT</p>
              <h3 className="font-display mt-3 text-[24px] leading-tight text-[#efe7d6]">As Above, So Below</h3>
              <p className="mt-2 text-[12px] text-[#b59655]">Hermetic Principle of Correspondence</p>
              <p className="mt-3 text-[13px] leading-relaxed text-stone-400">
                Reflect on the connections between microcosm and macrocosm.
              </p>
            </div>
            <IconMetatron className="hidden h-[104px] w-[104px] shrink-0 text-[#c9a961]/70 sm:block" />
          </article>

          {/* Join */}
          <article id="about" className="px-8 py-9">
            <p className="text-[10px] tracking-[.28em] text-[#b59655]">JOIN THE JOURNEY</p>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-300">
              Create an account to save your library, notes, and continue your path of discovery.
            </p>
            <a
              href="#top"
              className="mt-6 block rounded-[3px] bg-gradient-to-b from-[#d9bd7c] to-[#b08c42] px-6 py-3 text-center text-[13px] tracking-[.12em] text-black transition hover:brightness-110"
            >
              Join Maatan
            </a>
          </article>
        </div>
      </section>

      {/* ── footer ── */}
      <footer id="shop" className="bg-[#060505] px-5 py-12 text-center lg:px-9">
        <div className="mx-auto max-w-[1560px]">
          <Emblem className="mx-auto h-9 w-9 text-[#b59655]/70" />
          <p className="font-display mt-4 text-[20px] tracking-[.26em] text-[#c9a961]">MAATAN</p>
          <p className="mt-2 text-[11px] tracking-[.2em] text-stone-500">THE HIDDEN CODEX</p>
          <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] tracking-[.18em] text-stone-500 transition hover:text-[#c9a961]"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>
          <p className="mt-8 text-[11px] text-stone-600">
            © {new Date().getFullYear()} Maatan. Preserving and connecting the world&apos;s esoteric knowledge.
          </p>
        </div>
      </footer>
    </main>
  );
}
