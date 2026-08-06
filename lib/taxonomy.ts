// lib/taxonomy.ts
// The shape of the codex, in one place.
//
// This is the single source the navigation, the topic routes, the entity kinds
// and (later) the seed data all read from. The point is that adding a topic is a
// data edit here, not a new route file, a nav entry, a schema change and four
// other edits that drift apart.
//
// Derived from CODEX.md in the repo root, which is the written outline. When the
// two disagree, CODEX.md is the intent and this is the implementation — update
// both together.
//
// Deliberately free of JSX so it can be imported by a route, a server component,
// a metadata function or a seed script without dragging React along. Icons are
// referenced by NAME and resolved through `<Icon>` in components/icons.tsx.

import type { IconName } from "@/components/icons";

/**
 * What a thing in the codex IS.
 *
 * Everything the site knows about is one of these, which is what lets a single
 * `entities` table hold all of it and a single page template render any of it.
 * A new kind is a value here plus a migration-free row — not a new table.
 */
export type EntityKind =
  | "symbol"
  | "text"
  | "figure"
  | "tradition"
  | "civilization"
  | "religion"
  | "concept";

export const ENTITY_KINDS: EntityKind[] = [
  "symbol",
  "text",
  "figure",
  "tradition",
  "civilization",
  "religion",
  "concept",
];

/** Human labels for a kind, singular and plural, for headings and breadcrumbs. */
export const KIND_LABEL: Record<EntityKind, { one: string; many: string }> = {
  symbol: { one: "Symbol", many: "Symbols" },
  text: { one: "Text", many: "Texts" },
  figure: { one: "Figure", many: "Figures" },
  tradition: { one: "Tradition", many: "Traditions" },
  civilization: { one: "Civilization", many: "Civilizations" },
  religion: { one: "Religion", many: "Religions" },
  concept: { one: "Concept", many: "Concepts" },
};

export type Topic = {
  /** URL segment. The topic route is /{slug}. */
  slug: string;
  title: string;
  /** One line, used on cards and as the page's meta description seed. */
  blurb: string;
  /** A longer opening for the topic's own landing page. */
  intro: string;
  icon: IconName;
  /** Which entity kinds this topic collects. Drives the landing page's queries. */
  kinds: EntityKind[];
  /**
   * The topic's internal divisions, straight from CODEX.md.
   *
   * These give a landing page real structure and real content on day one, before
   * a single entity exists in the database — and once entities do exist they
   * become the grouping headings rather than being thrown away.
   */
  sections: { title: string; items: string[] }[];
};

export const TOPICS: Topic[] = [
  {
    slug: "religion",
    title: "Religion",
    blurb: "Explore the world's major religions, sacred texts, theology, and spiritual traditions.",
    intro:
      "Every tradition that has tried to answer the same questions, set beside one another. Scripture, theology, ritual and the histories that carried them — read comparatively rather than in isolation.",
    icon: "book",
    kinds: ["religion", "text", "figure"],
    sections: [
      {
        title: "Living traditions",
        items: [
          "Christianity", "Judaism", "Islam", "Hinduism", "Buddhism",
          "Sikhism", "Jainism", "Taoism", "Shinto",
        ],
      },
      {
        title: "Ancient and indigenous",
        items: ["Pagan Religions", "Indigenous Religions", "Ancient Religions"],
      },
      { title: "Method", items: ["Comparative Religion"] },
    ],
  },
  {
    slug: "esotericism",
    title: "Esotericism",
    blurb: "Dive into the hidden wisdom, occult sciences, mysticism, and universal laws.",
    intro:
      "The inner traditions — what was taught behind the veil rather than from the pulpit. Hermeticism, alchemy, Kabbalah, the mystery schools, and the philosophies that run underneath them all.",
    icon: "eye",
    kinds: ["tradition", "concept", "figure", "text"],
    sections: [
      {
        title: "Philosophy and practice",
        items: [
          "Hermeticism", "Alchemy", "Kabbalah", "Gnosticism", "Rosicrucianism",
          "Freemasonry", "Mysticism", "Occult Philosophy",
        ],
      },
      {
        title: "The arts",
        items: ["Astrology", "Divination", "Magic", "Witchcraft", "Numerology", "Talismans"],
      },
      {
        title: "Doctrine",
        items: [
          "Universal Laws", "Sacred Geometry", "Symbolism", "Consciousness",
          "Angelology", "Demonology", "Spirituality",
        ],
      },
    ],
  },
  {
    slug: "symbols",
    title: "Symbols & Sigils",
    blurb: "Discover the meanings behind ancient symbols, sigils, and sacred geometry.",
    intro:
      "A symbol is an argument compressed into a shape. Here each one is traced to its origin, its tradition, and everywhere else it surfaced — because the same figure rarely means the same thing twice.",
    icon: "metatron",
    kinds: ["symbol", "concept"],
    sections: [
      {
        title: "By tradition",
        items: [
          "Egyptian", "Christian", "Jewish", "Islamic", "Hermetic", "Alchemical",
          "Masonic", "Norse", "Celtic", "Pagan",
        ],
      },
      {
        title: "By kind",
        items: ["Sacred Geometry", "Astrological", "Planetary", "Protective Symbols"],
      },
    ],
  },
  {
    slug: "sacred-texts",
    title: "Sacred Texts",
    blurb: "The primary sources — scripture, manuscript and treatise, with their commentaries.",
    intro:
      "The documents themselves, with their history attached: who wrote them, in what language, what survived, what was suppressed, and which later text answered them.",
    icon: "scroll",
    kinds: ["text"],
    sections: [
      {
        title: "Scripture",
        items: ["Bible", "Torah", "Quran", "Upanishads", "Bhagavad Gita", "Tao Te Ching", "Dhammapada"],
      },
      {
        title: "The hermetic and mystical corpus",
        items: [
          "Corpus Hermeticum", "Emerald Tablet", "The Kybalion", "Book of Enoch",
          "Nag Hammadi", "Zohar", "Dead Sea Scrolls",
        ],
      },
    ],
  },
  {
    slug: "traditions",
    title: "Traditions",
    blurb: "Explore mystical orders, secret societies, and esoteric traditions through history.",
    intro:
      "The schools and orders that carried this knowledge — how each was founded, what it taught, who passed through it, and where its ideas went next.",
    icon: "compass",
    kinds: ["tradition", "figure"],
    sections: [
      {
        title: "Orders and schools",
        items: [
          "Hermeticism", "Kabbalah", "Gnosticism", "Rosicrucianism", "Freemasonry",
          "Mystery Schools", "Neoplatonism",
        ],
      },
      {
        title: "Mystical currents",
        items: ["Christian Mysticism", "Sufism", "Ancient Egyptian Religion"],
      },
    ],
  },
  {
    slug: "figures",
    title: "Historical Figures",
    blurb: "The philosophers, mystics and scholars who shaped esoteric thought.",
    intro:
      "The people the ideas travelled through. Each with their period, their works, their teachers and students, and the traditions they altered on the way past.",
    icon: "eye",
    kinds: ["figure"],
    sections: [
      {
        title: "Antiquity",
        items: ["Hermes Trismegistus", "Moses", "Pythagoras", "Plato", "Aristotle"],
      },
      {
        title: "Early modern",
        items: ["John Dee", "Agrippa", "Paracelsus", "Eliphas Levi"],
      },
      {
        title: "Modern",
        items: ["Helena Blavatsky", "Manly P. Hall", "Rudolf Steiner", "Carl Jung"],
      },
    ],
  },
  {
    slug: "civilizations",
    title: "Ancient Civilizations",
    blurb: "The cultures that produced this knowledge, and what they left behind.",
    intro:
      "Where the traditions were born. Each civilization with its span, its deities, its temples and texts — and, crucially, who it was contemporary with.",
    icon: "column",
    kinds: ["civilization"],
    sections: [
      {
        title: "Near East",
        items: ["Egypt", "Sumer", "Babylon", "Assyria", "Persia", "Phoenicia", "Israel"],
      },
      { title: "Classical", items: ["Greece", "Rome"] },
      { title: "Asia", items: ["India", "China"] },
      { title: "Europe and the Americas", items: ["Celtic", "Norse", "Maya", "Aztec"] },
    ],
  },
  {
    slug: "astrology",
    title: "Astrology",
    blurb: "Study the stars, planets, houses, and their influence on life and consciousness.",
    intro:
      "The oldest of the sciences of correspondence — planets, houses and signs, their classical meanings, and the traditions that read them as a language.",
    icon: "zodiac",
    kinds: ["concept", "symbol", "figure"],
    sections: [
      { title: "The wheel", items: ["The Twelve Signs", "The Houses", "The Planets", "Aspects"] },
      { title: "Traditions", items: ["Hellenistic", "Medieval", "Vedic", "Modern Psychological"] },
    ],
  },
];

export const TOPIC_SLUGS = TOPICS.map((t) => t.slug);

export const topicBySlug = (slug: string): Topic | undefined =>
  TOPICS.find((t) => t.slug === slug);

/**
 * The header navigation.
 *
 * Deliberately NOT derived from TOPICS: the nav is an editorial choice about
 * what deserves a place in a seven-item bar, and it mixes content topics with
 * utility destinations. `topic: true` marks the ones that resolve through the
 * /[topic] route, so a link can be checked against the taxonomy rather than
 * trusted.
 */
export type NavItem = { label: string; href: string; topic?: boolean };

export const NAV: NavItem[] = [
  { label: "Library", href: "/library" },
  { label: "Traditions", href: "/traditions", topic: true },
  { label: "Symbols", href: "/symbols", topic: true },
  { label: "Learn", href: "/learn" },
  { label: "Media", href: "/media" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

/** The hero's quick-entry chips. Each points at a real destination. */
export const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "Sacred Texts", href: "/sacred-texts" },
  { label: "Esoteric Symbols", href: "/symbols" },
  { label: "Universal Laws", href: "/esotericism" },
  { label: "Ancient Wisdom", href: "/civilizations" },
];

/** The six gateways on the homepage, in the order the design shows them. */
export const HOME_TOPICS = [
  "religion",
  "esotericism",
  "symbols",
  "astrology",
  "traditions",
  "sacred-texts",
].map((slug) => {
  const topic = topicBySlug(slug);
  if (!topic) throw new Error(`HOME_TOPICS names an unknown topic: ${slug}`);
  return topic;
});
