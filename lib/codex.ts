// lib/codex.ts
// Everything the pages are allowed to ask the codex.
//
// The one place that knows drizzle exists. Pages import from here, which is what
// keeps the storage decision reversible: when a query needs to become an FTS5
// match, or the whole thing moves off D1, it changes here and no route notices.
//
// Every function tolerates the database being absent. D1 is applied by the Sites
// platform at deploy, so during local development — and on any environment where
// the binding has not been injected — `getDb()` throws. A knowledge site whose
// pages 500 because the seed has not run is worse than one that renders its
// structure and says it is empty, so reads degrade to empty rather than throw.
// `codexAvailable()` lets a page say so honestly.

import { and, asc, desc, eq, inArray, isNotNull, like, or, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { entities, relationships, type Entity } from "@/db/schema";
import type { EntityKind } from "@/lib/taxonomy";

/** A related entity, already resolved to the side the caller is NOT on. */
export type Related = {
  entity: Entity;
  type: string;
  /** "out" — this entity is the subject. "in" — it is the object. Decides which
      way the relation label reads; see lib/relations.ts. */
  direction: "out" | "in";
  note: string | null;
};

/**
 * Run a read, or give back `fallback` if the database is not there.
 *
 * Deliberately swallows. The only errors reachable here are "binding missing"
 * and "table not created yet", both of which mean the same thing to a reader —
 * there is nothing to show — and neither of which a page can do anything about.
 * They are logged once rather than silently, so an empty page in production is
 * still traceable.
 */
async function read<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (err) {
    console.warn("[codex] read failed, returning empty:", (err as Error)?.message);
    return fallback;
  }
}

/** Is there a codex behind this page at all? Used to explain an empty state. */
export async function codexAvailable(): Promise<boolean> {
  return read(false, async () => {
    await getDb().select({ n: sql<number>`1` }).from(entities).limit(1);
    return true;
  });
}

export async function entityBySlug(slug: string): Promise<Entity | null> {
  return read<Entity | null>(null, async () => {
    const rows = await getDb().select().from(entities).where(eq(entities.slug, slug)).limit(1);
    return rows[0] ?? null;
  });
}

export async function entitiesForTopic(
  topic: string,
  opts: { kind?: EntityKind; limit?: number } = {}
): Promise<Entity[]> {
  return read<Entity[]>([], async () => {
    const where = opts.kind
      ? and(eq(entities.topic, topic), eq(entities.kind, opts.kind))
      : eq(entities.topic, topic);
    const q = getDb().select().from(entities).where(where).orderBy(asc(entities.title));
    return opts.limit ? q.limit(opts.limit) : q;
  });
}

/** How many entities each topic holds, for counts on the library index. */
export async function countsByTopic(): Promise<Record<string, number>> {
  return read<Record<string, number>>({}, async () => {
    const rows = await getDb()
      .select({ topic: entities.topic, n: sql<number>`count(*)` })
      .from(entities)
      .groupBy(entities.topic);
    return Object.fromEntries(rows.map((r) => [r.topic, Number(r.n)]));
  });
}

export async function featuredEntities(limit = 6): Promise<Entity[]> {
  return read<Entity[]>([], async () =>
    getDb()
      .select()
      .from(entities)
      .where(eq(entities.featured, true))
      .orderBy(asc(entities.title))
      .limit(limit)
  );
}

/**
 * Everything connected to an entity, from both ends of the relationship table.
 *
 * The two queries are the whole reason relationships are stored once: rows where
 * this entity is `from` come back as outgoing, rows where it is `to` come back as
 * incoming, and lib/relations.ts decides how each reads. Neither side has to know
 * what kind the other entity is.
 */
export async function relatedTo(entityId: number): Promise<Related[]> {
  return read<Related[]>([], async () => {
    const db = getDb();

    const [out, incoming] = await Promise.all([
      db
        .select()
        .from(relationships)
        .where(eq(relationships.fromId, entityId))
        .orderBy(desc(relationships.weight)),
      db
        .select()
        .from(relationships)
        .where(eq(relationships.toId, entityId))
        .orderBy(desc(relationships.weight)),
    ]);

    const otherIds = [...out.map((r) => r.toId), ...incoming.map((r) => r.fromId)];
    if (otherIds.length === 0) return [];

    // One lookup for every neighbour rather than one per row — a well-connected
    // entity would otherwise issue thirty queries to render a sidebar.
    const others = await db.select().from(entities).where(inArray(entities.id, otherIds));
    const byId = new Map(others.map((e) => [e.id, e]));

    const resolve = (rows: typeof out, direction: "out" | "in"): Related[] =>
      rows.flatMap((r) => {
        const entity = byId.get(direction === "out" ? r.toId : r.fromId);
        return entity ? [{ entity, type: r.type, direction, note: r.note }] : [];
      });

    return [...resolve(out, "out"), ...resolve(incoming, "in")];
  });
}

/**
 * The neighbourhood around an entity, for the local graph.
 *
 * One or two hops, never the whole graph: a force-directed view of a thousand
 * nodes is an unreadable hairball, and the local view is both more useful and
 * free of the scale problem. Returns nodes and edges ready to draw.
 */
export async function neighbourhood(
  slug: string,
  hops: 1 | 2 = 1
): Promise<{ nodes: Entity[]; edges: { from: number; to: number; type: string }[] }> {
  return read<{ nodes: Entity[]; edges: { from: number; to: number; type: string }[] }>(
    { nodes: [], edges: [] },
    async () => {
      const db = getDb();
      const root = await entityBySlug(slug);
      if (!root) return { nodes: [], edges: [] };

      const seen = new Map<number, Entity>([[root.id, root]]);
      const edges: { from: number; to: number; type: string }[] = [];
      let frontier = [root.id];

      for (let hop = 0; hop < hops; hop++) {
        if (frontier.length === 0) break;
        const rows = await db
          .select()
          .from(relationships)
          .where(
            or(inArray(relationships.fromId, frontier), inArray(relationships.toId, frontier))
          );

        for (const r of rows) edges.push({ from: r.fromId, to: r.toId, type: r.type });

        const next = [...new Set(rows.flatMap((r) => [r.fromId, r.toId]))].filter(
          (id) => !seen.has(id)
        );
        if (next.length === 0) break;

        const found = await db.select().from(entities).where(inArray(entities.id, next));
        for (const e of found) seen.set(e.id, e);
        frontier = next;
      }

      // Dedupe: a pair can be reached from both ends within one sweep.
      const uniqueEdges = [
        ...new Map(edges.map((e) => [`${e.from}-${e.to}-${e.type}`, e])).values(),
      ].filter((e) => seen.has(e.from) && seen.has(e.to));

      return { nodes: [...seen.values()], edges: uniqueEdges };
    }
  );
}

/**
 * Entities that can be placed in time, for the comparative timeline.
 *
 * Only rows with a start year — an undated concept is not a timeline failure, it
 * simply is not on it.
 */
export async function datedEntities(opts: { topic?: string } = {}): Promise<Entity[]> {
  return read<Entity[]>([], async () => {
    const where = opts.topic
      ? and(isNotNull(entities.startYear), eq(entities.topic, opts.topic))
      : isNotNull(entities.startYear);
    return getDb().select().from(entities).where(where).orderBy(asc(entities.startYear));
  });
}

/**
 * Search.
 *
 * A LIKE scan for now, deliberately. It is honest at the current scale and has no
 * setup cost; when the corpus outgrows it this becomes an FTS5 MATCH and nothing
 * outside this function changes. (FTS5 availability on D1 is unverified — it
 * needs testing before being relied on.)
 */
export async function searchEntities(query: string, limit = 30): Promise<Entity[]> {
  const q = query.trim();
  if (!q) return [];
  return read<Entity[]>([], async () => {
    const needle = `%${q.replace(/[%_]/g, (c) => `\\${c}`)}%`;
    return getDb()
      .select()
      .from(entities)
      .where(or(like(entities.title, needle), like(entities.summary, needle)))
      // Title matches first: someone typing "Kybalion" wants the book, not the
      // six articles that mention it.
      .orderBy(sql`case when ${entities.title} like ${needle} then 0 else 1 end`, asc(entities.title))
      .limit(limit);
  });
}
