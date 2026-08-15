import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const archivo = localFont({
  src: "./fonts/archivo-black.woff2",
  variable: "--font-archivo",
  weight: "700",
  display: "swap",
});

const publicSans = localFont({
  src: [
    { path: "./fonts/public-sans-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/public-sans-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plex-mono-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Prisfyndet — spel och serier i Uppsala",
  description:
    "Prisfyndet är en butik för spel och serier på Kungsgatan 39 i Uppsala, sedan 1977. Samlarkortspel, figurspel, rollspel, brädspel, serier och manga — plus spelkvällar och turneringar varje vecka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
