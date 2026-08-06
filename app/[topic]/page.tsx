// app/[topic]/page.tsx
// Every topic landing page, from one template.
//
// This is the scalability claim made concrete: religion, esotericism, symbols,
// sacred texts, traditions, figures, civilizations and astrology are not eight
// files — they are eight rows in lib/taxonomy.ts rendered by this one route. A
// ninth topic is a data edit.
//
// A server component with no client JavaScript at all.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KIND_LABEL, TOPIC_SLUGS, TOPICS, topicBySlug } from "@/lib/taxonomy";
import { PageShell } from "@/components/PageShell";
import { Icon } from "@/components/icons";

// Only the known topics resolve here. Without this, /anything renders a page
// shell for a topic that does not exist rather than a 404 — bad for a reader and
// worse for a crawler, which would index infinite empty URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.blurb,
    alternates: { canonical: `/${topic.slug}` },
    openGraph: {
      title: `${topic.title} · Maatan`,
      description: topic.blurb,
      type: "website",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) notFound();

  // The other topics, for the "continue" rail at the foot of the page. Reading
  // them from the taxonomy means the rail can never fall out of step with the nav.
  const siblings = TOPICS.filter((t) => t.slug !== topic.slug);

  return (
    <PageShell
      eyebrow="Explore the codex"
      title={topic.title}
      intro={topic.intro}
      icon={topic.icon}
      crumbs={[{ label: "Codex", href: "/library" }, { label: topic.title }]}
    >
      {/* ── what this topic collects ──
          Named up front because it is the promise the page is making, and because
          it is the vocabulary the entity pages beneath will use. */}
      <section className="border-b border-gold-500/10 bg-obsidian-800">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-3 px-5 py-6">
          <span className="text-[11px] tracking-[.22em] text-stone-500">WITHIN THIS TOPIC</span>
          {topic.kinds.map((kind) => (
            <span
              key={kind}
              className="rounded-sm border border-gold-500/30 px-3 py-1 text-[12px] text-gold-300"
            >
              {KIND_LABEL[kind].many}
            </span>
          ))}
        </div>
      </section>

      {/* ── the topic's divisions ──
          Structure first, entities later. These come from the codex outline, so
          the page is genuinely useful before a single row exists in the database
          — and when entities do arrive, these become their grouping headings
          rather than being replaced. */}
      <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1160px] space-y-14">
          {topic.sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-baseline gap-4">
                <h2 className="font-display shrink-0 text-[22px] tracking-[.1em] text-parchment-100">
                  {section.title}
                </h2>
                <span className="h-px flex-1 bg-gold-500/20" />
                <span className="shrink-0 text-[11px] tracking-[.18em] text-stone-600">
                  {section.items.length}
                </span>
              </div>

              <ul className="mt-6 grid gap-px bg-gold-500/10 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <li key={item}>
                    {/* Not yet links. Each of these becomes an entity page, and
                        until the entity exists a link would be a promise the
                        site cannot keep — so they read as a contents list. */}
                    <div className="flex items-center gap-3 bg-obsidian-600 px-5 py-4 transition hover:bg-obsidian-500">
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rotate-45 bg-gold-500/70" />
                      <span className="text-[14px] text-parchment-200">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── continue ── */}
      <section className="border-t border-gold-500/15 bg-obsidian-700 px-5 py-14">
        <div className="mx-auto max-w-[1160px]">
          <p className="text-center text-[10px] tracking-[.3em] text-gold-500">CONTINUE THROUGH THE CODEX</p>
          <div className="mt-8 grid gap-px bg-gold-500/15 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/${sibling.slug}`}
                className="group flex items-center gap-4 bg-obsidian-600 px-5 py-5 transition hover:bg-obsidian-500"
              >
                <Icon
                  name={sibling.icon}
                  className="h-8 w-8 shrink-0 text-gold-400 transition group-hover:text-gold-200"
                />
                <span className="min-w-0">
                  <span className="font-display block text-[16px] tracking-[.06em] text-parchment-100">
                    {sibling.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-stone-500">
                    {sibling.blurb}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
