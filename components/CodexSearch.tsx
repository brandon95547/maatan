"use client";

// components/CodexSearch.tsx
// The hero's search field.
//
// Its own island so the homepage around it can stay a server component. The
// field previously held state that nothing ever read and swallowed its own
// submit — it looked like a search box and was scenery. It now navigates to
// /search, which is the honest behaviour until the index behind it exists.

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CodexSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
      className="mx-auto mt-10 flex max-w-[640px] items-center gap-3 rounded-full border border-gold-500/45 bg-black/55 py-2 pl-6 pr-2 shadow-[0_0_60px_rgba(0,0,0,.6)] backdrop-blur-sm transition focus-within:border-gold-400"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 text-gold-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for knowledge, texts, symbols, and more..."
        aria-label="Search the codex"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-parchment-200 outline-none placeholder:text-stone-500"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 text-black transition hover:brightness-110"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
        </svg>
      </button>
    </form>
  );
}
