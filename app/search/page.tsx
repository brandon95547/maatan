import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS } from "@/lib/taxonomy";
import { PageShell } from "@/components/PageShell";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Maatan codex for texts, symbols, figures and traditions.",
  // Search result pages should not be indexed — they are infinite, thin, and
  // compete with the entity pages that are the real destinations.
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // No index yet. Rather than an empty results page, the query is matched against
  // the taxonomy so the box does something real from day one — and the honest
  // state of things is stated rather than disguised as "no results".
  const needle = query.toLowerCase();
  const matches = needle
    ? TOPICS.filter(
        (t) =>
          t.title.toLowerCase().includes(needle) ||
          t.blurb.toLowerCase().includes(needle) ||
          t.sections.some((s) => s.items.some((i) => i.toLowerCase().includes(needle)))
      )
    : [];

  return (
    <PageShell
      eyebrow="Search"
      title={query ? `“${query}”` : "Search the codex"}
      intro={
        query
          ? "Full-text search across every entity is still being built. In the meantime, here is where in the codex this belongs."
          : "Search across texts, symbols, figures, traditions and civilizations."
      }
      icon="metatron"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "Search" }]}
    >
      <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          {query && matches.length > 0 && (
            <>
              <p className="text-[10px] tracking-[.3em] text-gold-500">
                {matches.length} {matches.length === 1 ? "TOPIC" : "TOPICS"} MATCH
              </p>
              <div className="mt-6 grid gap-px bg-gold-500/10 sm:grid-cols-2">
                {matches.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/${topic.slug}`}
                    className="group flex items-center gap-4 bg-obsidian-600 px-6 py-5 transition hover:bg-obsidian-500"
                  >
                    <Icon
                      name={topic.icon}
                      className="h-9 w-9 shrink-0 text-gold-400 transition group-hover:text-gold-200"
                    />
                    <span className="min-w-0">
                      <span className="font-display block text-[18px] text-parchment-100">
                        {topic.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-stone-500">{topic.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {query && matches.length === 0 && (
            <p className="text-center text-[15px] text-stone-400">
              Nothing in the taxonomy matches that yet. Try the{" "}
              <Link href="/library" className="text-gold-400 underline-offset-4 hover:underline">
                Library
              </Link>{" "}
              to see everything the codex currently holds.
            </p>
          )}

          {!query && (
            <div className="grid gap-px bg-gold-500/10 sm:grid-cols-2 lg:grid-cols-4">
              {TOPICS.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${topic.slug}`}
                  className="group flex flex-col items-center bg-obsidian-600 px-5 py-7 text-center transition hover:bg-obsidian-500"
                >
                  <Icon
                    name={topic.icon}
                    className="h-10 w-10 text-gold-400 transition group-hover:text-gold-200"
                  />
                  <span className="font-display mt-4 text-[16px] text-parchment-100">
                    {topic.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
