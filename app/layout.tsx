import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NeuralNetwork } from "@/components/canvas/NeuralNetwork";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "engram — Persistent memory for AI agents",
  description:
    "A Go binary with SQLite + FTS5 full-text search. Agent-agnostic persistent memory system for AI coding agents. Works with Claude Code, Cursor, OpenCode, and any MCP-compatible agent.",
  keywords: [
    "AI agents",
    "persistent memory",
    "MCP",
    "Go",
    "SQLite",
    "FTS5",
    "Claude Code",
    "Cursor",
    "OpenCode",
  ],
  authors: [{ name: "Gentleman Programming" }],
  openGraph: {
    title: "engram — Persistent memory for AI agents",
    description:
      "A Go binary with SQLite + FTS5 full-text search. Agent-agnostic persistent memory system for AI coding agents.",
    url: "https://engram.land",
    siteName: "engram",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "engram — Persistent memory for AI agents",
    description:
      "A Go binary with SQLite + FTS5 full-text search. Agent-agnostic persistent memory system for AI coding agents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--color-base] text-[--color-text] relative">
        {/* Global neural network background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NeuralNetwork />

        </div>
        <main className="relative z-10 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
