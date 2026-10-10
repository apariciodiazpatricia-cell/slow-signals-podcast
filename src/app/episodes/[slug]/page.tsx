import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EPISODES, getEpisodesNewestFirst } from "@/data/episodes";
import { formatDuration, formatPublishDate } from "@/lib/format";
import styles from "./page.module.css";

interface EpisodeDetailParams {
  params: Promise<{ slug: string }>;
}

/** All 20 episode pages are pre-rendered at build time (static export). */
export function generateStaticParams(): Array<{ slug: string }> {
  return EPISODES.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: EpisodeDetailParams): Promise<Metadata> {
  const { slug } = await params;
  const episode = EPISODES.find((entry) => entry.slug === slug);
  if (!episode) return { title: "Episode not found" };

  return {
    title: `Ep. ${episode.number}: ${episode.title}`,
    description: episode.shortDescription,
    openGraph: {
      title: `Ep. ${episode.number}: ${episode.title}`,
      description: episode.shortDescription,
      type: "article",
    },
  };
}

export default async function EpisodeDetailPage({ params }: EpisodeDetailParams) {
  const { slug } = await params;
  const episode = EPISODES.find((entry) => entry.slug === slug);
  if (!episode) notFound();

  // Adjacent episodes (newest-first ordering) for two-interaction reachability.
  const ordered = getEpisodesNewestFirst();
  const index = ordered.findIndex((entry) => entry.slug === episode.slug);
  const newer = index > 0 ? ordered[index - 1] : null;
  const older = index < ordered.length - 1 ? ordered[index + 1] : null;

  return (
    <div className="container section">
      <article className={styles.article}>
        <p className="overline">
          Episode {episode.number}
          {episode.isFeatured ? " · Featured" : ""}
        </p>
        <h1 className={styles.title}>{episode.title}</h1>
        <p className={styles.meta}>
          <time dateTime={episode.publishDate}>
            {formatPublishDate(episode.publishDate)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{formatDuration(episode.durationMinutes)}</span>
        </p>
        <p className={styles.lead}>{episode.shortDescription}</p>
        <p className={styles.body}>{episode.fullDescription}</p>

        <nav className={styles.adjacent} aria-label="Episode navigation">
          {older ? (
            <Link href={`/episodes/${older.slug}`} className={styles.adjacentLink}>
              <span aria-hidden="true">←</span> Older · Ep. {older.number}
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/episodes/${newer.slug}`} className={styles.adjacentLink}>
              Ep. {newer.number} · Newer <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <p className={styles.back}>
          <Link href="/episodes">Back to all {EPISODES.length} episodes</Link>
        </p>
      </article>
    </div>
  );
}
