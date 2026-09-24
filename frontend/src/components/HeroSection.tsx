import React from 'react';
import { Sparkles, Brain, Film, Dices, Database, GitFork, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface HeroSectionProps {
  onFindFromClue: () => void;
  onWhatShouldIWatch: () => void;
  onSurpriseMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindFromClue,
  onWhatShouldIWatch,
  onSurpriseMe,
}) => {
  return (
    <section id="hero-section" className="relative pt-8 sm:pt-12 text-center flex flex-col items-center">
      {/* Ambient background bloom halos */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-[#7c3aed]/20 via-[#006e95]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* High-Tech Badge */}
      <div
        id="hero-tech-badge"
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2a292e]/80 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/40 mb-6 hover:border-purple-400/30 transition-all cursor-default"
      >
        <span className="w-2 h-2 rounded-full bg-[#7bd0ff] animate-ping" />
        <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-widest font-display">
          ✦ AI-POWERED MOVIE DISCOVERY • TMDB 5,000 DATASET
        </span>
      </div>

      {/* Main Headline with Typographic Drama */}
      <h1
        id="hero-main-headline"
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] font-display"
      >
        What movie are you <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-[#d2bbff] via-[#7bd0ff] to-[#eaddff] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(124,58,237,0.35)]">
          looking for?
        </span>
      </h1>

      {/* Subtitle */}
      <p
        id="hero-subtitle"
        className="mt-5 text-base sm:text-lg text-[#ccc3d8] max-w-2xl mx-auto font-normal leading-relaxed"
      >
        Tell CineMind what you remember — or tell us how you feel. Our AI assistant analyzes 4,803 films, dialogues, and mood vectors to pinpoint your exact match.
      </p>

      {/* Tagline Callout */}
      <div
        id="hero-tagline"
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#d2bbff]"
      >
        <Sparkles className="w-4 h-4 text-[#d2bbff]" />
        <span>Don't just remember the movie. Let CineMind find it.</span>
      </div>

      {/* Action Hero CTAs */}
      <div id="hero-cta-group" className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          id="cta-find-clue"
          onClick={onFindFromClue}
          type="button"
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3131c0] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-purple-400/20"
        >
          <Brain className="w-5 h-5" />
          <span>Find From a Clue</span>
        </button>

        <button
          id="cta-discover"
          onClick={onWhatShouldIWatch}
          type="button"
          className="h-12 px-6 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-lg border border-white/10 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          <Film className="w-5 h-5 text-[#7bd0ff]" />
          <span>What Should I Watch?</span>
        </button>

        <button
          id="cta-quick-surprise"
          onClick={onSurpriseMe}
          type="button"
          className="h-12 px-5 rounded-xl bg-[#1b1b20] hover:bg-[#2a292e] text-[#ccc3d8] hover:text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-md border border-white/5 transition-all cursor-pointer"
        >
          <Dices className="w-5 h-5 text-[#d2bbff]" />
          <span>Surprise Me</span>
        </button>
      </div>

      {/* Stats Ticker Bar */}
      <div
        id="hero-stats-ticker"
        className="mt-10 sm:mt-12 w-full max-w-4xl bg-[#1b1b20]/75 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-around gap-6 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#d2bbff]">
            <Database className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-lg font-bold text-white font-display">4,803 Titles</div>
            <div className="text-xs text-[#958da1]">Vectorized Corpus</div>
          </div>
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#7bd0ff]">
            <GitFork className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-lg font-bold text-white font-display">Cosine Similarity</div>
            <div className="text-xs text-[#958da1]">Semantic Projection</div>
          </div>
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#c0c1ff]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-base sm:text-lg font-bold text-white font-display">94.8% Accuracy</div>
            <div className="text-xs text-[#958da1]">Natural Clue Recognition</div>
          </div>
        </div>
      </div>
    </section>
  );
};
