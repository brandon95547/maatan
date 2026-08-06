"use client";

import { useState } from "react";

const paths = [
  { icon: "◈", title: "Arcane Texts", text: "Grimoires, rare manuscripts, and works preserved beyond the accepted canon.", meta: "84 VOLUMES" },
  { icon: "⌬", title: "Sacred Sciences", text: "Alchemy, astrology, sacred mathematics, and the architecture of invisible order.", meta: "61 VOLUMES" },
  { icon: "◇", title: "Hidden Histories", text: "Suppressed accounts, mystery traditions, and the ideas that moved beneath history.", meta: "112 VOLUMES" },
];

const volumes = [
  { numeral: "I", title: "Corpus Hermeticum", tradition: "HERMETIC PHILOSOPHY", tone: "from-[#332514] to-[#090806]" },
  { numeral: "II", title: "The Sacred Magic", tradition: "CEREMONIAL TRADITION", tone: "from-[#24151c] to-[#080608]" },
  { numeral: "III", title: "The Secret Doctrine", tradition: "ESOTERIC COSMOLOGY", tone: "from-[#131d29] to-[#060709]" },
];

function Geometry() {
  return (
    <div className="geometry" aria-hidden="true">
      <div className="geo-orbit geo-orbit-1" />
      <div className="geo-orbit geo-orbit-2" />
      <div className="geo-orbit geo-orbit-3" />
      <div className="geo-diamond" />
      <div className="geo-diamond geo-diamond-2" />
      <div className="geo-center"><span>✦</span></div>
      {Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ transform: `rotate(${i * 30}deg)` }} />)}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-[#060606] text-[#e9e2d3] selection:bg-[#b59655] selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#b59655]/20 bg-black/70 px-6 backdrop-blur-xl lg:px-12">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between">
          <a href="#top" className="font-display text-2xl tracking-[.24em] text-[#d2b574]">MAATAN</a>
          <nav className="hidden items-center gap-10 text-[10px] font-medium tracking-[.28em] text-stone-300 md:flex">
            <a className="transition hover:text-[#d2b574]" href="#library">LIBRARY</a>
            <a className="transition hover:text-[#d2b574]" href="#paths">TRADITIONS</a>
            <a className="transition hover:text-[#d2b574]" href="#journal">JOURNAL</a>
            <a className="transition hover:text-[#d2b574]" href="#about">ABOUT</a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-[#b59655]/30 text-[#d2b574] md:hidden" aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button>
          <a href="#library" className="hidden border border-[#b59655]/40 px-5 py-3 text-[9px] tracking-[.22em] text-[#d2b574] transition hover:bg-[#b59655] hover:text-black md:block">ENTER THE ARCHIVE</a>
        </div>
        {menuOpen && <nav className="flex flex-col gap-6 border-t border-[#b59655]/20 py-6 text-center text-[10px] tracking-[.25em] md:hidden"><a href="#library">LIBRARY</a><a href="#paths">TRADITIONS</a><a href="#journal">JOURNAL</a><a href="#about">ABOUT</a></nav>}
      </header>

      <section id="top" className="gothic-hero relative flex min-h-[900px] items-center pt-20">
        <div className="absolute inset-y-20 right-[5%] hidden w-[55%] lg:block">
          <div className="gothic-arch absolute inset-x-[8%] inset-y-[4%]" />
          <Geometry />
          <div className="altar absolute bottom-[10%] left-1/2 h-24 w-[62%] -translate-x-1/2 border-x border-t border-[#b59655]/25 bg-gradient-to-b from-[#17140f] to-black shadow-[0_-30px_80px_rgba(181,150,85,.07)]" />
          <div className="grimoire absolute bottom-[17%] left-1/2 z-10 h-[130px] w-[230px] -translate-x-1/2 -rotate-1 rounded-sm border border-[#c5a765]/55 bg-gradient-to-br from-[#201d18] to-[#070707] shadow-[0_25px_65px_#000] before:absolute before:inset-3 before:border before:border-[#b59655]/30 after:absolute after:left-1/2 after:top-1/2 after:h-12 after:w-12 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:border after:border-[#d1b36d]/50" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
          <div className="max-w-[700px] lg:w-[49%]">
            <p className="mb-7 text-[10px] font-semibold tracking-[.42em] text-[#c5a765]">THE INNER SANCTUM</p>
            <h1 className="font-display text-[clamp(58px,6.5vw,104px)] leading-[.9] tracking-[-.045em] text-[#f0eadf]">Beyond the veil,<br/><em className="not-italic text-[#c9aa68]">truth remains.</em></h1>
            <div className="my-9 flex items-center gap-3"><span className="h-px w-32 bg-gradient-to-r from-[#c5a765] to-transparent"/><span className="text-[#c5a765]">◇</span></div>
            <p className="max-w-[555px] text-sm leading-8 text-stone-400">Enter a private archive of forbidden texts, ancient systems, and knowledge preserved outside the margins of history.</p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <a className="ornate-button px-7 py-5 text-[9px] font-semibold tracking-[.25em]" href="#library">ENTER THE SANCTUM <span className="ml-5">→</span></a>
              <a className="border-b border-[#b59655]/40 pb-2 text-[9px] tracking-[.24em] text-stone-300" href="#paths">BROWSE THE LIBRARY <span className="ml-4 text-[#c5a765]">→</span></a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-24 w-px bg-gradient-to-b from-[#b59655] to-transparent" />
      </section>

      <section id="paths" className="relative border-y border-[#b59655]/20 bg-[#090909] px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 text-center"><p className="text-[9px] tracking-[.4em] text-[#b59655]">CHOOSE YOUR STUDY</p><h2 className="font-display mt-4 text-5xl md:text-7xl">Paths of <em className="text-[#c9aa68]">initiation</em></h2></div>
          <div className="grid border border-[#b59655]/25 md:grid-cols-3">
            {paths.map((path, i) => <article key={path.title} className="group relative min-h-[390px] border-b border-[#b59655]/25 p-8 transition duration-500 hover:bg-[#b59655]/[.06] md:border-b-0 md:border-r last:border-0 lg:p-11">
              <span className="absolute right-7 top-7 text-[8px] tracking-widest text-stone-600">0{i+1}</span>
              <div className="sacred-icon mb-10 grid h-20 w-20 place-items-center text-3xl text-[#c9aa68]">{path.icon}</div>
              <h3 className="font-display text-3xl">{path.title}</h3><p className="mt-5 max-w-sm text-xs leading-7 text-stone-500">{path.text}</p>
              <div className="absolute inset-x-8 bottom-8 flex items-center justify-between border-t border-[#b59655]/20 pt-5 text-[8px] tracking-[.22em] text-stone-600 lg:inset-x-11"><span>{path.meta}</span><span className="text-base text-[#c9aa68] transition group-hover:translate-x-1">→</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] items-center gap-16 lg:grid-cols-2 lg:gap-28">
          <div className="relative mx-auto aspect-square w-full max-w-[520px] border border-[#b59655]/20 bg-[radial-gradient(circle,rgba(181,150,85,.11),transparent_62%)]"><Geometry /></div>
          <div><p className="text-[9px] tracking-[.4em] text-[#b59655]">THE MAATAN PRINCIPLE</p><h2 className="font-display mt-5 text-5xl leading-none md:text-7xl">Knowledge is a<br/><em className="text-[#c9aa68]">sacred inheritance.</em></h2><p className="mt-8 max-w-xl text-sm leading-8 text-stone-400">Across centuries, fragments of understanding survived in coded manuscripts, initiatory traditions, and books kept beyond public view. Maatan gathers those fragments into a considered archive—without sensationalism, without fear, and without surrendering discernment.</p><a href="#journal" className="mt-9 inline-block border-b border-[#b59655]/40 pb-2 text-[9px] tracking-[.24em]">OUR PHILOSOPHY <span className="ml-4 text-[#c9aa68]">→</span></a></div>
        </div>
      </section>

      <section id="library" className="bg-[#0b0a09] px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]"><div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[9px] tracking-[.4em] text-[#b59655]">SELECTED FROM THE VAULT</p><h2 className="font-display mt-4 text-5xl md:text-7xl">Essential <em className="text-[#c9aa68]">volumes</em></h2></div><a href="#" className="text-[9px] tracking-[.22em] text-[#c9aa68]">VIEW COMPLETE LIBRARY →</a></div>
          <div className="grid gap-12 md:grid-cols-3">{volumes.map((v) => <article key={v.title} className="group"><div className={`relative aspect-[.72] max-h-[570px] overflow-hidden border border-[#b59655]/35 bg-gradient-to-br ${v.tone} p-7 shadow-2xl transition duration-500 group-hover:-translate-y-2`}><div className="absolute inset-4 border border-[#b59655]/20"/><span className="relative text-[9px] tracking-[.25em] text-[#b59655]">VOLUME {v.numeral}</span><div className="absolute inset-0 grid place-items-center"><div className="sacred-icon grid h-36 w-36 place-items-center text-5xl text-[#c9aa68]">✦</div></div><div className="absolute bottom-8 left-8 right-8"><small className="text-[7px] tracking-[.3em] text-[#b59655]">THE MAATAN ARCHIVE</small><h3 className="font-display mt-3 text-3xl">{v.title}</h3></div></div><p className="mt-6 text-[8px] tracking-[.25em] text-[#b59655]">{v.tradition}</p><h3 className="font-display mt-2 text-2xl">{v.title}</h3></article>)}</div>
        </div>
      </section>

      <section id="journal" className="relative px-6 py-28 text-center lg:px-12 lg:py-36"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,150,85,.09),transparent_48%)]"/><div className="relative mx-auto max-w-3xl"><span className="text-5xl text-[#b59655]">✦</span><p className="mt-8 text-[9px] tracking-[.4em] text-[#b59655]">PRIVATE CORRESPONDENCE</p><h2 className="font-display mt-5 text-5xl md:text-7xl">Receive word from<br/><em className="text-[#c9aa68]">within the archive.</em></h2><p className="mx-auto mt-7 max-w-xl text-xs leading-7 text-stone-500">New texts, investigations, and rare discoveries—delivered deliberately, never excessively.</p><form className="mx-auto mt-10 flex max-w-xl flex-col border-b border-[#b59655]/60 sm:flex-row"><input type="email" placeholder="YOUR EMAIL ADDRESS" aria-label="Email address" className="flex-1 bg-transparent px-2 py-5 text-[9px] tracking-[.2em] outline-none placeholder:text-stone-600"/><button className="px-3 py-5 text-[9px] tracking-[.22em] text-[#c9aa68]">JOIN THE CIRCLE →</button></form></div></section>

      <footer className="border-t border-[#b59655]/20 px-6 py-10 lg:px-12"><div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 text-center md:flex-row"><span className="font-display text-xl tracking-[.24em] text-[#d2b574]">MAATAN</span><p className="text-[8px] tracking-[.2em] text-stone-600">HIDDEN KNOWLEDGE · ANCIENT WISDOM · UNCOVERED TRUTH</p><p className="text-[8px] tracking-[.2em] text-stone-700">© 2026 MAATAN</p></div></footer>
    </main>
  );
}
