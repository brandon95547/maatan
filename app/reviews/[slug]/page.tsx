// app/reviews/[slug]/page.tsx
// One review, from one template — the same claim the topic route makes. A second
// review is an entry in content/reviews.ts and nothing else.
//
// A server component with no client JavaScript.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { REVIEWS, reviewBySlug } from "@/content/reviews";

// Only real reviews resolve. Without this, /reviews/anything renders a shell for
// a review that does not exist rather than a 404 — and a crawler would happily
// index the infinite set of them.
export const dynamicParams = false;

export function generateStaticParams() {
  return REVIEWS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = reviewBySlug(slug);
  if (!review) return {};
  return {
    title: `${review.title} — Review No. ${review.no}`,
    description: review.dek,
    alternates: { canonical: `/reviews/${review.slug}` },
    openGraph: {
      type: "article",
      title: `${review.title} — Review No. ${review.no}`,
      description: review.dek,
      publishedTime: review.date,
      images: review.plate ? [review.plate.src] : undefined,
    },
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = reviewBySlug(slug);
  if (!review) notFound();

  return (
    <PageShell
      eyebrow={`Review No. ${review.no} · ${review.month}`}
      title={review.title}
      intro={review.dek}
      icon="book"
      crumbs={[
        { label: "Codex", href: "/library" },
        { label: "Reviews", href: "/reviews" },
        { label: review.title },
      ]}
    >
      {/* ── the plate ── */}
      {review.plate && (
        <div className="mx-auto w-full max-w-[1120px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.plate.src}
            alt={review.plate.alt}
            width={1569}
            height={1003}
            className="aspect-[1569/1003] w-full"
          />
        </div>
      )}

      {/* ── the short answer, before the long one ── */}
      <section className="border-y border-gold-500/15 bg-obsidian-900 px-5 py-14">
        <div className="mx-auto grid max-w-[1000px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <div>
            <p className="text-[10px] tracking-[.28em] text-gold-500">THE SHORT ANSWER</p>
            <p className="font-display mt-4 text-[20px] leading-relaxed text-parchment-200 lg:text-[23px]">
              {review.verdict}
            </p>
            <p className="mt-6 text-[12px] text-stone-500">
              By {review.author} · reviewed{" "}
              <time dateTime={review.date}>{review.month}</time>
            </p>
          </div>

          {/* Facts as a definition list, because that is what they are — and a
              screen reader then reads each value with its own label attached. */}
          <dl className="space-y-4 border-t border-gold-500/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {review.facts.map((f) => (
              <div key={f.term}>
                <dt className="text-[10px] tracking-[.22em] text-gold-500">
                  {f.term.toUpperCase()}
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-stone-300">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── the review ── */}
      <article className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[720px]">
          {review.sections.map((s, i) => (
            <section key={s.heading} className={i === 0 ? "" : "mt-14"}>
              <h2 className="font-display text-[26px] leading-tight text-parchment-100">
                {s.heading}
              </h2>
              <div className="mt-5 space-y-6 text-[15px] leading-[1.85] text-parchment-300">
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {review.seeAlso && review.seeAlso.length > 0 && (
            <nav aria-label="Related" className="mt-16 border-t border-gold-500/20 pt-8">
              <p className="text-[10px] tracking-[.28em] text-gold-500">FOLLOW IT FURTHER</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {review.seeAlso.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="border border-gold-500/40 px-5 py-2.5 text-[13px] tracking-[.1em] text-gold-300 transition hover:bg-gold-500/10"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="text-[13px] tracking-[.12em] text-stone-400 transition hover:text-gold-300"
            >
              ← All reviews
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
