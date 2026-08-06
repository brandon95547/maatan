// components/SiteHeader.tsx
// The bar that sits over every page.
//
// A server component. The only client code in the header is MobileMenu, which is
// the one piece that needs state — see the note in that file for why this split
// matters. The account and cart buttons are inert affordances from the design
// and are marked as such rather than pretending to work.

import Link from "next/link";
import { NAV } from "@/lib/taxonomy";
import { Emblem } from "@/components/icons";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-500/20 bg-obsidian-800/60 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1560px] items-center justify-between gap-6 px-5 lg:px-9">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
          <Emblem className="h-9 w-9 shrink-0 text-gold-400 sm:h-10 sm:w-10" />
          <span className="min-w-0 leading-none">
            {/* Tracking is the thing that has to give on a narrow header: at .30em
                the wordmark alone is wider than the icon cluster beside it, and the
                menu button was being pushed off the right edge at 375px. */}
            <span className="font-display block truncate text-[19px] tracking-[.18em] text-gold-300 sm:text-[26px] sm:tracking-[.30em]">
              MAATAN
            </span>
            <span className="mt-1 hidden text-[8px] tracking-[.34em] text-gold-500/70 sm:block">
              ESOTERIC KNOWLEDGE CODEX
            </span>
          </span>
        </Link>

        <SiteNav items={NAV} />

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <Link
            href="/library"
            aria-label="Browse the whole codex"
            className="hidden h-9 w-9 place-items-center rounded-full border border-gold-500/50 text-gold-300 transition hover:bg-gold-500 hover:text-black sm:grid"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="12" cy="12" r="9" />
              <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
            </svg>
          </Link>
          {/* Inert for now — the design calls for them, the backend does not exist.
              Disabled rather than linked so nothing promises a destination. */}
          <button
            type="button"
            disabled
            aria-label="Your account (not yet available)"
            className="text-stone-400 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="12" cy="8" r="3.6" />
              <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
            </svg>
          </button>
          <button
            type="button"
            disabled
            aria-label="Your cart, 0 items (not yet available)"
            className="flex items-center gap-1.5 text-stone-400 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M8 9V7a4 4 0 0 1 8 0v2" />
              <path d="M5.5 9h13l-1 11h-11z" />
            </svg>
            <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-semibold text-black">
              0
            </span>
          </button>
          <MobileMenu items={NAV} />
        </div>
      </div>
    </header>
  );
}
