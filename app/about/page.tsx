import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Maatan is a living digital codex — the world's religious, philosophical, historical and esoteric traditions preserved, connected and explored as one continuous body of knowledge.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="The Hidden Codex"
      intro="Maatan is not a website with articles on it. It is an attempt to hold the world's esoteric and religious inheritance as one connected body of knowledge rather than a shelf of unrelated documents."
      icon="eye"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "About" }]}
    >
      <section className="bg-obsidian-800 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[720px] space-y-8 text-[15px] leading-[1.85] text-parchment-300">
          <p>
            Most archives of this material are exactly that — archives. They preserve the texts and
            leave you to find your own way between them. A symbol sits in one index, the manuscript
            describing it in another, the figure who drew it in a third, and nothing in the system
            knows they are the same story.
          </p>
          <p>
            Maatan is built the other way round. Every symbol, text, figure, tradition and
            civilization is an entity with its own place, and the relationships between them are the
            substance rather than an afterthought. Follow the Emerald Tablet to Hermes Trismegistus,
            to alchemy, to the Kybalion, to the principle of correspondence — and back out again
            through any of them.
          </p>
          <p>
            The intention is the modern equivalent of the Library of Alexandria for comparative and
            esoteric knowledge: somewhere you arrive looking for one thing and leave having followed
            an idea across three civilizations and two thousand years.
          </p>
          <div className="border-t border-gold-500/15 pt-8">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 text-[14px] text-gold-400 transition hover:gap-3"
            >
              Begin with the Library <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
