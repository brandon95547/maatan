"use client";

// components/SiteNav.tsx
// The desktop navigation, marking where you are.
//
// A client component for exactly one reason: a layout does not know which route
// is rendering beneath it, so the active item cannot be decided on the server
// without threading the current section through every page. `usePathname` reads
// it directly, and the cost is a few hundred bytes for a list of links.
//
// The match is prefix-based below the root so an entity page keeps its topic
// lit — /symbols/ouroboros should still show SYMBOLS as current.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/taxonomy";

export function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="hidden items-center gap-8 xl:flex">
      {items.map((item) => {
        const current = isCurrent(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`relative py-2 text-[11px] tracking-[.22em] transition hover:text-gold-300 ${
              current ? "text-gold-300" : "text-stone-300"
            }`}
          >
            {item.label.toUpperCase()}
            {current && <span className="absolute inset-x-0 -bottom-px h-px bg-gold-400" />}
          </Link>
        );
      })}
    </nav>
  );
}
