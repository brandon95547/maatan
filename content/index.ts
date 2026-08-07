// content/index.ts
// Every seed bundle, merged and checked.
//
// The check matters more than the merge. A relation names its ends by slug, and
// a slug with a typo in it would otherwise be dropped silently at seed time —
// the entity pages would render, the connection would simply not be there, and
// nothing would say why. `validateContent` turns that into an error before the
// seed runs.

import { sacredTexts } from "./sacred-texts";
import type { SeedBundle } from "./types";
import { RELATION_TYPES } from "@/lib/relations";
import { ENTITY_KINDS, TOPIC_SLUGS } from "@/lib/taxonomy";

const BUNDLES: SeedBundle[] = [sacredTexts];

export const content: SeedBundle = {
  entities: BUNDLES.flatMap((b) => b.entities),
  relations: BUNDLES.flatMap((b) => b.relations),
};

/** Everything wrong with the content, as readable lines. Empty means valid. */
export function validateContent(bundle: SeedBundle = content): string[] {
  const problems: string[] = [];
  const slugs = new Set<string>();

  for (const e of bundle.entities) {
    if (slugs.has(e.slug)) problems.push(`duplicate entity slug: ${e.slug}`);
    slugs.add(e.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)) {
      problems.push(`slug is not url-safe: ${e.slug}`);
    }
    if (!ENTITY_KINDS.includes(e.kind)) {
      problems.push(`${e.slug}: unknown kind "${e.kind}"`);
    }
    if (!TOPIC_SLUGS.includes(e.topic)) {
      problems.push(`${e.slug}: unknown topic "${e.topic}"`);
    }
    if (!e.summary.trim()) {
      problems.push(`${e.slug}: empty summary (it is the meta description and the hover preview)`);
    }
    if (e.startYear != null && e.endYear != null && e.endYear < e.startYear) {
      problems.push(`${e.slug}: endYear ${e.endYear} precedes startYear ${e.startYear}`);
    }
  }

  for (const r of bundle.relations) {
    if (!slugs.has(r.from)) problems.push(`relation from unknown entity: ${r.from} → ${r.to}`);
    if (!slugs.has(r.to)) problems.push(`relation to unknown entity: ${r.from} → ${r.to}`);
    if (!RELATION_TYPES.includes(r.type)) {
      problems.push(`unknown relation type "${r.type}" (${r.from} → ${r.to})`);
    }
    if (r.from === r.to) problems.push(`self-relation: ${r.from}`);
  }

  return problems;
}
