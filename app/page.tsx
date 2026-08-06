// app/page.tsx
// The homepage: the hero plate, the gateways into the codex, and the featured band.
//
// A server component. The header and footer come from the layout; the only
// interactive piece on this page is the search field, which is its own island
// (components/CodexSearch.tsx). Everything else renders to markup and ships no
// JavaScript — which matters because this page carries eight inline SVGs.

import Link from "next/link";
import { HOME_TOPICS, QUICK_LINKS } from "@/lib/taxonomy";
import { Icon, IconEye, IconMetatron, WingedEye, Rule } from "@/components/icons";
import { CodexSearch } from "@/components/CodexSearch";

export default function Home() {
  return (
    <main>
      {/* ── hero ── */}
      <section className="codex-hero relative overflow-hidden pt-[74px]">
        {/* No ornament layer. The plate behind this section carries the statue,
            the columns, the Flower of Life and the square-and-compasses as
            artwork — drawing vector copies over it would double every symbol. */}
        <div className="relative mx-auto max-w-[1160px] px-5 pb-16 pt-16 text-center lg:pb-24 lg:pt-24">
          <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-medium leading-[0.95] tracking-[.14em] text-gold-300 drop-shadow-[0_0_60px_rgba(201,169,97,.25)]">
            MAATAN
          </h1>

          <div className="mx-auto mt-6 flex max-w-[620px] items-center gap-4">
            <Rule className="flex-1" />
            <WingedEye className="h-[52px] w-[220px] shrink-0 text-gold-400" />
            <Rule className="flex-1" />
          </div>

          <p className="font-display mx-auto mt-6 max-w-[620px] text-[clamp(1.05rem,2.2vw,1.45rem)] leading-relaxed text-parchment-100">
            A Codex of Eternal Truths, Timeless Wisdom,
            <br className="hidden sm:block" /> and the Mysteries of Existence.
          </p>

          <CodexSearch />

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="font-display text-[15px] text-stone-400">Explore:</span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm border border-gold-500/35 px-4 py-1.5 text-[12px] text-stone-300 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── the six gateways ──
          Read from the taxonomy rather than a local array, so a topic added in
          lib/taxonomy.ts appears here, in the nav, in the footer and at its own
          route without six separate edits. */}
      <section className="relative border-t border-gold-500/15 bg-obsidian-700">
        <div className="mx-auto grid max-w-[1560px] gap-px bg-gold-500/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {HOME_TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${topic.slug}`}
              className="group flex flex-col items-center bg-obsidian-600 px-6 py-9 text-center transition hover:bg-obsidian-500"
            >
              <Icon
                name={topic.icon}
                className="h-16 w-16 text-gold-400 transition group-hover:text-gold-200"
              />
              <h2 className="font-display mt-6 text-[19px] tracking-[.12em] text-parchment-100">
                {topic.title.toUpperCase()}
              </h2>
              <p className="mt-3 max-w-[240px] text-[13px] leading-relaxed text-stone-400">
                {topic.blurb}
              </p>
              {/* mt-auto, not a fixed margin: the blurbs run to three or four
                  lines, and the row only reads as a set if every "Explore" sits
                  on the same baseline regardless. */}
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] text-gold-400 transition group-hover:gap-3">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── featured band ── */}
      <section className="border-y border-gold-500/20 bg-obsidian-800">
        <div className="mx-auto grid max-w-[1560px] divide-y divide-gold-500/15 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <article className="flex items-start gap-5 px-8 py-9">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] tracking-[.28em] text-gold-500">FEATURED TEXT</p>
              <h3 className="font-display mt-3 text-[26px] leading-tight text-parchment-100">
                The Kybalion
              </h3>
              <p className="mt-1 text-[13px] text-stone-400">The Three Initiates</p>
              <Link
                href="/sacred-texts"
                className="mt-5 inline-flex items-center gap-2 text-[13px] text-gold-400 transition hover:gap-3"
              >
                Read Now <span aria-hidden="true">→</span>
              </Link>
            </div>
            {/* The volume itself, drawn rather than photographed. */}
            <div className="relative hidden h-[132px] w-[92px] shrink-0 rounded-[2px] border border-gold-500/45 bg-gradient-to-br from-[#1c1813] to-obsidian-800 shadow-[0_18px_40px_#000] sm:block">
              <div className="absolute inset-[7px] border border-gold-500/25" />
              <div className="absolute left-1/2 top-[26%] h-9 w-9 -translate-x-1/2">
                <IconEye className="h-full w-full text-gold-400/80" />
              </div>
              <p className="font-display absolute inset-x-2 bottom-4 text-center text-[8px] tracking-[.18em] text-gold-400/80">
                KYBALION
              </p>
            </div>
          </article>

          <article className="grid place-items-center px-8 py-9">
            <blockquote className="text-center">
              <p className="font-display text-[17px] italic leading-relaxed text-parchment-300">
                “The study of esotericism is the study of the self, the universe, and the divine.”
              </p>
              <footer className="mt-4 text-[12px] text-stone-500">— Manly P. Hall</footer>
            </blockquote>
          </article>

          <article className="flex items-start gap-5 px-8 py-9">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] tracking-[.28em] text-gold-500">DAILY INSIGHT</p>
              <h3 className="font-display mt-3 text-[24px] leading-tight text-parchment-100">
                As Above, So Below
              </h3>
              <p className="mt-2 text-[12px] text-gold-500">Hermetic Principle of Correspondence</p>
              <p className="mt-3 text-[13px] leading-relaxed text-stone-400">
                Reflect on the connections between microcosm and macrocosm.
              </p>
            </div>
            <IconMetatron className="hidden h-[104px] w-[104px] shrink-0 text-gold-400/70 sm:block" />
          </article>

          <article className="px-8 py-9">
            <p className="text-[10px] tracking-[.28em] text-gold-500">JOIN THE JOURNEY</p>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-300">
              Create an account to save your library, notes, and continue your path of discovery.
            </p>
            <Link
              href="/library"
              className="mt-6 block rounded-[3px] bg-gradient-to-b from-gold-300 to-gold-600 px-6 py-3 text-center text-[13px] tracking-[.12em] text-black transition hover:brightness-110"
            >
              Join Maatan
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
