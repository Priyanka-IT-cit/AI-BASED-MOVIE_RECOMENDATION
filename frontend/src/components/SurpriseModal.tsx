import React, { useState } from 'react';
import { Movie } from '../types';
import { SURPRISE_MOVIES } from '../data/mockData';
import { X, Dices, RefreshCw, Bookmark, BookmarkCheck, Star } from 'lucide-react';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onToggleWatchlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentMovie = SURPRISE_MOVIES[currentIndex] || SURPRISE_MOVIES[0];
  const isInWatchlist = watchlist.includes(currentMovie.id);

  const handleSurpriseAgain = () => {
    setCurrentIndex((prev) => (prev + 1) % SURPRISE_MOVIES.length);
  };

  return (
    <div
      id="surprise-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="surprise-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b1b20] border border-white/10 max-w-lg w-full rounded-3xl p-6 sm:p-7 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2a292e] hover:bg-[#353439] flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close Surprise Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-xs font-bold mb-4 font-display">
          <Dices className="w-4 h-4" />
          <span>🎲 Spontaneous CineMind Choice</span>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 relative bg-[#2a292e] shadow-lg">
          <img
            src={currentMovie.posterUrl}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-bold text-[#7bd0ff] flex items-center gap-1 border border-white/10">
            <Star className="w-3.5 h-3.5 fill-[#7bd0ff]" />
            <span>
              {currentMovie.tmdbRating}/10 • {currentMovie.runtimeMinutes} min
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white font-display">
          {currentMovie.title} ({currentMovie.year})
        </h3>
        <p className="text-xs sm:text-sm text-[#ccc3d8] mt-2 leading-relaxed">
          {currentMovie.synopsis}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
          <button
            type="button"
            onClick={handleSurpriseAgain}
            className="px-4 py-2.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-white/5"
          >
            <RefreshCw className="w-4 h-4 text-[#d2bbff]" />
            <span>Surprise Me Again</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleWatchlist(currentMovie)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer font-display ${
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
    </div>
  );
};
