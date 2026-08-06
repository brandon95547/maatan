"use client";

// components/MobileMenu.tsx
// The only interactive part of the header, and therefore the only part that ships
// JavaScript.
//
// The header used to be inside a page that was `"use client"` in its entirety —
// five hundred lines of markup and eight inline SVGs sent to the browser so that
// one boolean could toggle. Everything else is now a server component and this
// island is what remains: a button, a piece of state, and the panel it opens.

import Link from "next/link";
import { useState } from "react";

export function MobileMenu({ items }: { items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        className="grid h-9 w-9 place-items-center border border-gold-500/40 text-gold-300 xl:hidden"
      >
        {open ? "×" : "☰"}
      </button>

      {open && (
        <nav
          id="site-mobile-nav"
          className="absolute inset-x-0 top-full flex flex-col border-t border-gold-500/20 bg-obsidian-800/95 backdrop-blur-xl xl:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-gold-500/10 px-6 py-3.5 text-[11px] tracking-[.24em] text-stone-300 transition hover:text-gold-300"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
