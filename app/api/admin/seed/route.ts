import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { entities, relationships } from "@/db/schema";
import { content, validateContent } from "@/content";
import { getChatGPTUser } from "@/app/chatgpt-auth";

// app/api/admin/seed/route.ts
// Loads the repo's content into D1.
//
// This exists because there is no other way in. Migrations are applied by the
// Sites platform at deploy and there is no local apply step and no shell against
// the production database — so the content has to arrive over HTTP, which means
// this endpoint has to be safe to expose.
//
// Three things make it safe:
//
//   · IDENTITY. The platform injects the signed-in user's email as a header, and
//     getChatGPTUser reads it. No secret to leak, rotate or commit — an
//     unauthenticated request simply has no header and is refused. SEED_ALLOW
//     narrows it further to named accounts.
//   · IDEMPOTENCE. Entities upsert on slug, relations on (from, to, type). Run
//     it twice and the second run changes nothing but updated_at. There is no
//     path here that deletes anything.
//   · VALIDATION FIRST. The content is checked before a single write, so a
//     typo'd relation slug fails loudly instead of silently seeding a codex with
//     a missing connection nobody notices for a month.

export const dynamic = "force-dynamic";

/** Comma-separated emails permitted to seed. Unset means "any signed-in user",
    which is correct while this site has exactly one operator. */
const allowList = () =>
  (process.env.SEED_ALLOW ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

async function authorise(): Promise<{ ok: true; email: string } | { ok: false; status: number; message: string }> {
  const user = await getChatGPTUser();
  if (!user) {
    return { ok: false, status: 401, message: "Sign in with ChatGPT to seed the codex." };
  }
  const allowed = allowList();
  if (allowed.length > 0 && !allowed.includes(user.email.toLowerCase())) {
    return { ok: false, status: 403, message: "That account is not permitted to seed." };
  }
  return { ok: true, email: user.email };
}

/** What is in the database now, without changing it. */
export async function GET() {
  const auth = await authorise();
  if (!auth.ok) return Response.json({ ok: false, message: auth.message }, { status: auth.status });

  const problems = validateContent();
  try {
    const db = getDb();
    const [{ n: entityCount }] = await db
      .select({ n: sql<number>`count(*)` })
      .from(entities);
    const [{ n: relationCount }] = await db
      .select({ n: sql<number>`count(*)` })
      .from(relationships);

    return Response.json({
      ok: true,
      database: { entities: Number(entityCount), relations: Number(relationCount) },
      repo: { entities: content.entities.length, relations: content.relations.length },
      contentProblems: problems,
      hint: "POST to this URL to apply the repo's content.",
    });
  } catch (err) {
    return Response.json(
      {
        ok: false,
        message:
          "The codex tables are not reachable. If this is a fresh deploy, the migration in drizzle/ may not have been applied yet.",
        detail: (err as Error)?.message,
        contentProblems: problems,
      },
      { status: 503 }
    );
  }
}

export async function POST() {
  const auth = await authorise();
  if (!auth.ok) return Response.json({ ok: false, message: auth.message }, { status: auth.status });

  // Before any write. A relation naming a slug that does not exist would be
  // dropped at insert time and never explain itself.
  const problems = validateContent();
  if (problems.length > 0) {
    return Response.json(
      { ok: false, message: "Content failed validation; nothing was written.", problems },
      { status: 422 }
    );
  }

  const db = getDb();
  const now = new Date().toISOString();

  // Entities first — relations reference them.
  for (const e of content.entities) {
    await db
      .insert(entities)
      .values({
        slug: e.slug,
        kind: e.kind,
        topic: e.topic,
        title: e.title,
        summary: e.summary,
        body: e.body,
        startYear: e.startYear ?? null,
        endYear: e.endYear ?? null,
        dateNote: e.dateNote ?? null,
        meta: e.meta ?? null,
        featured: e.featured ?? false,
      })
      // Upsert rather than insert-or-skip: the repo is the source of truth, so a
      // re-seed after an edit should carry the edit through.
      .onConflictDoUpdate({
        target: entities.slug,
        set: {
          kind: e.kind,
          topic: e.topic,
          title: e.title,
          summary: e.summary,
          body: e.body,
          startYear: e.startYear ?? null,
          endYear: e.endYear ?? null,
          dateNote: e.dateNote ?? null,
          meta: e.meta ?? null,
          featured: e.featured ?? false,
          updatedAt: now,
        },
      });
  }

  const rows = await db.select({ id: entities.id, slug: entities.slug }).from(entities);
  const idBySlug = new Map(rows.map((r) => [r.slug, r.id]));

  let relationsWritten = 0;
  for (const r of content.relations) {
    const fromId = idBySlug.get(r.from);
    const toId = idBySlug.get(r.to);
    // Validation already proved both ends exist in the repo; this guards against
    // a partially-applied earlier run.
    if (!fromId || !toId) continue;

    await db
      .insert(relationships)
      .values({ fromId, toId, type: r.type, note: r.note ?? null, weight: r.weight ?? 0 })
      .onConflictDoUpdate({
        target: [relationships.fromId, relationships.toId, relationships.type],
        set: { note: r.note ?? null, weight: r.weight ?? 0 },
      });
    relationsWritten++;
  }

  const [{ n: entityCount }] = await db.select({ n: sql<number>`count(*)` }).from(entities);
  const [{ n: relationCount }] = await db.select({ n: sql<number>`count(*)` }).from(relationships);

  return Response.json({
    ok: true,
    seededBy: auth.email,
    written: { entities: content.entities.length, relations: relationsWritten },
    total: { entities: Number(entityCount), relations: Number(relationCount) },
  });
}
