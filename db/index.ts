import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// `cloudflare:workers` is a runtime module with no local type declarations, so
// this import is the one place in the codebase TypeScript cannot resolve. It is
// kept to this file deliberately: everything else asks through getDb() or
// hasDbBinding() and stays typed.

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

/**
 * Is the D1 binding attached to this worker?
 *
 * Distinct from "are the tables there" — the binding is injected by the platform
 * from .openai/hosting.json, while the tables come from applying the migration in
 * drizzle/. Those are two separate failures with one symptom (an empty site), and
 * /api/admin/status tells them apart.
 */
export function hasDbBinding(): boolean {
  return Boolean(env.DB);
}
