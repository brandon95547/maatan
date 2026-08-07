"use client";

// components/EntityLink.tsx
// A link to an entity that shows you what is behind it before you commit.
//
// The pattern is Wikipedia's and Obsidian Publish's, and it is the single
// highest-value interaction for a site built on connections: following a link
// costs a page load and a loss of place, so a reader rations it. A preview
// makes the connection legible without spending anything, which is what turns a
// list of related entities from a menu into a map.
//
// The summary is already loaded — it came back with the relationship query — so
// there is no fetch here and no loading state. That is the whole reason
// `summary` is a required column rather than an excerpt of `body`.

import Link from "next/link";
import { useRef, useState } from "react";

export function EntityLink({
  href,
  title,
  summary,
  kind,
}: {
  href: string;
  title: string;
  summary: string;
  kind?: string;
}) {
  const [open, setOpen] = useState(false);
  // A small delay in both directions. Without the open delay, dragging the
  // pointer across a list flashes a popover per item; without the close delay,
  // the gap between the link and the card dismisses it before you arrive.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = (next: boolean, delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(next), delay);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => schedule(true, 320)}
      onMouseLeave={() => schedule(false, 160)}
    >
      <Link
        href={href}
        // Focus opens it too, so the preview is not mouse-only.
        onFocus={() => schedule(true, 0)}
        onBlur={() => schedule(false, 0)}
        className="text-[14px] text-parchment-100 underline decoration-gold-500/40 decoration-1 underline-offset-4 transition hover:text-gold-300 hover:decoration-gold-400"
      >
        {title}
      </Link>

      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-0 z-40 mb-2 block w-[300px] max-w-[80vw] rounded-sm border border-gold-500/35 bg-obsidian-900/97 p-4 shadow-[0_18px_50px_rgba(0,0,0,.75)] backdrop-blur-sm"
        >
          {kind && (
            <span className="block text-[9px] tracking-[.28em] text-gold-500">
              {kind.toUpperCase()}
            </span>
          )}
          <span className="font-display mt-1.5 block text-[17px] leading-tight text-gold-300">
            {title}
          </span>
          <span className="mt-2 block text-[12.5px] leading-relaxed text-stone-400">{summary}</span>
        </span>
      )}
    </span>
  );
}
