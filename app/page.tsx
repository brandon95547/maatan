// app/page.tsx
// The homepage: the hero plate, the gateways into the codex, and the altar.
//
// A server component. The header and footer come from the layout; the only
// interactive piece on this page is the search field, which is its own island
// (components/CodexSearch.tsx). Everything else renders to markup and ships no
// JavaScript — which matters because this page carries eight inline SVGs.

import Link from "next/link";
import { HOME_TOPICS, QUICK_LINKS } from "@/lib/taxonomy";
import { Icon, WingedEye, Rule } from "@/components/icons";
import { CodexSearch } from "@/components/CodexSearch";
import { NecronomiconAltar } from "@/components/NecronomiconAltar";

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

      {/* ── the altar ──
          Replaces the old four-up band (featured text / quotation / daily
          insight / join). The Join call to action was the one thing in that row
          worth keeping, so it survives as the secondary button inside the new
          section rather than being dropped with the rest. */}
      <NecronomiconAltar />

    </main>
  );
}
