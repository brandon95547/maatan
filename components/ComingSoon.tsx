// components/ComingSoon.tsx
// For a destination the navigation promises but the codex has not reached yet.
//
// Deliberately not a blank "coming soon". A dead end that explains what is coming
// and offers somewhere real to go is a page; one that apologises and stops is a
// broken link with better manners.

import Link from "next/link";
import { Rule } from "@/components/icons";

export function ComingSoon({
  what,
  detail,
  planned,
}: {
  what: string;
  detail: string;
  planned: string[];
}) {
  return (
    <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="text-[15px] leading-[1.85] text-parchment-300">{detail}</p>

        <div className="mx-auto my-10 max-w-[320px]">
          <Rule />
        </div>

        <p className="text-[10px] tracking-[.3em] text-gold-500">WHAT {what.toUpperCase()} WILL HOLD</p>
        <ul className="mt-6 grid gap-px bg-gold-500/10 text-left sm:grid-cols-2">
          {planned.map((item) => (
            <li key={item} className="flex items-center gap-3 bg-obsidian-600 px-5 py-3.5">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rotate-45 bg-gold-500/70" />
              <span className="text-[14px] text-parchment-200">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/library"
            className="rounded-[3px] bg-gradient-to-b from-gold-300 to-gold-600 px-6 py-3 text-[13px] tracking-[.12em] text-black transition hover:brightness-110"
          >
            Explore the Library
          </Link>
          <Link
            href="/symbols"
            className="rounded-[3px] border border-gold-500/40 px-6 py-3 text-[13px] tracking-[.12em] text-gold-300 transition hover:bg-gold-500/10"
          >
            Browse Symbols
          </Link>
        </div>
      </div>
    </section>
  );
}
