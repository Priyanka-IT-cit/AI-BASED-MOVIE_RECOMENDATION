export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: string; // e.g. "PG-13"
  tmdbRating: number; // e.g. 8.8
  runtimeMinutes: number;
  director: string;
  genres: string[];
  vibe: string;
  pacing: string;
  matchScore: number; // e.g. 96
  vectorScore: number; // e.g. 0.9624
  posterUrl: string;
  backdropUrl?: string;
  synopsis: string;
  whyExplanation: string;
  memoryAnchors?: string[];
  cast: string[];
  streamingProviders?: string[];
  attributeScores: {
    moodAlignment: number;
    dialogueCast: number;
    runtimeFit: number;
  };
}

export type MoodType =
  | 'Happy'
  | 'Cathartic'
  | 'Romantic'
  | 'Thrilled'
  | 'Expansive'
  | 'Chilled'
  | 'Mindblown';

export type NightMode = 'Solo' | 'Partner' | 'Friends' | 'Family';

export type ClueCategory = 'scene' | 'dialogue' | 'song' | 'actor' | 'story';

export interface WizardState {
  currentStep: number;
  selectedMood: MoodType;
  selectedGenres: string[];
  anchorMovie: string;
  selectedStars: string[];
  nightMode: NightMode;
  maxRuntime: number;
}

export interface ClueState {
  category: ClueCategory;
  prompt: string;
  era: string;
  actorClue: string;
}
