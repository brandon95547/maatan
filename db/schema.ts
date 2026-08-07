import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

// db/schema.ts
// Two tables hold the entire codex, and that is the design rather than a
// shortcut.
//
// The alternative — a table per kind: symbols, texts, figures, civilizations —
// looks tidier for about a week. Then every page that shows "related things"
// has to union seven tables, every new kind is a migration plus a route plus a
// query, and the relationships between kinds have nowhere to live. Here a kind
// is a VALUE, so adding one is a row, and a relationship is a row too.
//
// It buys the three things the site is actually for:
//   · one entity page template renders anything
//   · relationships traverse in both directions without knowing either kind
//   · the timeline is a query over start_year/end_year, not a separate feature
//
// See lib/taxonomy.ts for the kinds themselves, and lib/codex.ts for the typed
// read layer that pages use instead of touching drizzle directly.

export const entities = sqliteTable(
  "entities",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    /** URL segment, unique across the whole codex — the entity's identity. */
    slug: text("slug").notNull(),

    /** One of lib/taxonomy.ts's EntityKind. Text, not an enum: SQLite has none,
        and a new kind should not require a migration. */
    kind: text("kind").notNull(),

    /** Which topic page this belongs under. Matches a Topic.slug. */
    topic: text("topic").notNull(),

    title: text("title").notNull(),

    /** One or two sentences. Used on cards, in search results, in hover
        previews, and as the page's meta description — so it is written once and
        is expected to stand alone. */
    summary: text("summary").notNull().default(""),

    /** The article itself, as Markdown. */
    body: text("body").notNull().default(""),

    // ── time ──
    // Plain integers, negative for BCE, so ordering and range queries are
    // arithmetic rather than date parsing. A civilization has both ends; a text
    // may have only a composition year; a concept may have neither. All three
    // are ordinary rows — the timeline simply skips what it cannot place.
    startYear: integer("start_year"),
    endYear: integer("end_year"),
    /** Shown instead of the raw year when the number needs hedging —
        "c. 3100 BCE", "2nd–3rd century CE". */
    dateNote: text("date_note"),

    /** Anything kind-specific: a symbol's unicode glyph, a text's language, a
        figure's school. JSON because it is genuinely open-ended, and because
        putting it in columns would mean a migration per kind. */
    meta: text("meta", { mode: "json" }).$type<Record<string, unknown>>(),

    /** Lifts an entity onto its topic page's featured row. */
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),

    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => [
    unique("entities_slug_unique").on(t.slug),
    // The three reads the site actually makes: a topic page lists by topic, a
    // kind filter narrows within it, and the timeline sweeps a year range.
    index("entities_topic_idx").on(t.topic),
    index("entities_kind_idx").on(t.kind),
    index("entities_start_year_idx").on(t.startYear),
  ]
);

export const relationships = sqliteTable(
  "relationships",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    fromId: integer("from_id")
      .notNull()
      .references(() => entities.id, { onDelete: "cascade" }),
    toId: integer("to_id")
      .notNull()
      .references(() => entities.id, { onDelete: "cascade" }),

    /** How they relate. See RELATION_LABEL in lib/taxonomy-relations.ts for the
        vocabulary and, importantly, for how each one reads in reverse. */
    type: text("type").notNull(),

    /** Optional one-line gloss shown beside the link — "translated it into
        Latin in 1471" — which is what makes a connection worth following
        rather than a bare name. */
    note: text("note"),

    /** Orders the related list so the important connection is not third. */
    weight: integer("weight").notNull().default(0),

    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => [
    // Stored ONCE per pair and read from both ends — see relatedTo() in
    // lib/codex.ts. Storing the inverse as a second row would double the
    // writes and guarantee the two halves eventually disagree.
    index("relationships_from_idx").on(t.fromId),
    index("relationships_to_idx").on(t.toId),
    unique("relationships_unique").on(t.fromId, t.toId, t.type),
  ]
);

export type Entity = typeof entities.$inferSelect;
export type NewEntity = typeof entities.$inferInsert;
export type Relationship = typeof relationships.$inferSelect;
export type NewRelationship = typeof relationships.$inferInsert;
