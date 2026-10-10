import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroProps {
  name: string;
  tagline: string;
}

export function Hero({ name, tagline }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <p className="overline">A podcast</p>
        <h1 id="hero-heading" className={styles.title}>
          {name}
        </h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.actions}>
          <Link href="/episodes" className={styles.primaryAction}>
            Browse all 20 episodes
          </Link>
          <Link href="/about" className={styles.secondaryAction}>
            About the show
          </Link>
        </div>
      </div>
    </section>
  );
}
