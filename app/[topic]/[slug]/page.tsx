// app/[topic]/[slug]/page.tsx
// One template for every entity in the codex.
//
// A symbol, a text, a figure, a tradition and a civilization all render through
// this file, because they are all rows in one table. That is the payoff of the
// data model: writing a new kind of thing means writing content, not a route.
//
// The connections panel is the part that matters. It reads relationships from
// both directions and labels each from THIS entity's side — the same stored row
// that makes Hermes Trismegistus "wrote the Corpus Hermeticum" makes the Corpus
// "written by Hermes Trismegistus" here, with nothing duplicated.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { entityBySlug, entitiesForTopic, relatedTo } from "@/lib/codex";
import { KIND_LABEL, topicBySlug, type EntityKind } from "@/lib/taxonomy";
import { relationGroup, relationLabel } from "@/lib/relations";
import { entityDate, renderMarkdown } from "@/lib/format";
import { Icon, Rule } from "@/components/icons";
import { EntityLink } from "@/components/EntityLink";

// Entities live in D1, which is empty at build time and populated by the seed
// route afterwards — so the set of slugs cannot be enumerated during the build.
// Pages are rendered on demand instead, which is also what lets new content
// appear without a redeploy.
export const dynamicParams = true;

type Params = { topic: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic, slug } = await params;
  const entity = await entityBySlug(slug);
  if (!entity) return {};

  const date = entityDate(entity);
  return {
    title: entity.title,
    description: entity.summary,
    alternates: { canonical: `/${topic}/${slug}` },
    openGraph: {
      title: `${entity.title} · Maatan`,
      description: entity.summary,
      type: "article",
    },
    other: date ? { "article:published_time": date } : undefined,
  };
}

export default async function EntityPage({ params }: { params: Promise<Params> }) {
  const { topic: topicSlug, slug } = await params;
  const topic = topicBySlug(topicSlug);
  if (!topic) notFound();

  const entity = await entityBySlug(slug);
  // A missing entity is a genuine 404 rather than an empty shell: the codex is
  // seeded after deploy, and a soft "nothing here yet" page would be indexed.
  if (!entity || entity.topic !== topicSlug) notFound();

  const [related, siblings] = await Promise.all([
    relatedTo(entity.id),
    entitiesForTopic(topicSlug, { limit: 12 }),
  ]);

  const date = entityDate(entity);
  const blocks = renderMarkdown(entity.body);
  const meta = (entity.meta ?? {}) as Record<string, unknown>;

  // Grouped by how the relation reads from here, so "Works" and "Described in"
  // are separate sections rather than one undifferentiated list of links.
  const groups = new Map<string, typeof related>();
  for (const r of related) {
    const heading = relationGroup(r.type, r.direction);
    groups.set(heading, [...(groups.get(heading) ?? []), r]);
  }

  // schema.org with a stable @id. This is what puts an entity into Google's
  // Knowledge Graph and what an LLM cites — and the relationships are emitted
  // as structured data from the same rows that drew the panel, so the machine
  // view and the human view cannot drift apart.
  const site = "https://maatan.com";
  const id = `${site}/${topicSlug}/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaTypeFor(entity.kind as EntityKind),
    "@id": id,
    name: entity.title,
    description: entity.summary,
    url: id,
    ...(date ? { temporalCoverage: date } : {}),
    ...(related.length
      ? {
          subjectOf: related.slice(0, 20).map((r) => ({
            "@type": "CreativeWork",
            "@id": `${site}/${r.entity.topic}/${r.entity.slug}`,
            name: r.entity.title,
          })),
        }
      : {}),
    isPartOf: { "@type": "Collection", "@id": `${site}/${topicSlug}`, name: topic.title },
  };

  return (
    <main className="pt-[74px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── heading ── */}
      <header className="relative overflow-hidden border-b border-gold-500/15 bg-obsidian-700">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(201,169,97,.09),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1160px] px-5 py-14 text-center lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[11px] tracking-[.16em] text-stone-500">
            <Link href="/library" className="transition hover:text-gold-400">CODEX</Link>
            <span aria-hidden="true" className="text-gold-500/50">·</span>
            <Link href={`/${topic.slug}`} className="transition hover:text-gold-400">
              {topic.title.toUpperCase()}
            </Link>
          </nav>

          <p className="text-[10px] tracking-[.32em] text-gold-500">
            {KIND_LABEL[entity.kind as EntityKind]?.one.toUpperCase() ?? entity.kind.toUpperCase()}
          </p>

          <h1 className="font-display mt-3 text-[clamp(2.1rem,5.5vw,3.6rem)] leading-tight tracking-[.06em] text-gold-300">
            {entity.title}
          </h1>

          {date && <p className="mt-4 text-[13px] tracking-[.14em] text-stone-400">{date}</p>}

          <div className="mx-auto mt-6 max-w-[360px]">
            <Rule />
          </div>

          <p className="font-display mx-auto mt-6 max-w-[640px] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-parchment-100">
            {entity.summary}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
        {/* ── the article ── */}
        <article className="min-w-0">
          {blocks.length > 0 ? (
            blocks.map((block, i) =>
              block.type === "h2" ? (
                <h2
                  key={i}
                  className="font-display mt-11 mb-4 text-[24px] tracking-[.04em] text-parchment-100 first:mt-0"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ) : (
                <p
                  key={i}
                  className="mb-5 text-[15.5px] leading-[1.85] text-parchment-300"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              )
            )
          ) : (
            <p className="text-[15px] text-stone-500">This entry has not been written yet.</p>
          )}
        </article>

        {/* ── connections and facts ── */}
        <aside className="min-w-0 space-y-10 lg:border-l lg:border-gold-500/15 lg:pl-9">
          {Object.keys(meta).length > 0 && (
            <section>
              <h2 className="text-[10px] tracking-[.3em] text-gold-500">DETAILS</h2>
              <dl className="mt-4 space-y-2.5">
                {Object.entries(meta).map(([key, value]) => (
                  <div key={key} className="flex gap-3 text-[13px]">
                    <dt className="w-[38%] shrink-0 text-stone-500">{humanise(key)}</dt>
                    <dd className="min-w-0 text-parchment-200">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {groups.size > 0 && (
            <section>
              <h2 className="text-[10px] tracking-[.3em] text-gold-500">CONNECTIONS</h2>
              <div className="mt-4 space-y-6">
                {[...groups.entries()].map(([heading, items]) => (
                  <div key={heading}>
                    <h3 className="text-[12px] tracking-[.1em] text-stone-400">{heading}</h3>
                    <ul className="mt-2.5 space-y-2.5">
                      {items.map((r) => (
                        <li key={`${r.type}-${r.direction}-${r.entity.id}`}>
                          <EntityLink
                            href={`/${r.entity.topic}/${r.entity.slug}`}
                            title={r.entity.title}
                            summary={r.entity.summary}
                            kind={KIND_LABEL[r.entity.kind as EntityKind]?.one ?? r.entity.kind}
                          />
                          <p className="mt-0.5 text-[11.5px] leading-snug text-stone-500">
                            {relationLabel(r.type, r.direction)}
                            {r.note ? ` — ${r.note}` : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {siblings.length > 1 && (
            <section>
              <h2 className="text-[10px] tracking-[.3em] text-gold-500">
                MORE IN {topic.title.toUpperCase()}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {siblings
                  .filter((s) => s.id !== entity.id)
                  .slice(0, 8)
                  .map((s) => (
                    <li key={s.id}>
                      <EntityLink
                        href={`/${s.topic}/${s.slug}`}
                        title={s.title}
                        summary={s.summary}
                        kind={KIND_LABEL[s.kind as EntityKind]?.one ?? s.kind}
                      />
                    </li>
                  ))}
              </ul>
              <Link
                href={`/${topic.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-[13px] text-gold-400 transition hover:gap-3"
              >
                <Icon name={topic.icon} className="h-4 w-4" />
                All of {topic.title} <span aria-hidden="true">→</span>
              </Link>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}

/** The closest schema.org type for a codex kind. */
function schemaTypeFor(kind: EntityKind): string {
  switch (kind) {
    case "text":
      return "Book";
    case "figure":
      return "Person";
    case "civilization":
      return "Place";
    case "religion":
    case "tradition":
      return "Organization";
    default:
      return "CreativeWork";
  }
}

const humanise = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
