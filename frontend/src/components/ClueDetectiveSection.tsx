import React, { useState } from 'react';
import { ClueCategory, Movie } from '../types';
import {
  Fingerprint,
  Search,
  Music,
  MessageSquare,
  User,
  BookOpen,
  Film,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Info,
  Check,
} from 'lucide-react';

interface ClueDetectiveSectionProps {
  onMovieResolved: (movieTitle: string) => void;
  onSelectMovie: (movie: Movie) => void;
  topMovie: Movie;
}

export const ClueDetectiveSection: React.FC<ClueDetectiveSectionProps> = ({
  onMovieResolved,
  onSelectMovie,
  topMovie,
}) => {
  const [activeCategory, setActiveCategory] = useState<ClueCategory>('scene');
  const [promptText, setPromptText] = useState(
    "A man enters other people's dreams to plant an idea, there is a spinning metal top on a table at the end and heavy orchestral horns blaring."
  );
  const [era, setEra] = useState('2010s');
  const [actorClue, setActorClue] = useState('Leonardo DiCaprio (?)');
  const [isSearching, setIsSearching] = useState(false);
  const [hasRefined, setHasRefined] = useState(false);

  const categories: { type: ClueCategory; label: string; icon: React.ReactNode }[] = [
    { type: 'scene', label: 'I remember a scene', icon: <Film className="w-4 h-4" /> },
    { type: 'dialogue', label: 'I remember dialogue', icon: <MessageSquare className="w-4 h-4" /> },
    { type: 'song', label: 'I remember a song', icon: <Music className="w-4 h-4" /> },
    { type: 'actor', label: 'I remember an actor', icon: <User className="w-4 h-4" /> },
    { type: 'story', label: 'I remember the plot', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleSearchClue = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onMovieResolved('Searching script n-grams... Matched Inception (94%)');
    }, 600);
  };

  const handleRefineClue = () => {
    setPromptText(
      (prev) =>
        prev + ' He also used a loaded die totem and had a zero-gravity fight in an elevator.'
    );
    setHasRefined(true);
    onMovieResolved('Clue vector refined! Match confidence elevated to 99.4%');
  };

  return (
    <section id="section-clue" className="space-y-6 scroll-mt-24">
      <div className="bg-[#1b1b20] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006e95]/30 text-[#7bd0ff] text-xs font-semibold mb-2 border border-sky-400/20 font-display">
              <Fingerprint className="w-4 h-4" />
              <span>Memory Retrieval Neural Graph</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Find a Movie From a Fragmented Clue
            </h2>
            <p className="text-sm text-[#ccc3d8] mt-1 max-w-2xl">
              Don't know the title? Type anything you remember: a piece of dialogue, an iconic prop, a song, or a strange scene.
            </p>
          </div>
        </div>

        {/* Clue Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.type;
            return (
              <button
                key={cat.type}
                type="button"
                onClick={() => setActiveCategory(cat.type)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#7c3aed] text-white border-purple-400 shadow-md shadow-purple-900/40'
                    : 'bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] hover:text-white border-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conversational Clue Prompt Box */}
        <div className="space-y-4">
          <div className="relative bg-[#2a292e] rounded-2xl p-4 sm:p-5 border border-white/10 shadow-inner">
            <textarea
              id="clue-prompt-input"
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe the scene or memory in plain words... e.g. A man enters dreams with a spinning top."
              className="w-full bg-transparent text-white placeholder-[#958da1] text-sm sm:text-base focus:outline-none resize-none leading-relaxed"
            />

            {/* Quick Meta Attributes Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center bg-[#353439] px-3 py-1.5 rounded-xl text-xs border border-white/5 text-[#ccc3d8]">
                  <span className="mr-1.5 text-[#958da1] font-semibold">Era:</span>
                  <select
                    id="clue-era-select"
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="2010s" className="bg-[#2a292e]">2010s</option>
                    <option value="2000s" className="bg-[#2a292e]">2000s</option>
                    <option value="1990s" className="bg-[#2a292e]">1990s</option>
                    <option value="Any" className="bg-[#2a292e]">Any Time</option>
                  </select>
                </div>

                <div className="flex items-center bg-[#353439] px-3 py-1.5 rounded-xl text-xs border border-white/5 text-[#ccc3d8]">
                  <span className="mr-1.5 text-[#958da1] font-semibold">Actor Clue:</span>
                  <input
                    id="clue-actor-input"
                    type="text"
                    value={actorClue}
                    onChange={(e) => setActorClue(e.target.value)}
                    className="bg-transparent text-white font-semibold focus:outline-none w-36"
                  />
                </div>
              </div>

              <button
                id="btn-detect-clue"
                type="button"
                onClick={handleSearchClue}
                disabled={isSearching}
                className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#006e95] to-[#7c3aed] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-display"
              >
                <Sparkles className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
                <span>{isSearching ? 'Evaluating Memory...' : 'Unravel Mystery'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clue Confidence Matrix & Live Match Hit */}
        <div id="clue-results-stage" className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-widest flex items-center gap-1.5 font-display">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Autonomous Detective Verdict
            </span>
            <span className="text-xs text-[#958da1]">
              Evaluated 4,803 script synopses in 18ms
            </span>
          </div>

          {/* Top Detective Hit Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#2a292e] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3">
                <div
                  onClick={() => onSelectMovie(topMovie)}
                  className="aspect-[2/3] rounded-2xl overflow-hidden bg-[#1b1b20] relative cursor-pointer group-hover:shadow-2xl transition-all"
                >
                  <img
                    src={topMovie.posterUrl}
                    alt={topMovie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#7c3aed] text-white text-xs font-bold font-display shadow-lg">
                    {hasRefined ? '99.4% Clue Match' : '94% Clue Match'}
                  </div>
                </div>
              </div>

              <div className="md:col-span-9 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7bd0ff] font-display">
                  <span>🥇 Most Likely Film Match</span>
                  <span>•</span>
                  <span>Direct Fragment Correlation</span>
                </div>

                <h3
                  onClick={() => onSelectMovie(topMovie)}
                  className="text-2xl sm:text-4xl font-extrabold text-white font-display hover:text-[#d2bbff] transition-colors cursor-pointer"
                >
                  {topMovie.title} ({topMovie.year})
                </h3>

                <div className="bg-[#1b1b20]/90 p-4 sm:p-5 rounded-2xl space-y-2 border border-white/5">
                  <span className="text-[11px] font-bold text-[#958da1] uppercase tracking-wider block font-display">
                    Identified Memory Anchors:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#7c3aed]/30 text-[#d2bbff] text-xs font-semibold border border-purple-400/20">
                      ✓ "spinning metal top totem"
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#006e95]/30 text-[#7bd0ff] text-xs font-semibold border border-sky-400/20">
                      ✓ "enters other people's dreams"
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#3131c0]/30 text-[#c0c1ff] text-xs font-semibold border border-indigo-400/20">
                      ✓ "Hans Zimmer brass horns"
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#ccc3d8] pt-1 leading-relaxed">
                    "Dom Cobb (Leonardo DiCaprio) is an extractor who enters targets' subconscious minds through multi-layered shared dreams, carrying a pewter spinning top as his reality totem."
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      onMovieResolved("Saved Inception (2010) to your CineMind Watchlist!")
                    }
                    className="h-10 px-5 rounded-xl bg-[#d2bbff] hover:bg-[#c0c1ff] text-[#3f008e] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer font-display"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Yes! That's the one</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMovie(topMovie)}
                    className="h-10 px-4 rounded-xl bg-[#353439] hover:bg-[#1b1b20] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/5 transition-all cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-[#7bd0ff]" />
                    <span>Stream Specs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Candidate Matches */}
          <div className="bg-[#0e0e12]/70 p-4 sm:p-5 rounded-2xl border border-white/5 space-y-3">
            <span className="text-[11px] font-bold text-[#958da1] uppercase tracking-wider block font-display">
              Still not it? Alternative candidate matches:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() =>
                  onMovieResolved("Inspecting Paprika (2006) - DC Mini dream invasion device.")
                }
                className="p-3.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-sm font-bold text-white font-display">Paprika (2006)</div>
                  <div className="text-xs text-[#958da1]">Satoshi Kon • 76% Dream correlation</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#958da1]" />
              </div>

              <div
                onClick={() =>
                  onMovieResolved("Inspecting Dark City (1998) - Tuning memories at midnight.")
                }
                className="p-3.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-sm font-bold text-white font-display">Dark City (1998)</div>
                  <div className="text-xs text-[#958da1]">Alex Proyas • 63% Mind altering memory</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#958da1]" />
              </div>
            </div>
          </div>

          {/* Conversational Refine Box */}
          <div className="bg-[#2a292e]/60 border border-white/5 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
            <Sparkles className="w-7 h-7 text-[#d2bbff] shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white font-display">
                Want to inject another clue?
              </div>
              <p className="text-xs text-[#ccc3d8] mt-0.5">
                Type additional memories like "Joseph Gordon-Levitt had a zero-gravity hallway fight" to increase match confidence to 99.4%.
              </p>
            </div>
            <button
              id="btn-refine-clue"
              type="button"
              onClick={handleRefineClue}
              className="px-4 py-2.5 rounded-xl bg-[#353439] hover:bg-[#1b1b20] text-white font-bold text-xs whitespace-nowrap transition-all border border-white/10 cursor-pointer font-display"
            >
              Refine Vector
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
