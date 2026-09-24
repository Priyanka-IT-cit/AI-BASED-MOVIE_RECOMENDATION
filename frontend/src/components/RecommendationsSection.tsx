import React, { useState } from 'react';
import { Movie } from '../types';
import {
  Sparkles,
  ArrowUpDown,
  Star,
  Bookmark,
  BookmarkCheck,
  Eye,
  ChevronDown,
  ChevronUp,
  Brain,
  Info,
} from 'lucide-react';

interface RecommendationsSectionProps {
  movies: Movie[];
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
  onOpenCompare: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  movies,
  watchlist,
  onToggleWatchlist,
  onOpenCompare,
  onSelectMovie,
}) => {
  const [expandedWhyIds, setExpandedWhyIds] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string) => {
    setExpandedWhyIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const heroMovie = movies[0];
  const secondaryMovies = movies.slice(1, 5);

  if (!heroMovie) return null;

  const isHeroInWatchlist = watchlist.includes(heroMovie.id);

  return (
    <section id="recommendation-results" className="space-y-8 scroll-mt-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7bd0ff] animate-pulse" />
            <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-widest font-display">
              Matched Matrix Results
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display tracking-tight">
            Top 5 Curated Recommendations
          </h2>
        </div>

        <button
          id="btn-compare-modal"
          type="button"
          onClick={onOpenCompare}
          className="h-10 px-4 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 self-start sm:self-auto shadow-md border border-white/5 transition-all cursor-pointer"
        >
          <ArrowUpDown className="w-4 h-4 text-[#d2bbff]" />
          <span>Compare Top Picks</span>
        </button>
      </div>

      {/* 🥇 1st Preference (Hero Spotlight Card) */}
      <div
        id="hero-rec-card"
        className="relative rounded-3xl bg-[#1b1b20] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
      >
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Movie Poster & Match Badge */}
          <div className="lg:col-span-4 relative">
            <div
              onClick={() => onSelectMovie(heroMovie)}
              className="aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl relative bg-[#2a292e] cursor-pointer group/poster"
            >
              <img
                src={heroMovie.posterUrl}
                alt={heroMovie.title}
                className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-transparent opacity-60" />

              {/* 1st Rank Ribbon */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-xs font-bold flex items-center gap-1.5 shadow-xl font-display">
                <span>🥇 1st Preference</span>
              </div>

              <div className="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-[#0e0e12]/90 backdrop-blur-md text-[#7bd0ff] text-sm font-bold shadow-lg border border-white/10 font-display">
                {heroMovie.matchScore}% Match
              </div>
            </div>
          </div>

          {/* Movie Metadata & AI Explainability */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#958da1] mb-1.5 font-medium">
                <span className="text-white font-bold">{heroMovie.year}</span>
                <span>•</span>
                <span>{heroMovie.rating}</span>
                <span>•</span>
                <span>
                  {Math.floor(heroMovie.runtimeMinutes / 60)}h {heroMovie.runtimeMinutes % 60}m (
                  {heroMovie.runtimeMinutes} min)
                </span>
                <span>•</span>
                <span className="text-[#7bd0ff] font-semibold">{heroMovie.genres.join(' / ')}</span>
              </div>

              <h3
                onClick={() => onSelectMovie(heroMovie)}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display hover:text-[#d2bbff] transition-colors cursor-pointer"
              >
                {heroMovie.title}
              </h3>

              <p className="text-sm sm:text-base text-[#ccc3d8] mt-2 leading-relaxed">
                {heroMovie.synopsis}
              </p>
            </div>

            {/* AI Match Breakdown Box */}
            <div className="bg-[#2a292e]/85 rounded-2xl p-5 space-y-3 shadow-inner border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest flex items-center gap-1.5 font-display">
                  <Brain className="w-4 h-4" />
                  Why CineMind Picked This For You
                </span>
                <span className="text-xs font-semibold text-[#7bd0ff] font-display">
                  Vector Score: {heroMovie.vectorScore}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#e4e1e8] leading-relaxed">
                "{heroMovie.whyExplanation}"
              </p>

              {/* Vector Attribute Gauges */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-[#958da1]">Mood Alignment</span>
                    <span className="text-[#d2bbff]">
                      {heroMovie.attributeScores.moodAlignment}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#353439] overflow-hidden">
                    <div
                      className="h-full bg-[#d2bbff] rounded-full transition-all duration-700"
                      style={{ width: `${heroMovie.attributeScores.moodAlignment}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-[#958da1]">Dialogue & Cast</span>
                    <span className="text-[#7bd0ff]">
                      {heroMovie.attributeScores.dialogueCast}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#353439] overflow-hidden">
                    <div
                      className="h-full bg-[#7bd0ff] rounded-full transition-all duration-700"
                      style={{ width: `${heroMovie.attributeScores.dialogueCast}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-[#958da1]">Runtime Fit</span>
                    <span className="text-[#c0c1ff]">{heroMovie.attributeScores.runtimeFit}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#353439] overflow-hidden">
                    <div
                      className="h-full bg-[#c0c1ff] rounded-full transition-all duration-700"
                      style={{ width: `${heroMovie.attributeScores.runtimeFit}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onToggleWatchlist(heroMovie)}
                className={`h-11 px-5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer font-display ${
                  isHeroInWatchlist
                    ? 'bg-[#3131c0] text-white hover:bg-[#25005a]'
                    : 'bg-[#d2bbff] hover:bg-[#c0c1ff] text-[#3f008e] hover:scale-[1.03]'
                }`}
              >
                {isHeroInWatchlist ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onSelectMovie(heroMovie)}
                className="h-11 px-5 rounded-xl bg-[#353439] hover:bg-[#2a292e] text-white font-semibold text-sm flex items-center gap-2 border border-white/5 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#7bd0ff]" />
                <span>View Details & Trailer</span>
              </button>

              <div className="ml-auto flex items-center gap-1.5 text-xs text-[#958da1]">
                <Star className="w-4 h-4 text-[#d2bbff] fill-[#d2bbff]" />
                <span className="text-white font-bold">{heroMovie.tmdbRating}</span>
                <span>/ 10 TMDB Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🥈 2nd to 5th Preference Graded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryMovies.map((movie, index) => {
          const rankOrdinal = index === 0 ? '🥈 2nd' : index === 1 ? '🥉 3rd' : `${index + 2}th`;
          const isInWatchlist = watchlist.includes(movie.id);
          const isWhyOpen = expandedWhyIds[movie.id] || false;

          return (
            <div
              key={movie.id}
              className="bg-[#1b1b20] hover:bg-[#1f1f24] border border-white/5 hover:border-white/15 rounded-2xl p-4 flex flex-col justify-between space-y-4 group transition-all shadow-xl"
            >
              <div>
                <div
                  onClick={() => onSelectMovie(movie)}
                  className="aspect-[16/10] w-full rounded-xl overflow-hidden relative mb-3 bg-[#2a292e] cursor-pointer"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#0e0e12]/90 backdrop-blur-md text-[11px] font-bold text-[#7bd0ff] border border-white/10 font-display">
                    {rankOrdinal} • {movie.matchScore}%
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-[#958da1]">
                  {movie.year} • {movie.runtimeMinutes}m • {movie.director}
                </div>

                <h4
                  onClick={() => onSelectMovie(movie)}
                  className="text-lg font-bold text-white mt-1 group-hover:text-[#d2bbff] transition-colors cursor-pointer font-display"
                >
                  {movie.title}
                </h4>

                <p className="text-xs text-[#ccc3d8] line-clamp-2 mt-1 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => toggleWhy(movie.id)}
                  className="w-full text-left text-xs font-semibold text-[#d2bbff] flex items-center justify-between cursor-pointer hover:underline"
                >
                  <span>🧠 Why this pick?</span>
                  {isWhyOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isWhyOpen && (
                  <div className="text-xs text-[#ccc3d8] bg-[#2a292e] p-2.5 rounded-xl border border-white/5 animate-in fade-in duration-200">
                    {movie.whyExplanation}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleWatchlist(movie)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                      isInWatchlist
                        ? 'bg-[#3131c0] text-white border-indigo-400'
                        : 'bg-[#2a292e] hover:bg-[#353439] text-white border-white/5'
                    }`}
                  >
                    {isInWatchlist ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Watchlist</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMovie(movie)}
                    className="px-2.5 py-2 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-[#7bd0ff] border border-white/5 text-xs font-semibold cursor-pointer"
                    title="View Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
