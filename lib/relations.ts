// lib/relations.ts
// How two entities can be connected, and how that connection reads from each end.
//
// A relationship is stored ONCE — Hermes Trismegistus `authored` the Corpus
// Hermeticum — and read from both. The Corpus page must therefore be able to say
// "written by Hermes Trismegistus" without a second row existing, which is what
// `inverse` is for. Storing both directions would double every write and
// guarantee the two halves eventually disagree.
//
// Each type also declares the heading it appears under, so an entity page groups
// its connections into sections without hard-coding a list per kind.

export type RelationType =
  | "authored"
  | "describes"
  | "derives_from"
  | "influenced"
  | "practised_by"
  | "originates_in"
  | "contemporary_of"
  | "translated"
  | "commentary_on"
  | "related_to";

export type RelationSpec = {
  /** Reads on the FROM entity's page: "{from} — authored — {to}". */
  forward: string;
  /** Reads on the TO entity's page, describing the same single row. */
  inverse: string;
  /** Section heading on the from-side, and on the to-side. */
  forwardGroup: string;
  inverseGroup: string;
};

export const RELATIONS: Record<RelationType, RelationSpec> = {
  authored: {
    forward: "wrote",
    inverse: "written by",
    forwardGroup: "Works",
    inverseGroup: "Attribution",
  },
  describes: {
    forward: "describes",
    inverse: "described in",
    forwardGroup: "Describes",
    inverseGroup: "Described in",
  },
  derives_from: {
    forward: "derives from",
    inverse: "gave rise to",
    forwardGroup: "Derives from",
    inverseGroup: "Gave rise to",
  },
  influenced: {
    forward: "influenced",
    inverse: "influenced by",
    forwardGroup: "Influenced",
    inverseGroup: "Influences",
  },
  practised_by: {
    forward: "practised by",
    inverse: "practised",
    forwardGroup: "Practised by",
    inverseGroup: "Practices",
  },
  originates_in: {
    forward: "originates in",
    inverse: "origin of",
    forwardGroup: "Origin",
    inverseGroup: "Originated here",
  },
  // The one symmetric relation: it reads identically from both ends, which is
  // exactly what makes it the timeline's relation.
  contemporary_of: {
    forward: "contemporary of",
    inverse: "contemporary of",
    forwardGroup: "Contemporaries",
    inverseGroup: "Contemporaries",
  },
  translated: {
    forward: "translated",
    inverse: "translated by",
    forwardGroup: "Translations",
    inverseGroup: "Translators",
  },
  commentary_on: {
    forward: "comments on",
    inverse: "commentaries",
    forwardGroup: "Comments on",
    inverseGroup: "Commentaries",
  },
  related_to: {
    forward: "related to",
    inverse: "related to",
    forwardGroup: "Related",
    inverseGroup: "Related",
  },
};

export const RELATION_TYPES = Object.keys(RELATIONS) as RelationType[];

/** How a relation reads from the perspective of the entity whose page this is. */
export function relationLabel(type: string, direction: "out" | "in"): string {
  const spec = RELATIONS[type as RelationType] ?? RELATIONS.related_to;
  return direction === "out" ? spec.forward : spec.inverse;
}

/** The heading a relation is grouped under, from the current entity's side. */
export function relationGroup(type: string, direction: "out" | "in"): string {
  const spec = RELATIONS[type as RelationType] ?? RELATIONS.related_to;
  return direction === "out" ? spec.forwardGroup : spec.inverseGroup;
}
