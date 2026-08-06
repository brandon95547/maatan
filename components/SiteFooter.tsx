// components/SiteFooter.tsx
// The close of every page. A server component — nothing here is interactive.

import Link from "next/link";
import { NAV, TOPICS } from "@/lib/taxonomy";
import { Emblem } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold-500/15 bg-obsidian-900 px-5 py-12 text-center lg:px-9">
      <div className="mx-auto max-w-[1560px]">
        <Emblem className="mx-auto h-9 w-9 text-gold-500/70" />
        <p className="font-display mt-4 text-[20px] tracking-[.26em] text-gold-400">MAATAN</p>
        <p className="mt-2 text-[11px] tracking-[.2em] text-stone-500">THE HIDDEN CODEX</p>

        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] tracking-[.18em] text-stone-500 transition hover:text-gold-400"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Every topic, always reachable from the bottom of every page. This is
            the site's internal-linking backbone as much as it is navigation:
            entity pages are discovered through their topic, and topics need a
            link from everywhere for that to hold. */}
        <nav className="mx-auto mt-8 flex max-w-[900px] flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-gold-500/10 pt-7">
          {TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${topic.slug}`}
              className="text-[11px] text-stone-600 transition hover:text-gold-400"
            >
              {topic.title}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-[11px] text-stone-600">
          © {new Date().getFullYear()} Maatan. Preserving and connecting the world&apos;s esoteric knowledge.
        </p>
      </div>
    </footer>
  );
}
