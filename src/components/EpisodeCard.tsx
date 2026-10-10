import Link from "next/link";
import type { Episode } from "@/data/types";
import { formatDuration, formatEpisodeNumber, formatPublishDate } from "@/lib/format";
import styles from "./EpisodeCard.module.css";

interface EpisodeCardProps {
  episode: Episode;
}

/** One catalog entry: number, title (linked to its detail route), date, duration, blurb. */
export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.number}>
        <span>Episode</span> <span>{formatEpisodeNumber(episode.number)}</span>
        {episode.isFeatured ? <span className={styles.badge}>Featured</span> : null}
      </p>
      <h2 className={styles.title}>
        <Link href={`/episodes/${episode.slug}`} className={styles.titleLink}>
          {episode.title}
        </Link>
      </h2>
      <p className={styles.meta}>
        <time dateTime={episode.publishDate}>{formatPublishDate(episode.publishDate)}</time>
        <span aria-hidden="true">·</span>
        <span>{formatDuration(episode.durationMinutes)}</span>
      </p>
      <p className={styles.description}>{episode.shortDescription}</p>
    </article>
  );
}
