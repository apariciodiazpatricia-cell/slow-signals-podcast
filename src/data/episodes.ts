import type { Episode } from "./types";
import { assertEpisodeInvariants, getFeaturedEpisode as selectFeatured } from "./invariants";

/** All 20 episodes, newest first (FR-008: fictional/mocked, no feed). */
export const EPISODES: Episode[] = [
  {
    number: 20,
    slug: "episode-20",
    title: "The Architecture of Attention",
    shortDescription:
      "Why our best ideas arrive when we stop chasing them — a conversation about designing a life that protects focus.",
    fullDescription:
      "We treat attention as a mood, something that visits us. This episode treats it " +
      "as architecture: load-bearing walls, doors, and windows. Mara and a designer of " +
      "quiet spaces ask what it costs to build a life around deep focus — and what it " +
      "gives back once the walls are up.",
    publishDate: "2026-10-02",
    durationMinutes: 42,
    isFeatured: true,
  },
  {
    number: 19,
    slug: "episode-19",
    title: "Letters from a Slow City",
    shortDescription:
      "A year of walking the same twelve streets with a notebook, and what the habit revealed about seeing.",
    fullDescription:
      "Our guest walked the same route through her city every day for a year, writing " +
      "one letter each week to whoever might be listening. What began as a writing " +
      "exercise became a masterclass in noticing — and a case for the virtues of repetition.",
    publishDate: "2026-09-25",
    durationMinutes: 38,
    isFeatured: false,
  },
  {
    number: 18,
    slug: "episode-18",
    title: "The Type-Setter's Eye",
    shortDescription:
      "On serifs, spacing, and the invisible labor of making sentences comfortable to read.",
    fullDescription:
      "Between the writer and the reader stands a person who decides how wide an 'a' " +
      "should be. A veteran typesetter walks us through the quiet decisions behind " +
      "readable pages, from book margins to the politics of the humble space bar.",
    publishDate: "2026-09-18",
    durationMinutes: 45,
    isFeatured: false,
  },
  {
    number: 17,
    slug: "episode-17",
    title: "On Making Things by Hand",
    shortDescription:
      "Why hand-made objects feel different to hold — and whether that feeling is nostalgia or something real.",
    fullDescription:
      "A woodworker and a behavioral researcher argue (amicably) about what the hand " +
      "leaves in an object. We look at tool marks as signatures, the economics of " +
      "slowness, and why a slightly imperfect bowl can be worth more than a perfect one.",
    publishDate: "2026-09-11",
    durationMinutes: 36,
    isFeatured: false,
  },
  {
    number: 16,
    slug: "episode-16",
    title: "Midnight in the Archive",
    shortDescription:
      "What it's like to catalogue the unread — a night shift with a librarian of forgotten things.",
    fullDescription:
      "Most of an archive will never be read by anyone. Our guest spends her nights " +
      "with boxes of letters, ledgers, and photographs that no one requested, deciding " +
      "what to keep and what the fire may have. A meditation on memory, custody, and " +
      "quietly important work.",
    publishDate: "2026-09-04",
    durationMinutes: 51,
    isFeatured: false,
  },
  {
    number: 15,
    slug: "episode-15",
    title: "The Color of Memory",
    shortDescription:
      "Paint pigments fade, photographs shift — a conservator on the half-life of the things we see.",
    fullDescription:
      "The red in a medieval manuscript is not the red its maker saw. A paintings " +
      "conservator explains how light, chemistry, and time slowly edit every image we " +
      "love, and what it means to preserve something that was always meant to change.",
    publishDate: "2026-08-28",
    durationMinutes: 40,
    isFeatured: false,
  },
  {
    number: 14,
    slug: "episode-14",
    title: "Conversations with Strangers",
    shortDescription:
      "A social artist's rules for talking to people you've never met — and why the small-talk myth is wrong.",
    fullDescription:
      "Small talk isn't shallow, our guest argues; it's scaffolding. We explore the " +
      "craft of the opening question, the ethics of curiosity, and three experiments " +
      "you can run on your next train ride to remind yourself how interesting other people are.",
    publishDate: "2026-08-21",
    durationMinutes: 33,
    isFeatured: false,
  },
  {
    number: 13,
    slug: "episode-13",
    title: "What Museums Forget",
    shortDescription:
      "Every exhibit is a sentence someone chose to write. A curator on the art of leaving things out.",
    fullDescription:
      "A museum is as defined by what it doesn't show. Our guest walks us through the " +
      "un-glamorous work of deaccessioning, the politics of the wall label, and how a " +
      "single missing caption can rewrite a century.",
    publishDate: "2026-08-14",
    durationMinutes: 47,
    isFeatured: false,
  },
  {
    number: 12,
    slug: "episode-12",
    title: "The Grammar of Film",
    shortDescription:
      "Cuts, holds, and pauses — a filmmaker on the sentence structure of moving pictures.",
    fullDescription:
      "Every edit is a conjunction; every held shot, a full stop. A filmmaker trained " +
      "as a novelist breaks down how cinema borrows the rhythm of language, why the " +
      "longest takes feel like breathing, and where the grammar is heading next.",
    publishDate: "2026-08-07",
    durationMinutes: 39,
    isFeatured: false,
  },
  {
    number: 11,
    slug: "episode-11",
    title: "Repair as a Radical Act",
    shortDescription:
      "In a world built to be replaced, a repair-café founder on mending as a form of protest.",
    fullDescription:
      "The screw is stripped, the seam is torn, the board is dead — and someone says: " +
      "let's fix it anyway. We visit the quiet insurgency of repair culture, from " +
      "kintsugi to appliance triage tables, and ask what we're really fixing when we mend.",
    publishDate: "2026-07-31",
    durationMinutes: 44,
    isFeatured: false,
  },
  {
    number: 10,
    slug: "episode-10",
    title: "Listening to Silence",
    shortDescription:
      "There is no such thing as a quiet room — a sound designer's tour of the noise we stop hearing.",
    fullDescription:
      "Silence is a myth the ear tells itself. A sound designer takes us through rooms " +
      "engineered to be silent, hums we've agreed to ignore, and what happens in the " +
      "brain when the noise finally stops. A surprisingly loud episode about quiet.",
    publishDate: "2026-07-24",
    durationMinutes: 35,
    isFeatured: false,
  },
  {
    number: 9,
    slug: "episode-09",
    title: "The Last Analog Studio",
    shortDescription:
      "Tape machines, valve microphones, and the people still cutting records the slow way.",
    fullDescription:
      "Somewhere a reel-to-reel is still spinning at exactly the right speed. We spend " +
      "an afternoon in a working analog studio talking about why some musicians pay " +
      "more for imperfection, and what the numbers-on-a-screen crowd keeps getting wrong.",
    publishDate: "2026-07-17",
    durationMinutes: 49,
    isFeatured: false,
  },
  {
    number: 8,
    slug: "episode-08",
    title: "Designing for Gentleness",
    shortDescription:
      "Interfaces that don't shout — a product designer on making software that respects a fragile day.",
    fullDescription:
      "Most software is designed for a user who is calm, rested, and infinitely " +
      "patient — none of whom exist. Our guest redesigns for the tired, the anxious, " +
      "and the interrupted, and shows how small choices in tone and timing can lower " +
      "the temperature of a whole day.",
    publishDate: "2026-07-10",
    durationMinutes: 37,
    isFeatured: false,
  },
  {
    number: 7,
    slug: "episode-07",
    title: "Rituals of the Early Hours",
    shortDescription:
      "Before the world wakes: writers, bakers, and monks on what the 5 a.m. hour is actually for.",
    fullDescription:
      "The morning has mythology. We ask three very early risers what actually happens " +
      "in the first hour of the day — no productivity gospel, just the texture of dark " +
      "streets, proofing dough, and cold hands on warm pages.",
    publishDate: "2026-07-03",
    durationMinutes: 41,
    isFeatured: false,
  },
  {
    number: 6,
    slug: "episode-06",
    title: "The Cartographer's Confession",
    shortDescription:
      "Every map is an argument — a cartographer on borders, blank spaces, and drawing honestly.",
    fullDescription:
      "Maps pretend to neutrality; our guest doesn't. A career of drawing coastlines " +
      "and borders leads to a frank conversation about which lies are necessary, which " +
      "aren't, and the strange ethics of putting a name on a place that already had one.",
    publishDate: "2026-06-26",
    durationMinutes: 46,
    isFeatured: false,
  },
  {
    number: 5,
    slug: "episode-05",
    title: "Books We Never Finished",
    shortDescription:
      "On abandonment as a reading strategy — and the peculiar guilt of the half-read shelf.",
    fullDescription:
      "We keep score on the books we finish. What if we shouldn't? A literary scholar " +
      "and a bookseller make the case for putting things down, the difference between " +
      "quitting and wandering, and the shelf of beautiful intentions we all keep.",
    publishDate: "2026-06-19",
    durationMinutes: 34,
    isFeatured: false,
  },
  {
    number: 4,
    slug: "episode-04",
    title: "The Economics of Craft",
    shortDescription:
      "Why a hand-thrown mug costs twelve times a factory one — and who decides that's worth it.",
    fullDescription:
      "The price of handmade is a story about time, rent, and what a culture decides to " +
      "value. A ceramicist opens the books — literally — on margins, markets, and making " +
      "a living from objects that take a day each to become themselves.",
    publishDate: "2026-06-12",
    durationMinutes: 43,
    isFeatured: false,
  },
  {
    number: 3,
    slug: "episode-03",
    title: "A Brief History of Quiet",
    shortDescription:
      "Silence used to be everywhere. A historian on how the modern world got so loud.",
    fullDescription:
      "Before engines, quiet was the background and noise the interruption — the roles " +
      "have flipped entirely. We trace the centuries-long rise of ambient sound, from " +
      "horse carts to headphone culture, and ask what we lost in the upgrade.",
    publishDate: "2026-06-05",
    durationMinutes: 38,
    isFeatured: false,
  },
  {
    number: 2,
    slug: "episode-02",
    title: "Notes on Night Trains",
    shortDescription:
      "Sleeping across borders: a travel writer on compartments, corridors, and the romance of arrival.",
    fullDescription:
      "A night train is a small society with the lights half down. Our guest has ridden " +
      "them from Lisbon to Istanbul, collecting the etiquette of the corridor, the " +
      "music of the rails, and the particular friendship of people who wake up in a new " +
      "country together.",
    publishDate: "2026-05-29",
    durationMinutes: 40,
    isFeatured: false,
  },
  {
    number: 1,
    slug: "episode-01",
    title: "Why This Show Exists",
    shortDescription:
      "The pilot: what Slow Signals is for, who it's for, and the one promise we're making.",
    fullDescription:
      "Before there were episodes, there was a complaint: everything is too fast and " +
      "too loud. The pilot lays out what this show will and won't be — one question per " +
      "week, no gurus, no urgency — and introduces the hosts behind the microphones.",
    publishDate: "2026-05-22",
    durationMinutes: 31,
    isFeatured: false,
  },
];

// Throws at build/dev startup if any data-model invariant is violated.
assertEpisodeInvariants(EPISODES);

/** Newest first (20 → 1). */
export function getEpisodesNewestFirst(): Episode[] {
  return [...EPISODES].sort((a, b) => b.number - a.number);
}

export function getFeaturedEpisode(): Episode {
  return selectFeatured(EPISODES);
}
