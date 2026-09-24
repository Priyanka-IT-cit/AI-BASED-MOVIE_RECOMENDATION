import React from 'react';
import { Movie } from '../types';
import { X, Star, ArrowUpDown } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, movies }) => {
  if (!isOpen) return null;

  const compareMovies = movies.slice(0, 3);

  return (
    <div
      id="compare-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="compare-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b1b20] border border-white/10 max-w-4xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest font-display">
              Decision Matrix
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Compare Top Pick Candidates
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#2a292e] hover:bg-[#353439] flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close Comparison Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {compareMovies.map((movie, index) => {
            const badgeLabel =
              index === 0 ? '🥇 Best Match' : index === 1 ? '🥈 2nd Pick' : '🥉 3rd Pick';
            const badgeColor =
              index === 0
                ? 'bg-[#7c3aed] text-white'
                : index === 1
                ? 'bg-[#006e95] text-white'
                : 'bg-[#3131c0] text-white';

            return (
              <div
                key={movie.id}
                className="bg-[#2a292e] p-5 rounded-2xl space-y-4 border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-2 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-bold font-display ${badgeColor}`}
                  >
                    {badgeLabel}
                  </span>
                  <h4 className="text-xl font-bold text-white font-display">{movie.title}</h4>
                  <div className="text-sm font-bold text-[#7bd0ff]">{movie.matchScore}% Match Score</div>
                </div>

                <div className="text-xs text-[#ccc3d8] space-y-2.5 pt-4 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-[#958da1]">Director:</span>
                    <span className="font-semibold text-white">{movie.director}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#958da1]">Runtime:</span>
                    <span className="font-semibold text-white">{movie.runtimeMinutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#958da1]">TMDB Rating:</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#d2bbff] text-[#d2bbff]" />
                      {movie.tmdbRating} / 10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#958da1]">Pacing:</span>
                    <span className="font-semibold text-white">{movie.pacing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#958da1]">Vibe:</span>
                    <span className="font-semibold text-[#7bd0ff]">{movie.vibe}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
