import type { Metadata } from "next";
import Image from "next/image";
import { HostCard } from "@/components/HostCard";
import { PageHeader } from "@/components/PageHeader";
import { hosts } from "@/data/hosts";
import { show } from "@/data/show";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `Who makes ${show.name} and what the show is about.`,
  openGraph: {
    title: `About · ${show.name}`,
    description: show.tagline,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container section">
      <PageHeader overline="About" title={show.name} description={show.tagline} />

      <div className={styles.grid}>
        <div className={styles.prose}>
          <h2 className={styles.heading}>The premise</h2>
          <p className={styles.paragraph}>{show.description}</p>

          <h2 className={styles.heading}>Get in touch</h2>
          <p className={styles.paragraph}>
            Ideas, corrections, or a story worth following all the way down? The
            inbox is open.
          </p>
          <ul className={styles.links}>
            {show.contactLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className={styles.figure}>
          <Image
            src="/show-art.svg"
            alt="Slow Signals artwork: concentric gold rings radiating from a small circle on a warm dark background."
            width={800}
            height={500}
            className={styles.art}
          />
          <figcaption className={styles.caption}>
            Recorded in a small studio with a lot of windows.
          </figcaption>
        </figure>
      </div>

      <section className={styles.hostsSection} aria-labelledby="hosts-heading">
        <h2 id="hosts-heading" className={styles.heading}>
          Behind the microphones
        </h2>
        <ul className={styles.hosts}>
          {hosts.map((host) => (
            <li key={host.name}>
              <HostCard host={host} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
