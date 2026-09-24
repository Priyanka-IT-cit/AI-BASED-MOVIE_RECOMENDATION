import React from 'react';
import { Movie } from '../types';
import { X, Bookmark, Trash2, Eye, Star, Clock } from 'lucide-react';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistMovies: Movie[];
  onRemoveFromWatchlist: (movieId: string) => void;
  onSelectMovie: (movie: Movie) => void;
  onClearWatchlist: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  watchlistMovies,
  onRemoveFromWatchlist,
  onSelectMovie,
  onClearWatchlist,
}) => {
  if (!isOpen) return null;

  const totalMinutes = watchlistMovies.reduce((sum, m) => sum + m.runtimeMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  return (
    <div
      id="watchlist-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="watchlist-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b1b20] border border-white/10 max-w-2xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 border border-purple-400/30 flex items-center justify-center text-[#d2bbff]">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">CineMind Watchlist</h3>
              <div className="flex items-center gap-2 text-xs text-[#958da1]">
                <span>{watchlistMovies.length} saved titles</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7bd0ff]" />
                  {totalHours}h {remainingMins}m total runtime
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#2a292e] hover:bg-[#353439] flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close Watchlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Saved Movies */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {watchlistMovies.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Bookmark className="w-12 h-12 text-[#958da1]/40 mx-auto" />
              <div className="text-base font-bold text-white font-display">
                Your watchlist is currently empty
              </div>
              <p className="text-xs text-[#958da1] max-w-xs mx-auto">
                Explore recommended films or use Clue Detective to add gems to your queue.
              </p>
            </div>
          ) : (
            watchlistMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#2a292e] p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-4 hover:border-purple-500/20 transition-all group"
              >
                <div
                  onClick={() => {
                    onSelectMovie(movie);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-12 h-16 rounded-xl object-cover shrink-0 bg-[#1b1b20]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-[#d2bbff] transition-colors font-display">
                      {movie.title} ({movie.year})
                    </h4>
                    <div className="text-xs text-[#958da1] flex items-center gap-2 mt-0.5">
                      <span>{movie.runtimeMinutes} min</span>
                      <span>•</span>
                      <span className="text-[#7bd0ff] font-semibold">{movie.matchScore}% Match</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelectMovie(movie);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-[#353439] hover:bg-[#1b1b20] text-white transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-[#7bd0ff]" />
                  </button>

                  <button
                    onClick={() => onRemoveFromWatchlist(movie.id)}
                    className="p-2 rounded-xl bg-[#353439] hover:bg-red-500/20 text-[#958da1] hover:text-red-300 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {watchlistMovies.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onClearWatchlist}
              className="text-xs text-red-300 hover:text-red-200 hover:underline font-semibold cursor-pointer"
            >
              Clear Entire Watchlist
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#7c3aed] hover:bg-[#6366f1] text-white text-xs font-bold font-display cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
