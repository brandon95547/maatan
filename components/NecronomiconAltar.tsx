// components/NecronomiconAltar.tsx
// The homepage band for the month's reviewed book.
//
// This began as a hand-rolled 3D canvas — a hide-bound tome on a plinth that
// swung open under a tilting camera — and then as a supplied plate with a pager
// that turned its passages in place. Both are gone. The passages were only ever
// on the homepage because the drawn book needed something to put on its pages;
// with the book itself now a single image, they belong in the review, and the
// homepage's job is to name the month's title and send you there.
//
// No longer a client component: with the pager removed there is no state left,
// so this ships as markup and no JavaScript at all.
//
// On the subject itself the copy is deliberate. The Necronomicon is Lovecraft's
// invention, and a codex that hedges its dates elsewhere should not quietly
// imply this one is a surviving manuscript. "The most famous book that never
// existed" is the better hook anyway.

import Link from "next/link";
import { currentReview } from "@/content/reviews";

export function NecronomiconAltar() {
  const review = currentReview();

  return (
    <section
      aria-labelledby="altar-heading"
      className="relative border-y border-gold-500/20 bg-obsidian-900"
    >
      <div className="mx-auto max-w-[1100px] px-6 pt-16 text-center lg:pt-20">
        <p className="text-[10px] tracking-[.28em] text-gold-500">FROM THE RESTRICTED SHELF</p>
        <h2
          id="altar-heading"
          className="font-display mx-auto mt-4 max-w-[680px] text-[38px] leading-[1.05] text-parchment-100 lg:text-[46px]"
        >
          {review.title}
        </h2>
        <p className="mt-3 text-[13px] text-gold-500">
          {review.author} · reviewed {review.month} · no copy has ever existed
        </p>

        <p className="mx-auto mt-5 max-w-[680px] text-[14px] leading-relaxed text-stone-300">
          The most famous book that never existed. Lovecraft invented it, gave it an
          author, a translator and a chain of suppressed editions — and the invention
          outran him. Librarians filed catalogue cards for it; booksellers took orders.
          A paperback bearing the title has been in print since 1977.
        </p>
      </div>

      {/* ── the plate ──
          Outside the text column so nothing boxes it: the artwork's own edges
          fall away to black, and a container border would draw exactly the line
          the picture spends its margins avoiding.

          1120 is the previous 1600 less 30%. Below that width it fills the
          screen; above it, the letterboxing is invisible, because the plate's
          corners and the section ground are the same near-black.

          The aspect ratio is declared so the box is the right height before the
          bytes land — without it, every load would shove the buttons down the
          page as the image arrives. */}
      <div className="mx-auto mt-8 w-full max-w-[1120px]">
        {review.plate && (
          // A plain <img>: there is no next/image anywhere in this project and
          // the one other photograph is a CSS background, so there is no
          // convention here to break.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.plate.src}
            alt={review.plate.alt}
            width={1569}
            height={1003}
            className="aspect-[1569/1003] w-full"
          />
        )}
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-16 text-center lg:pb-20">
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/reviews/${review.slug}`}
            className="rounded-[3px] bg-gradient-to-b from-gold-300 to-gold-600 px-7 py-3 text-[13px] tracking-[.12em] text-black transition hover:brightness-110"
          >
            Read Review
          </Link>
          <Link
            href="/reviews"
            className="border border-gold-500/40 px-7 py-3 text-[13px] tracking-[.12em] text-gold-300 transition hover:bg-gold-500/10"
          >
            All Book Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
