import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guided paths through the codex — structured routes into Hermeticism, sacred geometry, comparative religion and the mystery traditions.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="Guided paths"
      intro="The codex rewards wandering, but not everyone arrives wanting to wander. Guided paths are ordered routes through the material, built so each step assumes only what came before it."
      icon="scroll"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "Learn" }]}
    >
      <ComingSoon
        what="Learn"
        detail="Paths are written against the entity graph rather than as standalone courses, so every step links back into the wider codex instead of dead-ending at the end of a lesson."
        planned={[
          "Hermeticism in ten steps",
          "Foundations of sacred geometry",
          "Understanding Ancient Egyptian religion",
          "Comparative creation narratives",
          "Reading the Emerald Tablet",
          "An introduction to Kabbalah",
        ]}
      />
    </PageShell>
  );
}
