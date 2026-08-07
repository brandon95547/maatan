// content/types.ts
// The shape seed content is written in.
//
// Content lives in the repo as typed modules rather than as SQL: it reviews as a
// normal diff, the compiler catches a relationship pointing at a slug that does
// not exist, and the seed route is the only thing that needs to know about the
// database. The rows are the same either way; this is about who can check them.

import type { EntityKind } from "@/lib/taxonomy";
import type { RelationType } from "@/lib/relations";

export type SeedEntity = {
  slug: string;
  kind: EntityKind;
  /** Must match a Topic.slug in lib/taxonomy.ts. */
  topic: string;
  title: string;
  /** One or two sentences that stand alone — used in cards, search results and
      hover previews, and as the page's meta description. */
  summary: string;
  /** The article, as Markdown. */
  body: string;
  /** Negative for BCE. Omit when genuinely unknown rather than guessing. */
  startYear?: number;
  endYear?: number;
  /** Shown instead of the bare year wherever the number needs hedging. Most
      things here need it: "c. 100–300 CE" is the truth, "100 CE" is not. */
  dateNote?: string;
  meta?: Record<string, unknown>;
  featured?: boolean;
};

export type SeedRelation = {
  /** Slugs, not ids — resolved by the seed route after the entities exist. */
  from: string;
  to: string;
  type: RelationType;
  note?: string;
  /** Higher sorts first, so the important connection is not third. */
  weight?: number;
};

export type SeedBundle = {
  entities: SeedEntity[];
  relations: SeedRelation[];
};
