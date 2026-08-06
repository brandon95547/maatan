import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Documentaries, lectures, audio, illustrated diagrams and eBooks drawn from across the codex.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <PageShell
      eyebrow="Media"
      title="Watch, read and listen"
      intro="Not everything worth knowing is a wall of text. The media library gathers the lectures, documentaries, diagrams and recordings that sit alongside the written codex."
      icon="globe"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "Media" }]}
    >
      <ComingSoon
        what="the Media library"
        detail="Every item here will be attached to the entities it concerns, so a lecture on the Corpus Hermeticum appears on the text's own page and not only in a list of videos."
        planned={[
          "Documentaries",
          "Recorded lectures",
          "Audio and podcasts",
          "Interactive illustrations",
          "Infographics and diagrams",
          "eBooks and PDFs",
        ]}
      />
    </PageShell>
  );
}
