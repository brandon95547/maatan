// lib/format.ts
// Turning stored values into the things a reader sees.

import type { Entity } from "@/db/schema";

/** A stored year as an era-qualified string. Negative is BCE. */
export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

/**
 * The date line for an entity.
 *
 * `dateNote` wins whenever it exists, and for this material it usually does:
 * the honest answer is "c. 100–300 CE", while `startYear` holds the single
 * number the timeline needs to place it. Showing the number where the note
 * exists would be inventing a precision the sources do not have.
 */
export function entityDate(entity: Pick<Entity, "startYear" | "endYear" | "dateNote">): string | null {
  if (entity.dateNote) return entity.dateNote;
  if (entity.startYear == null) return null;
  if (entity.endYear == null) return formatYear(entity.startYear);
  return `${formatYear(entity.startYear)} – ${formatYear(entity.endYear)}`;
}

/**
 * The least amount of Markdown this content actually uses: `## headings`,
 * paragraphs, *emphasis* and **strong**.
 *
 * A parser dependency would be a lockfile change and a client bundle for a
 * feature the corpus does not need — the bodies in content/ are prose with
 * subheadings. If they ever need lists, tables or links, this becomes a real
 * parser rather than growing more regexes.
 */
export function renderMarkdown(body: string): { type: "h2" | "p"; html: string }[] {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const inline = (s: string) =>
    escape(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ")
        ? { type: "h2" as const, html: inline(block.slice(3).trim()) }
        : { type: "p" as const, html: inline(block.replace(/\n/g, " ")) }
    );
}
