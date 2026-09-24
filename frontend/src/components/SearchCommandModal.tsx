import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { Search, X, Film, ArrowRight, Star } from 'lucide-react';

interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredMovies = movies.filter((m) => {
    const q = query.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q)) ||
      m.cast.some((c) => c.toLowerCase().includes(q)) ||
      m.synopsis.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="search-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b1b20] border border-white/10 max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search input header */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#958da1]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, directors, actors, or themes..."
            className="flex-1 bg-transparent text-white text-base focus:outline-none placeholder-[#958da1]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#958da1] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-0.5 bg-[#2a292e] rounded text-xs font-semibold text-[#958da1]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1.5">
          {filteredMovies.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#958da1]">
              No matching titles found in vector database for "{query}"
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="p-3 rounded-2xl hover:bg-[#2a292e] flex items-center justify-between gap-3 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-12 rounded-lg bg-[#2a292e] overflow-hidden shrink-0">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-[#d2bbff] transition-colors truncate font-display">
                      {movie.title} ({movie.year})
                    </div>
                    <div className="text-xs text-[#958da1] truncate">
                      {movie.genres.join(', ')} • Dir. {movie.director}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-[#7c3aed]/20 text-[#d2bbff] text-[11px] font-bold">
                    {movie.matchScore}%
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#958da1] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
