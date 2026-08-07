import { sql } from "drizzle-orm";
import { getDb, hasDbBinding } from "@/db";
import { entities, relationships } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

// app/api/admin/status/route.ts
// Why is the codex empty?
//
// Every read in lib/codex.ts degrades to empty rather than throwing, which is
// right for a reader — a page that renders its structure and says it has no
// entries beats a 500. The cost is that three very different failures all look
// identical from the outside: the D1 binding was never injected, the migration
// has not been applied, or the tables exist and nothing has been seeded.
//
// This endpoint separates them, and it is the first thing to check after a
// deploy. It reads only.

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ ok: false, message: "Sign in with ChatGPT." }, { status: 401 });
  }

  // 1. Is the binding there at all? Set by "d1": "DB" in .openai/hosting.json.
  if (!hasDbBinding()) {
    return Response.json({
      ok: false,
      binding: false,
      diagnosis:
        'No D1 binding. Check that .openai/hosting.json has "d1": "DB" and that the deploy picked it up.',
    });
  }

  // 2. Do the tables exist? They are created by the migration in drizzle/, which
  //    the Sites platform applies at deploy — not by anything in this codebase.
  try {
    const db = getDb();
    const [{ n: entityCount }] = await db.select({ n: sql<number>`count(*)` }).from(entities);
    const [{ n: relationCount }] = await db
      .select({ n: sql<number>`count(*)` })
      .from(relationships);

    const entityTotal = Number(entityCount);
    return Response.json({
      ok: true,
      binding: true,
      tables: true,
      counts: { entities: entityTotal, relations: Number(relationCount) },
      diagnosis:
        entityTotal === 0
          ? "Tables exist but are empty. POST to /api/admin/seed to load the repo's content."
          : "Codex is populated.",
    });
  } catch (err) {
    return Response.json({
      ok: false,
      binding: true,
      tables: false,
      detail: (err as Error)?.message,
      diagnosis:
        "The binding is present but the tables are not queryable. The migration in drizzle/ has probably not been applied — redeploy, since the platform applies it at deploy time.",
    });
  }
}
