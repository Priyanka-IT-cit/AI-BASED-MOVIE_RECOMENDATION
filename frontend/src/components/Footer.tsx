import React from 'react';

export const Footer: React.FC = () => {
  return (
    <>
      <footer
        id="main-footer"
        className="w-full bg-[#0e0e12] py-12 border-t border-white/5 z-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-lg font-bold text-white font-display tracking-tight">
              CineMind<span className="text-[#d2bbff]">AI</span>
            </span>
            <span className="text-[#958da1] text-xs sm:text-sm">
              — Your Personal AI Movie Discovery Assistant
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#958da1]">
            <span>Vector Similarity Engine</span>
            <span>Knowledge Graph v2.4</span>
            <span className="text-[#ccc3d8]">© 2025 CineMind AI</span>
          </div>
        </div>
      </footer>

      {/* Persistent Floating Bottom Pill Badge */}
      <div
        id="floating-corpus-badge"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-2.5 bg-[#2a292e]/85 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(124,58,237,0.25)] hover:border-purple-400/30 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-[#7bd0ff] shadow-[0_0_8px_#7bd0ff] animate-pulse" />
          <span className="text-xs font-semibold text-white font-display">4,803 Movies</span>
          <span className="text-[#958da1]">•</span>
          <span className="text-xs text-[#ccc3d8]">TF-IDF Vectorized</span>
          <span className="text-[#958da1]">•</span>
          <span className="text-xs font-semibold text-[#7bd0ff] font-display">
            TMDB Knowledge Graph
          </span>
        </div>
      </div>
    </>
  );
};
