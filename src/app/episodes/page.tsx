import type { Metadata } from "next";
import { EpisodeList } from "@/components/EpisodeList";
import { PageHeader } from "@/components/PageHeader";
import { EPISODES, getEpisodesNewestFirst } from "@/data/episodes";
import { show } from "@/data/show";

export const metadata: Metadata = {
  title: "Episodes",
  description: `The full ${EPISODES.length}-episode catalog of ${show.name}, newest first.`,
  openGraph: {
    title: `Episodes · ${show.name}`,
    description: `The full ${EPISODES.length}-episode catalog of ${show.name}, newest first.`,
    type: "website",
  },
};

export default function EpisodesPage() {
  return (
    <div className="container section">
      <PageHeader
        overline="Catalog"
        title={`All ${EPISODES.length} episodes`}
        description="Every conversation we have recorded, newest first — pick one and settle in."
      />
      <EpisodeList episodes={getEpisodesNewestFirst()} />
    </div>
  );
}
