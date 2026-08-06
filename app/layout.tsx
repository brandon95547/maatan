import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// The site's two faces — Cormorant Garamond for display, Montserrat for text —
// are loaded in globals.css. There is deliberately no next/font import here: the
// starter shipped Geist and Geist Mono, neither of which this design uses, and
// vinext loads next/font from the CDN at runtime rather than self-hosting it, so
// keeping them meant two font requests on every page for faces nothing renders.

export const metadata: Metadata = {
  title: {
    default: "Maatan — The Hidden Codex",
    // Every page below the root gets its own name in front of the wordmark,
    // which is what makes a hundred entity pages distinguishable in search
    // results and in a row of browser tabs.
    template: "%s · Maatan",
  },
  description:
    "A codex of eternal truths, timeless wisdom, and the mysteries of existence. Explore humanity's most interconnected library of esoteric knowledge, sacred texts, ancient symbols, and mystical traditions.",
  other: {
    // Load-bearing: tests/rendered-html.test.mjs asserts this meta tag is present.
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-obsidian-800 text-parchment-200 antialiased selection:bg-gold-500 selection:text-black">
        {/* The header is fixed and translucent, so it does NOT push content down
            — the homepage hero is meant to run underneath it. Pages that are not
            the hero own their own top spacing (see components/PageShell.tsx). */}
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
