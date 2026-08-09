// app/reviews/page.tsx
// The book reviews landing page: one book a month, read properly.
//
// Built around a single featured review rather than a grid, because there is
// currently one review and a grid of one is a grid that looks broken. The
// archive section below knows how to say "nothing here yet" out loud instead of
// rendering an empty row — and it turns into a real list on its own the moment
// REVIEWS has a second entry, with no edit here.
//
// A server component. Nothing on this page needs JavaScript.

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { REVIEWS, currentReview } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Book Reviews",
  description:
    "One book a month from the esoteric, religious and occult shelves — read in full, placed in its tradition, and reported on honestly.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const featured = currentReview();
  const archive = REVIEWS.slice(1);

  return (
    <PageShell
      eyebrow="Book Reviews"
      title="One Book a Month"
      intro="A single title from the esoteric, religious and occult shelves — read end to end, placed in the tradition it came from, and reported on plainly. Including when the honest report is that the book is not what it claims."
      icon="book"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "Reviews" }]}
    >
      {/* ── this month ── */}
      <section className="border-b border-gold-500/15 bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex items-center justify-center gap-3 text-[10px] tracking-[.28em] text-gold-500">
            <span className="h-px w-8 bg-gold-500/40" />
            THIS MONTH · {featured.month.toUpperCase()}
            <span className="h-px w-8 bg-gold-500/40" />
          </div>

          {featured.plate && (
            <Link
              href={`/reviews/${featured.slug}`}
              className="mt-8 block outline-none ring-gold-400/50 focus-visible:ring-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.plate.src}
                alt={featured.plate.alt}
                width={1569}
                height={1003}
                className="aspect-[1569/1003] w-full"
              />
            </Link>
          )}

          <div className="mx-auto mt-10 max-w-[680px] text-center">
            <p className="text-[11px] tracking-[.22em] text-stone-500">
              REVIEW No. {featured.no}
            </p>
            <h2 className="font-display mt-3 text-[34px] leading-[1.1] text-parchment-100 lg:text-[42px]">
              <Link href={`/reviews/${featured.slug}`} className="transition hover:text-gold-200">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 text-[13px] text-gold-500">{featured.author}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-stone-300">{featured.dek}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/reviews/${featured.slug}`}
                className="rounded-[3px] bg-gradient-to-b from-gold-300 to-gold-600 px-7 py-3 text-[13px] tracking-[.12em] text-black transition hover:brightness-110"
              >
                Read Review
              </Link>
              <Link
                href="/library"
                className="border border-gold-500/40 px-7 py-3 text-[13px] tracking-[.12em] text-gold-300 transition hover:bg-gold-500/10"
              >
                Join Maatan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── how a book gets chosen ── */}
      <section className="border-b border-gold-500/15 bg-obsidian-900 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-center text-[26px] text-parchment-100">
            How a book is chosen
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                n: "I",
                title: "It has to matter",
                body:
                  "A book earns a month here by having changed something — a tradition, a reading of an older text, or simply what a great many people believe. Obscurity on its own is not a qualification.",
              },
              {
                n: "II",
                title: "It gets read in full",
                body:
                  "Front to back, in the best edition available, with the translator and the date on the record. Where a text exists in several conflicting versions, the review says which one it worked from.",
              },
              {
                n: "III",
                title: "Provenance is reported",
                body:
                  "Where a work came from, who vouches for it, and what is genuinely unresolved. When the honest answer is that a book is a later invention, that is the review rather than a footnote to it.",
              },
            ].map((c) => (
              <article key={c.n} className="border-t border-gold-500/20 pt-6">
                <p className="font-display text-[13px] tracking-[.2em] text-gold-500">{c.n}</p>
                <h3 className="font-display mt-3 text-[19px] text-parchment-200">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-stone-400">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── the archive ── */}
      <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-center text-[26px] text-parchment-100">The archive</h2>

          {archive.length > 0 ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archive.map((r) => (
                <li key={r.slug} className="border border-gold-500/15 bg-obsidian-600 p-6">
                  <p className="text-[10px] tracking-[.24em] text-gold-500">
                    No. {r.no} · {r.month.toUpperCase()}
                  </p>
                  <h3 className="font-display mt-3 text-[21px] leading-tight text-parchment-100">
                    <Link href={`/reviews/${r.slug}`} className="transition hover:text-gold-200">
                      {r.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[12px] text-gold-500">{r.author}</p>
                  <p className="mt-4 text-[13px] leading-relaxed text-stone-400">{r.dek}</p>
                </li>
              ))}
            </ul>
          ) : (
            // Said plainly. An empty grid with nothing in it reads as a bug, and
            // inventing forthcoming titles to fill it would be worse than either.
            <p className="mx-auto mt-8 max-w-[560px] text-center text-[14px] leading-relaxed text-stone-400">
              This is the first. The archive builds at one book a month, and every
              review stays here permanently once it is published.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
