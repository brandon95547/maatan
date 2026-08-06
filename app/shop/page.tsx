import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Books, sacred geometry prints, symbol artwork, study guides and journals from the Maatan codex.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <PageShell
      eyebrow="Shop"
      title="Objects of study"
      intro="Editions worth owning and artwork worth hanging — drawn from the same material as the codex, for those who would rather hold it than scroll it."
      icon="column"
      crumbs={[{ label: "Codex", href: "/library" }, { label: "Shop" }]}
    >
      <ComingSoon
        what="the Shop"
        detail="The cart in the header is deliberately inert until there is something real behind it. When it opens, each item will link back to the entity it came from."
        planned={[
          "Books and eBooks",
          "Sacred geometry prints",
          "Symbol artwork",
          "Study guides",
          "Journals",
          "Digital downloads",
        ]}
      />
    </PageShell>
  );
}
