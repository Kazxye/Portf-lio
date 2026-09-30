import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { CursorLens } from "@/components/effects/CursorLens";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile } from "@/data/profile";
import "./globals.css";

const title = `${profile.name} | ${profile.role}`;

// OpenGraph and Twitter images come from app/opengraph-image.png and app/twitter-image.png.
export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description: profile.summary,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.summary,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-svh bg-bg text-fg">
        <CursorLens />
        <ScrollReveal />
        <a
          href="#content"
          className="text-label fixed left-4 top-3 z-50 -translate-y-20 bg-fg px-3 py-2 text-bg focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <NoiseOverlay />
      </body>
    </html>
  );
}
