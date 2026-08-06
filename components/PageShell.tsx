// components/PageShell.tsx
// The frame every page below the homepage sits in.
//
// The header is fixed and translucent so the homepage hero can run underneath
// it; every other page has to make its own room, and doing that once here is
// what stops `pt-[74px]` from being copied onto fifty routes and forgotten on
// the fifty-first.

import Link from "next/link";
import { Icon, type IconName, Rule, WingedEye } from "@/components/icons";

export type Crumb = { label: string; href?: string };

export function PageShell({
  eyebrow,
  title,
  intro,
  icon,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  icon?: IconName;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <main className="pt-[74px]">
      <header className="relative overflow-hidden border-b border-gold-500/15 bg-obsidian-700">
        {/* A quieter echo of the hero plate's lighting, so an inner page belongs
            to the same room without competing with it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(201,169,97,.09),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1160px] px-5 py-14 text-center lg:py-20">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[11px] tracking-[.16em] text-stone-500">
              {crumbs.map((crumb, i) => (
                <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-gold-500/50">·</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-gold-400">
                      {crumb.label.toUpperCase()}
                    </Link>
                  ) : (
                    <span className="text-stone-400">{crumb.label.toUpperCase()}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {icon && <Icon name={icon} className="mx-auto h-14 w-14 text-gold-400" />}

          {eyebrow && (
            <p className="mt-6 text-[10px] tracking-[.32em] text-gold-500">{eyebrow.toUpperCase()}</p>
          )}

          <h1 className="font-display mt-3 text-[clamp(2.1rem,5.5vw,3.6rem)] leading-tight tracking-[.08em] text-gold-300">
            {title}
          </h1>

          <div className="mx-auto mt-5 flex max-w-[420px] items-center gap-3">
            <Rule className="flex-1" />
            <WingedEye className="h-[30px] w-[128px] shrink-0 text-gold-400/70" />
            <Rule className="flex-1" />
          </div>

          {intro && (
            <p className="font-display mx-auto mt-6 max-w-[640px] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-parchment-300">
              {intro}
            </p>
          )}
        </div>
      </header>

      {children}
    </main>
  );
}
