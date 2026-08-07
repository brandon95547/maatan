// content/sacred-texts.ts
// The first real content in the codex.
//
// Sacred Texts went first deliberately: it is the most factually anchored topic
// in the outline, so the writing can be judged against something. Dates are
// hedged where scholarship hedges — `dateNote` carries "c. 100–300 CE" while
// `startYear` carries the number the timeline needs. Where a date is genuinely
// contested the note says so rather than picking a side quietly.
//
// The figures and traditions here are not padding: a relationship needs both
// ends to exist, and a text with nothing to connect to is exactly the isolated
// document this site exists to stop producing. They live under their own topics
// and will be filled out when those topics are written.

import type { SeedBundle } from "./types";

const texts: SeedBundle["entities"] = [
  {
    slug: "corpus-hermeticum",
    kind: "text",
    topic: "sacred-texts",
    title: "Corpus Hermeticum",
    summary:
      "Seventeen Greek dialogues on mind, cosmos and the divine, attributed to Hermes Trismegistus and composed in Roman Egypt.",
    startYear: 100,
    endYear: 300,
    dateNote: "c. 100–300 CE",
    featured: true,
    meta: { language: "Koine Greek", form: "Philosophical dialogue", treatises: 17 },
    body: `The *Corpus Hermeticum* is not one book but a gathered set of dialogues, written in Greek in Roman Egypt and attributed to Hermes Trismegistus — a figure who was never a single person. In them a teacher instructs a pupil on the origin of the cosmos, the descent of mind into matter, and the return upward.

The most famous is the first, the *Poimandres*, in which the narrator receives a vision of the creation and of Man's fall into nature by his own reflection. The dialogues are not systematic and do not entirely agree with each other, which is itself a clue to their origin: they are a tradition's worth of writing, not an author's.

## Why it mattered twice

The text was lost to the Latin West for a thousand years. When a manuscript reached Florence in 1460, Cosimo de' Medici reportedly had Marsilio Ficino set aside his Plato to translate it first — because it was believed to be older than Moses, and therefore to be the original revelation from which Greek philosophy had descended.

That belief was wrong. In 1614 Isaac Casaubon showed on linguistic grounds that the dialogues were composed in the early centuries CE, not in remote Egyptian antiquity. The correction demolished the text's authority as primeval scripture — and did nothing at all to reduce its influence, which by then was two centuries deep in European thought.`,
  },
  {
    slug: "emerald-tablet",
    kind: "text",
    topic: "sacred-texts",
    title: "The Emerald Tablet",
    summary:
      "A few lines of cryptic Hermetic instruction, the source of the phrase 'as above, so below', and the most quoted text in alchemy.",
    startYear: 700,
    endYear: 900,
    dateNote: "earliest known source c. 8th–9th century CE, in Arabic",
    featured: true,
    meta: { language: "Arabic, later Latin", length: "Around a dozen lines" },
    body: `Almost nothing in Western esotericism has been quoted more, or is shorter. The *Emerald Tablet* runs to about a dozen lines and states, in the form of a revelation, that the structure of the higher world and the lower world are the same.

Its earliest known appearance is in Arabic, in works of the 8th and 9th centuries CE. The Latin translations that reached Europe carried the line that made it famous: *quod est superius est sicut quod est inferius* — that which is above is as that which is below.

## What it is actually saying

Read as alchemy, it describes an operation: a thing separated from its grossness, raised, brought down again, and returned with power gathered on the way. Read as philosophy, it says that a single pattern runs through every level of reality, and that whoever grasps the pattern at one level has grasped it at all of them.

The tablet never resolves which reading is correct — and the refusal is the point. Its compactness is what let it survive being copied across languages for a millennium, and what left room for every subsequent tradition to find its own doctrine in it.`,
  },
  {
    slug: "the-kybalion",
    kind: "text",
    topic: "sacred-texts",
    title: "The Kybalion",
    summary:
      "A 1908 American summary of seven 'Hermetic principles', published anonymously by the Three Initiates — modern, and open about being a distillation.",
    startYear: 1908,
    dateNote: "1908, Chicago",
    featured: true,
    meta: { language: "English", principles: 7, authorship: "Anonymous — 'Three Initiates'" },
    body: `*The Kybalion* was published in Chicago in 1908 by three authors who gave no names. It presents seven principles it calls Hermetic: mentalism, correspondence, vibration, polarity, rhythm, cause and effect, and gender.

It is the most widely read Hermetic text in English, and it is important to be clear about what it is. It is not an ancient document. It does not translate the *Corpus Hermeticum*. It is an early twentieth-century systematisation, written in the plain, confident register of New Thought — the American movement it actually belongs to — and it presents its seven principles with a tidiness the ancient material never had.

## Read as what it is

That does not make it worthless; it makes it a different kind of source. As a distillation it is unusually clear, and the principle of correspondence in particular — as above, so below — is stated more usably here than in the *Emerald Tablet* it descends from.

Authorship is generally attributed to William Walker Atkinson, a prolific New Thought writer, though the attribution rests on stylistic and circumstantial evidence rather than any admission.`,
  },
  {
    slug: "book-of-enoch",
    kind: "text",
    topic: "sacred-texts",
    title: "The Book of Enoch",
    summary:
      "An apocalyptic work of watchers, fallen angels and cosmic judgement, excluded from most canons and preserved complete only in Ge'ez.",
    startYear: -300,
    endYear: -100,
    dateNote: "sections composed c. 300–100 BCE",
    meta: { language: "Ge'ez (complete); Aramaic and Greek fragments", sections: 5 },
    body: `*1 Enoch* is a composite of five works, written across two centuries before the common era and attributed to the patriarch who "walked with God and was not". Its best-known section, the Book of the Watchers, tells of angels who descended, took human wives, and taught humanity metallurgy, cosmetics, sorcery and astrology — knowledge presented as genuinely powerful and genuinely illicit.

## Lost, and not lost

The book was excluded from the Jewish and most Christian canons and disappeared from Western view. It survived complete only in Ge'ez, in the canon of the Ethiopian Orthodox Church, and returned to Europe in the eighteenth century when James Bruce brought manuscripts back from Ethiopia.

Aramaic fragments later found among the Dead Sea Scrolls confirmed the antiquity of the text and settled that it had circulated widely in Second Temple Judaism. Its influence is visible in the New Testament — the Epistle of Jude quotes it directly — which is a considerable afterlife for a book almost everyone decided to leave out.`,
  },
  {
    slug: "nag-hammadi-library",
    kind: "text",
    topic: "sacred-texts",
    title: "The Nag Hammadi Library",
    summary:
      "Thirteen codices of Gnostic writing buried in Upper Egypt in the fourth century and found by accident in 1945 — the tradition in its own words at last.",
    startYear: 350,
    dateNote: "buried c. 350–400 CE; texts composed earlier",
    meta: { language: "Coptic, translated from Greek", codices: 13, discovered: 1945 },
    body: `In December 1945, near the town of Nag Hammadi in Upper Egypt, a farmer digging for fertiliser broke open a sealed jar containing thirteen leather-bound codices. They held more than fifty texts in Coptic, most of them previously known only as titles quoted by the Church Fathers who were denouncing them.

## Why the find mattered

Before 1945, almost everything known about Gnosticism came from its opponents. Irenaeus, Hippolytus and Epiphanius described these beliefs in order to refute them, and scholarship had little choice but to reconstruct the tradition from hostile summaries.

The Nag Hammadi codices ended that. The *Gospel of Thomas* — a sayings gospel with no narrative and no passion — the *Gospel of Philip*, the *Apocryphon of John*, and the *Gospel of Truth* let the tradition speak for itself. What emerged was less a single heresy than a family of positions sharing a conviction: that the material world is the work of a lesser power, and that liberation comes through knowledge rather than belief.`,
  },
  {
    slug: "zohar",
    kind: "text",
    topic: "sacred-texts",
    title: "The Zohar",
    summary:
      "The central work of Kabbalah — a mystical commentary on the Torah in Aramaic, presented as ancient and published in thirteenth-century Spain.",
    startYear: 1280,
    dateNote: "published c. 1280s in Castile; sets itself in the 2nd century",
    meta: { language: "Aramaic", form: "Mystical commentary on the Torah" },
    body: `The *Zohar* — "Splendour" — is the foundational book of Kabbalah. It reads as a commentary on the Torah, following the weekly portions, but what it produces is a full account of the divine: the ten *sefirot* through which the infinite becomes manifest, and the correspondences binding every verse of scripture to that structure.

## The question of its age

The text presents itself as the teaching of Rabbi Shimon bar Yochai in the second century, transmitted in secret. It appeared in Castile in the 1280s, circulated by Moses de León.

Scholarship, following Gershom Scholem, holds that de León wrote it — the Aramaic is of a kind not otherwise attested, and the concerns are those of thirteenth-century Spain. That conclusion is contested within traditional Judaism, where the older attribution is maintained.

Either way the *Zohar* became the third pillar of Jewish sacred literature after the Bible and the Talmud, and the channel through which Kabbalistic ideas entered Christian and hermetic thought in the Renaissance.`,
  },
  {
    slug: "dead-sea-scrolls",
    kind: "text",
    topic: "sacred-texts",
    title: "The Dead Sea Scrolls",
    summary:
      "Roughly nine hundred manuscripts hidden in the caves at Qumran — the oldest surviving biblical texts, a thousand years older than anything previously known.",
    startYear: -250,
    endYear: 68,
    dateNote: "c. 250 BCE – 68 CE; found 1947–1956",
    meta: { language: "Hebrew, Aramaic, Greek", manuscripts: "~900", discovered: "1947–1956" },
    body: `Between 1947 and 1956, some nine hundred manuscripts were recovered from eleven caves above the Dead Sea at Qumran. They include copies of every book of the Hebrew Bible except Esther, together with commentaries, hymns, and the rules of the community that kept them.

## What they settled

Before Qumran, the oldest complete Hebrew Bible manuscripts dated to around 1000 CE. The scrolls pushed that back by a millennium — and the degree of agreement between the Qumran texts and the later Masoretic tradition was itself the finding: transmission had been far more careful than anyone could previously demonstrate.

They also showed the variety of Second Temple Judaism. The community's own writings — the *Community Rule*, the *War Scroll* — describe a sect with its own calendar, its own priesthood and an apocalyptic expectation, alongside copies of *1 Enoch* and *Jubilees* that circulated widely without ever entering the canon.`,
  },
  {
    slug: "bible",
    kind: "text",
    topic: "sacred-texts",
    title: "The Bible",
    summary:
      "A library rather than a book — Hebrew scripture and early Christian writing, assembled over more than a millennium and canonised by argument.",
    startYear: -1200,
    endYear: 400,
    dateNote: "composed c. 1200 BCE – 100 CE; canons fixed later and differ",
    meta: { language: "Hebrew, Aramaic, Koine Greek", form: "Anthology" },
    body: `The Bible is an anthology, not a work. Its Hebrew portion gathers law, chronicle, prophecy, poetry and wisdom composed across centuries; the Christian portion adds gospels, letters and an apocalypse from the first century CE.

## Canon as a process

There is no single moment at which the contents were settled, and no single list. The Jewish, Catholic, Orthodox and Protestant canons differ from one another, and the differences are the residue of long arguments about authority — which books were read in which communities, and which were finally allowed to be decisive.

For the study of esotericism the Bible matters twice over: as the text whose interpretation produced Kabbalah, Christian mysticism and Gnosticism alike, and as the standard against which every one of those traditions was measured and usually found wanting.`,
  },
  {
    slug: "torah",
    kind: "text",
    topic: "sacred-texts",
    title: "The Torah",
    summary:
      "The five books of Moses — the legal and narrative foundation of Judaism, and the text Kabbalah reads as an encoded account of the divine.",
    startYear: -1200,
    endYear: -400,
    dateNote: "compiled c. 1200–400 BCE",
    meta: { language: "Biblical Hebrew", books: 5 },
    body: `The Torah is the first five books — Genesis, Exodus, Leviticus, Numbers, Deuteronomy — holding the creation narrative, the covenant, the exodus and the law.

## Read twice

In Jewish practice it is read publicly on an annual cycle, and its commandments are the basis of *halakha*. That is the plain reading.

Kabbalah reads it a second way. On that account the Torah is not only a record but an encoding: its letters, their numerical values and even the spaces between them describe the structure of the divine, and the narrative surface is the outermost of several layers. The *Zohar* is the great monument of that reading, and the conviction beneath it — that scripture is denser than it appears — is what connects Jewish mysticism to hermetic and Gnostic interpretation elsewhere.`,
  },
  {
    slug: "quran",
    kind: "text",
    topic: "sacred-texts",
    title: "The Quran",
    summary:
      "The scripture of Islam, received across roughly two decades in the seventh century, and the ground from which Sufi mysticism reads inward.",
    startYear: 610,
    endYear: 632,
    dateNote: "revealed 610–632 CE; standard codex compiled shortly after",
    meta: { language: "Classical Arabic", chapters: 114 },
    body: `The Quran is held in Islam to be the direct speech of God, received by Muhammad between 610 and 632 CE and compiled into a standard codex within a generation. It runs to 114 suras, ordered by length rather than chronology.

## The inward reading

Sufism does not set the plain sense aside but reads beneath it. The distinction between *zahir* and *batin* — the outward and the inward — holds that the revelation carries meaning at more than one depth, and that the inner sense opens through practice and purification rather than through study alone.

That claim placed Sufi interpreters in recurring tension with jurists, and produced some of the most demanding mystical literature in any tradition.`,
  },
  {
    slug: "tao-te-ching",
    kind: "text",
    topic: "sacred-texts",
    title: "Tao Te Ching",
    summary:
      "Eighty-one short chapters on the way that cannot be named — the foundational text of Taoism, and among the most translated books in the world.",
    startYear: -400,
    dateNote: "c. 4th century BCE; traditionally ascribed to the 6th",
    meta: { language: "Classical Chinese", chapters: 81 },
    body: `The *Tao Te Ching* is eighty-one brief chapters, in verse and aphorism, on the Tao — the way — and on *te*, its power in action. Tradition ascribes it to Laozi, an older contemporary of Confucius; the text as we have it is generally dated to the fourth century BCE and may be a compilation.

Its first line refuses the whole enterprise it is beginning: the way that can be spoken is not the constant way. What follows is a sustained argument for yielding over forcing, emptiness over accumulation, and *wu wei* — action that does not strain against the grain of things.

Manuscripts recovered at Mawangdui in 1973 and Guodian in 1993 are substantially older than any previously known, and show the text circulating in different arrangements before it settled.`,
  },
  {
    slug: "bhagavad-gita",
    kind: "text",
    topic: "sacred-texts",
    title: "Bhagavad Gita",
    summary:
      "Seven hundred verses set on a battlefield, in which Krishna answers a warrior's refusal to fight with an account of duty, action and the self.",
    startYear: -200,
    endYear: 200,
    dateNote: "c. 200 BCE – 200 CE, within the Mahabharata",
    meta: { language: "Sanskrit", verses: 700, chapters: 18 },
    body: `The *Gita* sits inside the *Mahabharata*. Arjuna, facing kin across a battlefield, puts down his bow; Krishna, his charioteer, answers — and the answer becomes an eighteen-chapter synthesis of Indian religious thought.

It holds together paths usually treated separately: *karma yoga*, action performed without attachment to its fruit; *jnana yoga*, liberating knowledge; and *bhakti yoga*, devotion. Its resolution is not that Arjuna should want to fight, but that right action is done because it is his, and released.

Its reach outside India has been unusual — Emerson, Thoreau, Gandhi and Oppenheimer all read it, and it remains the most widely translated Hindu text.`,
  },
  {
    slug: "upanishads",
    kind: "text",
    topic: "sacred-texts",
    title: "The Upanishads",
    summary:
      "The speculative close of the Vedas — dialogues asking what underlies the self and the cosmos, and answering that they are one.",
    startYear: -800,
    endYear: -200,
    dateNote: "principal Upanishads c. 800–200 BCE",
    meta: { language: "Sanskrit", principal: 13 },
    body: `The Upanishads are the concluding portion of the Vedic corpus — *Vedanta*, the end of the Veda — and they mark a turn from ritual to enquiry. In place of instructions for sacrifice there are dialogues: between teacher and student, husband and wife, king and sage.

Their recurring question is what underlies appearance, and their most famous answer collapses the distance between the seeker and the sought. *Tat tvam asi* — that thou art. *Atman*, the self, and *Brahman*, the ground of everything, are not two.

Thirteen are generally counted principal. Their influence runs through every later school of Indian philosophy, and through Schopenhauer into European thought.`,
  },
  {
    slug: "dhammapada",
    kind: "text",
    topic: "sacred-texts",
    title: "Dhammapada",
    summary:
      "Four hundred and twenty-three verses of the Buddha's teaching in its most compact form — ethics without metaphysics.",
    startYear: -300,
    dateNote: "compiled c. 3rd century BCE",
    meta: { language: "Pali", verses: 423, chapters: 26 },
    body: `The *Dhammapada* — "verses of the teaching" — gathers 423 short verses into twenty-six chapters, and is the most widely read text of the Pali canon. It opens by locating everything in the mind: what we are follows from what we have thought.

There is almost no metaphysics in it. What it offers is conduct — restraint, attention, the futility of hatred answered with hatred — in a form built to be memorised. That compression is why it travelled: it is the part of the canon that can be carried without the rest.`,
  },
];

// The other ends of the relationships. Sparse on purpose: each is a real entity
// under its own topic, written properly when that topic is filled in, and here
// only so a connection has somewhere to land.
const connected: SeedBundle["entities"] = [
  {
    slug: "hermes-trismegistus",
    kind: "figure",
    topic: "figures",
    title: "Hermes Trismegistus",
    summary:
      "The thrice-great — a fusion of the Egyptian Thoth and the Greek Hermes, treated for centuries as a historical sage and the author of the Hermetic corpus.",
    dateNote: "legendary; the corpus attributed to him is c. 100–300 CE",
    meta: { identifiedWith: "Thoth, Hermes" },
    body: `Hermes Trismegistus is not a person who lived. He is a figure produced by the meeting of Egyptian and Greek religion in Hellenistic Alexandria, where Thoth — god of writing, measure and magic — was identified with Hermes, and given the epithet *trismegistos*, thrice-great.

For most of European history he was nonetheless read as historical: an Egyptian sage, contemporary with or older than Moses, whose writings preserved a revelation older than Greek philosophy. That belief is what gave the Hermetic texts their extraordinary standing in the Renaissance, and Casaubon's 1614 redating is what removed it.`,
  },
  {
    slug: "moses-de-leon",
    kind: "figure",
    topic: "figures",
    title: "Moses de León",
    summary:
      "The Castilian kabbalist who circulated the Zohar in the 1280s, and whom scholarship regards as its author.",
    startYear: 1240,
    endYear: 1305,
    dateNote: "c. 1240–1305",
    body: `Moses de León was a Jewish mystic in Castile who from the 1280s circulated the manuscripts that became the *Zohar*, presenting them as the recovered teaching of the second-century Rabbi Shimon bar Yochai.

Modern scholarship, following Gershom Scholem, holds that he composed the work himself. The Aramaic is of a kind not attested elsewhere and appears to be constructed; the intellectual concerns are those of his own century. Traditional Kabbalah maintains the older attribution.`,
  },
  {
    slug: "marsilio-ficino",
    kind: "figure",
    topic: "figures",
    title: "Marsilio Ficino",
    summary:
      "The Florentine who translated the Corpus Hermeticum into Latin in 1463, ahead of Plato, and so opened Hermeticism to the Renaissance.",
    startYear: 1433,
    endYear: 1499,
    dateNote: "1433–1499",
    body: `Ficino was the scholar at the centre of Cosimo de' Medici's Florentine academy and the translator who gave Latin Europe both Plato and the Hermetic corpus.

The order in which he did it is the memorable part: when a Greek manuscript of the *Corpus Hermeticum* reached Florence in 1460, Cosimo had him set the Plato aside and translate the Hermetica first — because it was believed to be the older revelation. That decision put Hermeticism at the centre of Renaissance thought for a century and a half.`,
  },
  {
    slug: "hermeticism",
    kind: "tradition",
    topic: "traditions",
    title: "Hermeticism",
    summary:
      "The tradition descending from the Hermetic writings — correspondence between the levels of reality, and the ascent of the mind through them.",
    startYear: 100,
    dateNote: "textual corpus c. 100–300 CE; revived from 1460",
    body: `Hermeticism takes its name and its authority from the writings attributed to Hermes Trismegistus. Its central claim is correspondence: that the same pattern is repeated at every level of reality, so that the cosmos, the state and the person are legible through one another.

It has had two lives. The first was in Roman Egypt, where the texts were written. The second began in 1460, when the corpus reached Florence and was read as the oldest theology in the world — a misdating that placed Hermeticism at the heart of Renaissance philosophy, alchemy and magic, and whose effects long outlived its correction.`,
  },
  {
    slug: "kabbalah",
    kind: "tradition",
    topic: "traditions",
    title: "Kabbalah",
    summary:
      "Jewish mystical tradition — the ten sefirot, the hidden structure of the Torah, and the reading of scripture as an encoding of the divine.",
    startYear: 1100,
    dateNote: "as a distinct tradition, from c. 12th century",
    body: `Kabbalah is the mystical current of Judaism, emerging as a distinct tradition in twelfth-century Provence and thirteenth-century Spain, though it draws on much older material.

Its structuring idea is the ten *sefirot*: emanations through which the infinite and unknowable *Ein Sof* becomes the manifest world, arranged as a tree whose paths are the relations between them. Read against the Torah, the scheme turns scripture into a map of the divine.

The *Zohar* is its central text. From the Renaissance onward the system was taken up by Christian scholars, and through them entered hermetic and occult thought, where it remains one of the load-bearing structures.`,
  },
  {
    slug: "gnosticism",
    kind: "tradition",
    topic: "traditions",
    title: "Gnosticism",
    summary:
      "A family of late-antique movements holding that the material world is the work of a lesser power, and that liberation comes through knowledge.",
    startYear: 100,
    endYear: 400,
    dateNote: "flourished c. 100–400 CE",
    body: `Gnosticism is less a single religion than a family of positions in the first centuries CE, sharing a conviction: the material world is not the work of the highest God but of a lesser and often ignorant power, and what liberates is *gnosis* — direct knowledge — rather than faith or observance.

For most of history it was known only through the writings of its opponents. The Nag Hammadi discovery of 1945 changed that, and the tradition has been read in its own words ever since.`,
  },
  {
    slug: "alchemy",
    kind: "tradition",
    topic: "traditions",
    title: "Alchemy",
    summary:
      "The art of transformation — of metals, and of the practitioner — and the tradition that carried the Emerald Tablet as its founding statement.",
    startYear: 300,
    dateNote: "Greco-Egyptian from c. 300 CE; Arabic and Latin traditions follow",
    body: `Alchemy is usually reduced to the attempt to make gold, which is a little like reducing astronomy to navigation. The transmutation of metals was real work, pursued with real apparatus, and it was also from early on understood as a figure for the transformation of the practitioner.

Its founding statement is the *Emerald Tablet*, and the doctrine it takes from it is correspondence: because the same pattern runs above and below, an operation performed on matter is performed on the operator.

The tradition runs from Greco-Egyptian Alexandria through the Arabic world — where much of its technique and vocabulary was developed — into Latin Europe, and its laboratory practice is a direct ancestor of chemistry.`,
  },
  {
    slug: "as-above-so-below",
    kind: "concept",
    topic: "esotericism",
    title: "As Above, So Below",
    summary:
      "The principle of correspondence: that the same pattern is repeated at every level of reality, so each level can be read through another.",
    dateNote: "from the Emerald Tablet, c. 8th–9th century CE",
    featured: true,
    body: `The phrase comes from the *Emerald Tablet*: that which is above is as that which is below. As a principle it claims that reality is structured in repeating patterns, so that the cosmos, the natural world and the human person echo one another.

Everything downstream depends on it. Astrology requires it — planets can only signify if the pattern above is repeated below. Alchemy requires it, which is what makes an operation on metal an operation on the operator. Kabbalah's reading of scripture requires it, and so does the whole doctrine of signatures in Renaissance medicine.

It is stated most compactly in the *Emerald Tablet* and most usably in *The Kybalion*, which makes it the second of its seven principles.`,
  },
];

const relations: SeedBundle["relations"] = [
  // Hermetica
  { from: "hermes-trismegistus", to: "corpus-hermeticum", type: "authored", note: "attributed; the corpus is a tradition's work, not one author's", weight: 10 },
  { from: "hermes-trismegistus", to: "emerald-tablet", type: "authored", note: "attributed", weight: 9 },
  { from: "corpus-hermeticum", to: "hermeticism", type: "originates_in", weight: 8 },
  { from: "emerald-tablet", to: "as-above-so-below", type: "describes", note: "the source of the phrase", weight: 10 },
  { from: "the-kybalion", to: "as-above-so-below", type: "describes", note: "as the second of its seven principles", weight: 8 },
  { from: "the-kybalion", to: "emerald-tablet", type: "derives_from", note: "restates the principle of correspondence in modern terms", weight: 7 },
  { from: "the-kybalion", to: "hermeticism", type: "derives_from", note: "claims the lineage; belongs to New Thought", weight: 6 },
  { from: "emerald-tablet", to: "alchemy", type: "describes", note: "read as the founding statement of the art", weight: 9 },
  { from: "marsilio-ficino", to: "corpus-hermeticum", type: "translated", note: "into Latin in 1463, ahead of his Plato", weight: 9 },
  { from: "corpus-hermeticum", to: "as-above-so-below", type: "describes", weight: 5 },

  // Jewish mysticism
  { from: "moses-de-leon", to: "zohar", type: "authored", note: "per Scholem; the text claims 2nd-century authorship", weight: 10 },
  { from: "zohar", to: "kabbalah", type: "originates_in", note: "its central text", weight: 9 },
  { from: "zohar", to: "torah", type: "commentary_on", note: "mystical commentary following the weekly portions", weight: 9 },
  { from: "kabbalah", to: "torah", type: "describes", note: "reads it as an encoding of the divine structure", weight: 7 },
  { from: "torah", to: "bible", type: "derives_from", note: "its first five books", weight: 8 },

  // Second Temple and Gnostic
  { from: "dead-sea-scrolls", to: "book-of-enoch", type: "describes", note: "Aramaic fragments among them confirmed its antiquity", weight: 8 },
  { from: "dead-sea-scrolls", to: "bible", type: "related_to", note: "the oldest surviving witnesses to the Hebrew text", weight: 7 },
  { from: "nag-hammadi-library", to: "gnosticism", type: "originates_in", note: "the tradition in its own words rather than its opponents'", weight: 10 },
  { from: "book-of-enoch", to: "bible", type: "influenced", note: "quoted directly in the Epistle of Jude", weight: 6 },

  // Eastern
  { from: "bhagavad-gita", to: "upanishads", type: "derives_from", note: "synthesises their paths into one teaching", weight: 7 },
  { from: "upanishads", to: "as-above-so-below", type: "related_to", note: "arrives at the same identity by another route", weight: 4 },

  // Traditions to figures
  { from: "hermeticism", to: "alchemy", type: "influenced", weight: 7 },
  { from: "hermeticism", to: "kabbalah", type: "influenced", note: "by way of Renaissance Christian Kabbalah", weight: 5 },
  { from: "marsilio-ficino", to: "hermeticism", type: "influenced", note: "his translation put it at the centre of Renaissance thought", weight: 8 },
];

export const sacredTexts: SeedBundle = {
  entities: [...texts, ...connected],
  relations,
};
