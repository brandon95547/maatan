// app/library/page.tsx
// The whole codex at one level — every topic, with what it contains.
//
// The counterpart to search: search is for when you know what you want, this is
// for when you do not. Also the site's internal-linking hub, which is why it is
// what the header's compass and the "Join" button both point at.

import type { Metadata } from "next";
import Link from "next/link";
import { KIND_LABEL, TOPICS } from "@/lib/taxonomy";
import { PageShell } from "@/components/PageShell";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Library",
  description:
    "Every topic in the Maatan codex — religion, esotericism, symbols, sacred texts, traditions, historical figures, ancient civilizations and astrology.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
  const entries = TOPICS.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.items.length, 0), 0);

  return (
    <PageShell
      eyebrow="The Library"
      title="Every path through the codex"
      intro="Eight ways in. Each topic gathers its own texts, symbols, figures and traditions — and each of them connects outward to the others, because none of this was ever separate."
      icon="book"
      crumbs={[{ label: "Codex" }]}
    >
      <section className="border-b border-gold-500/10 bg-obsidian-800">
        <div className="mx-auto flex max-w-[1160px] items-center justify-center gap-8 px-5 py-6 text-center">
          <span className="text-[12px] text-stone-500">
            <span className="font-display text-[20px] text-gold-300">{TOPICS.length}</span> topics
          </span>
          <span aria-hidden="true" className="h-4 w-px bg-gold-500/25" />
          <span className="text-[12px] text-stone-500">
            <span className="font-display text-[20px] text-gold-300">{entries}</span> entries mapped
          </span>
        </div>
      </section>

      <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1160px] space-y-px bg-gold-500/10">
          {TOPICS.map((topic) => (
            <article key={topic.slug} className="bg-obsidian-600 p-7 lg:p-9">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <Link
                  href={`/${topic.slug}`}
                  className="group flex shrink-0 items-center gap-4 lg:w-[290px]"
                >
                  <Icon
                    name={topic.icon}
                    className="h-12 w-12 shrink-0 text-gold-400 transition group-hover:text-gold-200"
                  />
                  <span>
                    <span className="font-display block text-[22px] tracking-[.08em] text-parchment-100 transition group-hover:text-gold-300">
                      {topic.title}
                    </span>
                    <span className="mt-1 block text-[11px] tracking-[.16em] text-gold-500">
                      {topic.kinds.map((k) => KIND_LABEL[k].many).join(" · ").toUpperCase()}
                    </span>
                  </span>
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-relaxed text-stone-400">{topic.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topic.sections.flatMap((s) => s.items).slice(0, 8).map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-gold-500/20 px-2.5 py-1 text-[11px] text-stone-400"
                      >
                        {item}
                      </span>
                    ))}
                    {/* An honest count of what is not shown, rather than a
                        trailing ellipsis that hides how much is behind it. */}
                    {topic.sections.flatMap((s) => s.items).length > 8 && (
                      <Link
                        href={`/${topic.slug}`}
                        className="rounded-sm border border-gold-500/40 px-2.5 py-1 text-[11px] text-gold-300 transition hover:bg-gold-500/10"
                      >
                        +{topic.sections.flatMap((s) => s.items).length - 8} more
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
