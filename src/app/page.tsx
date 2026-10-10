import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { show } from "@/data/show";
import { getFeaturedEpisode } from "@/data/episodes";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: show.name,
  description: show.tagline,
  openGraph: {
    title: show.name,
    description: show.tagline,
    type: "website",
  },
};

export default function HomePage() {
  const featured = getFeaturedEpisode();

  return (
    <>
      <Hero name={show.name} tagline={show.tagline} />

      <section className="container" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="overline">
          Featured episode
        </h2>
        <FeaturedEpisode episode={featured} />
        <p className={styles.cta}>
          New episodes every Friday —{" "}
          <Link href="/episodes">browse the full catalog</Link>. Questions? See the{" "}
          <Link href="/faq">FAQ</Link> or the <Link href="/about">About page</Link>.
        </p>
      </section>
    </>
  );
}
