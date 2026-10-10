import type { Episode } from "@/data/types";
import { formatDuration, formatPublishDate } from "@/lib/format";
import styles from "./FeaturedEpisode.module.css";

interface FeaturedEpisodeProps {
  episode: Episode;
}

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <article className={styles.card}>
      <p className={styles.badge}>
        <span aria-hidden="true">✦</span> Featured · Episode {episode.number}
      </p>
      <h3 className={styles.title}>{episode.title}</h3>
      <p className={styles.meta}>
        <time dateTime={episode.publishDate}>{formatPublishDate(episode.publishDate)}</time>
        <span aria-hidden="true">·</span>
        <span>{formatDuration(episode.durationMinutes)}</span>
      </p>
      <p className={styles.description}>{episode.shortDescription}</p>
    </article>
  );
}
