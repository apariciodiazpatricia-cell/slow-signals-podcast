import type { Episode } from "@/data/types";
import { EpisodeCard } from "./EpisodeCard";
import styles from "./EpisodeList.module.css";

interface EpisodeListProps {
  /** Ordered episode collection (callers pass newest-first). */
  episodes: Episode[];
}

/** Ordered catalog list. Owns the list semantics; each card owns its content (SRP). */
export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <ol className={styles.list}>
      {episodes.map((episode) => (
        <li key={episode.slug} className={styles.item}>
          <EpisodeCard episode={episode} />
        </li>
      ))}
    </ol>
  );
}
