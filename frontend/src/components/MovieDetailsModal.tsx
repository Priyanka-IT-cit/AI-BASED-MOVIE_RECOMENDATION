import React, { useState } from 'react';
import { Movie } from '../types';
import { X, Play, Star, Bookmark, BookmarkCheck, Brain, Tv, Share2 } from 'lucide-react';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  watchlist,
  onToggleWatchlist,
}) => {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  if (!movie) return null;

  const isInWatchlist = watchlist.includes(movie.id);

  return (
    <div
      id="movie-details-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="movie-details-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b1b20] border border-white/10 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/90 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close Movie Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop / Trailer Stage */}
        <div className="relative aspect-video w-full bg-[#131317] overflow-hidden">
          {isPlayingTrailer ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed] flex items-center justify-center text-[#d2bbff] animate-pulse">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
              <div className="text-lg font-bold text-white font-display">
                Simulating 4K High-Bitrate Trailer Stream
              </div>
              <p className="text-xs text-[#958da1] max-w-sm">
                Playing official teaser audio-visual stream for {movie.title} with 5.1 surround dialogue simulation.
              </p>
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-[#2a292e] text-xs font-semibold text-white hover:bg-[#353439]"
              >
                Close Trailer Preview
              </button>
            </div>
          ) : (
            <>
              <img
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b20] via-[#1b1b20]/40 to-transparent" />

              <button
                type="button"
                onClick={() => setIsPlayingTrailer(true)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#7c3aed]/90 hover:bg-[#7c3aed] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.7)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
                aria-label="Play Trailer"
              >
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </button>

              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#7c3aed] text-white text-xs font-bold font-display">
                  {movie.matchScore}% Match
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-[#7bd0ff] border border-white/10 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#7bd0ff]" />
                  {movie.tmdbRating} / 10
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#958da1] font-semibold mb-1">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.rating}</span>
                <span>•</span>
                <span>{movie.runtimeMinutes} min</span>
                <span>•</span>
                <span>Dir. {movie.director}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {movie.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleWatchlist(movie)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer font-display ${
                  isInWatchlist
                    ? 'bg-[#3131c0] text-white'
                    : 'bg-[#d2bbff] hover:bg-[#c0c1ff] text-[#3f008e]'
                }`}
              >
                {isInWatchlist ? (
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
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#ccc3d8] leading-relaxed">
            {movie.synopsis}
          </p>

          {/* AI Explainability */}
          <div className="bg-[#2a292e] p-5 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest flex items-center gap-1.5 font-display">
                <Brain className="w-4 h-4" />
                CineMind Neural Recommendation Match
              </span>
              <span className="text-xs text-[#7bd0ff] font-bold">
                Vector Similarity: {movie.vectorScore}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#e4e1e8]">
              "{movie.whyExplanation}"
            </p>
          </div>

          {/* Cast & Streaming Providers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#2a292e]/60 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-xs font-bold text-[#958da1] uppercase tracking-wider block font-display">
                Leading Cast:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {movie.cast.map((actor) => (
                  <span
                    key={actor}
                    className="px-2.5 py-1 bg-[#1b1b20] text-white text-xs rounded-lg border border-white/5"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#2a292e]/60 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-xs font-bold text-[#958da1] uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Tv className="w-3.5 h-3.5 text-[#7bd0ff]" />
                Available Streaming:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(movie.streamingProviders || ['Netflix', 'Apple TV', 'Prime Video']).map(
                  (provider) => (
                    <span
                      key={provider}
                      className="px-2.5 py-1 bg-[#006e95]/20 text-[#7bd0ff] text-xs font-semibold rounded-lg border border-sky-400/20"
                    >
                      {provider}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
