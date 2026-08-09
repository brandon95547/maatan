// content/reviews.ts
// One book a month, read properly and written up.
//
// Same reasoning as the codex entries next door: reviews live in the repo as a
// typed module rather than in the database. They review as a normal diff, the
// compiler catches a `plate` pointing at a file that is not in `public/`, and
// nothing has to be seeded to publish one.
//
// `verdict` is deliberately not a number. A five-star rating on a book like the
// first entry here would be answering a question nobody sensibly asked — is the
// Necronomicon any good — instead of the one worth answering, which is what the
// thing actually is.

export type ReviewSection = { heading: string; body: string[] };

export type Review = {
  slug: string;
  /** Running number. The first review is No. 1 and they do not reset. */
  no: number;
  /** e.g. "August 2026" — the month it was the chosen book. */
  month: string;
  /** Publication date, ISO, for <time> and metadata. */
  date: string;
  title: string;
  /** Byline for the work itself, not for the reviewer. */
  author: string;
  /** The one-line claim the review makes. Used on cards and as meta description. */
  dek: string;
  /** A short, plain answer to "so what is it" — shown beside the plate. */
  verdict: string;
  /** Facts worth having before the prose. Rendered as a definition list. */
  facts: { term: string; value: string }[];
  /** Artwork in `public/`, plus its alternative text. */
  plate?: { src: string; alt: string };
  sections: ReviewSection[];
  /** Slugs in the codex this review should hand you on to. */
  seeAlso?: { label: string; href: string }[];
};

const necronomicon: Review = {
  slug: "necronomicon",
  no: 1,
  month: "August 2026",
  date: "2026-08-07",
  title: "The Necronomicon",
  author: "H. P. Lovecraft",
  dek: "The first book in this series is one that was never written — and that has never stopped it being sold.",
  verdict:
    "Not a grimoire, not a lost manuscript, and not quite a hoax either. A piece of fiction that acquired a bibliography, which is most of what we mean by real.",
  facts: [
    { term: "First cited", value: "1924, in Lovecraft's story “The Hound”" },
    { term: "Attributed author", value: "Abdul Alhazred, of Sanaa — also an invention" },
    { term: "Surviving copies", value: "None. There have never been any" },
    { term: "In print", value: "Continuously since 1977, under the title" },
  ],
  plate: {
    src: "/necronomicon-plate.webp",
    alt: "A gold sigil on black: an all-seeing eye at the centre of a seven-pointed star, ringed with script and flanked by phases of the moon amid drifting cloud",
  },
  sections: [
    {
      heading: "Al Azif",
      body: [
        "There is no Necronomicon. There never was. It was invented by Howard Phillips Lovecraft, who first named it in a short story published in 1924, and who spent the following decade citing it as though it sat on a shelf in Providence.",
        "That habit is the whole trick. Lovecraft did not describe the book so much as refer to it — in passing, in other people's stories, with the mild impatience of a man who assumes you have already heard of it. A thing mentioned casually is a thing that exists.",
      ],
    },
    {
      heading: "The Mad Arab",
      body: [
        "He gave the book an author: Abdul Alhazred, a poet of Sanaa, and gave the author a death — seized in daylight, in a crowded market, by something no one else could see. The name was one Lovecraft had used as a child, playing at being an Arabian scholar after reading the Arabian Nights.",
        "It is worth saying plainly, because the fiction has had a century to settle: Alhazred is not a historical figure, Sanaa holds no manuscript of his, and the Arabic title Al Azif was coined for the story.",
      ],
    },
    {
      heading: "A chain of custody",
      body: [
        "The invention's real craft is its provenance. Lovecraft gave the book translators, dates and losses — a Greek rendering, a Latin one, editions suppressed, copies burned, a handful surviving in named libraries that would not let you see them.",
        "This is the part other writers should study. A history of disappearances is unfalsifiable: you cannot produce a book that is always said to be missing, and every failure to find it confirms the story. He built an object whose absence is evidence.",
      ],
    },
    {
      heading: "The forgeries",
      body: [
        "It worked, and then it kept working without him. Card-catalogue entries began appearing in university libraries, filed by staff who knew exactly what they were doing. Booksellers logged requests. Students went looking.",
        "In 1977 a paperback appeared bearing the title, assembled largely from Sumerian and Mesopotamian material that has nothing to do with Lovecraft's fiction. It has never gone out of print. Whatever else it is, it is the most commercially successful footnote in modern publishing.",
      ],
    },
    {
      heading: "Giger's namesake",
      body: [
        "The same year, the Swiss painter H. R. Giger published a monograph of his airbrush work and borrowed the title for it. That book is real, and it is an art collection rather than a grimoire — worth saying, because searching the name will hand you all three things at once with nothing to tell them apart.",
        "Ridley Scott saw it and hired the man who painted it. The creature in Alien came out of those pages. A fictional book lent its name to a real one, which produced a film that made the name famous enough to sell more copies of the fiction.",
      ],
    },
    {
      heading: "The verdict",
      body: [
        "Reviewed as an occult text, the Necronomicon fails on the first requirement, which is existing. Reviewed as fiction, the passages Lovecraft actually wrote are thin — a few lines of invented couplet and a great deal of implication.",
        "Reviewed as what it is, it is superb, and it belongs in a codex of esoterica precisely because it is not one of the texts. It is the clearest demonstration available of how an invented provenance becomes an inherited one: how a citation becomes a catalogue card, a catalogue card becomes a request slip, and a request slip becomes a book on a shelf with the title printed on the spine.",
        "Everything else in this library asks to be taken on the strength of its sources. Start here, with the one where you can watch the sources being made.",
      ],
    },
  ],
  seeAlso: [
    { label: "Sacred Texts", href: "/sacred-texts" },
    { label: "Esotericism", href: "/esotericism" },
  ],
};

/** Newest first — the order the archive is listed in. */
export const REVIEWS: Review[] = [necronomicon];

export const reviewBySlug = (slug: string): Review | undefined =>
  REVIEWS.find((r) => r.slug === slug);

/** The book currently being reviewed. */
export const currentReview = (): Review => REVIEWS[0];
