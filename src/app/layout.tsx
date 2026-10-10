import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { show } from "@/data/show";
import styles from "./layout.module.css";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: show.name,
    template: `%s · ${show.name}`,
  },
  description: show.tagline,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: show.name,
    description: show.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header>
          <div className={`container ${styles.header}`}>
            <Link href="/" className={styles.wordmark}>
              {show.name}
            </Link>
            <Navigation />
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
