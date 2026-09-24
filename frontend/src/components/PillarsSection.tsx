import React from 'react';
import { Compass, Fingerprint, ArrowRight } from 'lucide-react';

interface PillarsSectionProps {
  onSelectDiscover: () => void;
  onSelectClue: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  onSelectDiscover,
  onSelectClue,
}) => {
  return (
    <section id="pillars-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
      {/* Pillar A: Discover */}
      <div
        id="pillar-discover-card"
        onClick={onSelectDiscover}
        className="group relative rounded-3xl bg-[#1b1b20] hover:bg-[#1f1f24] border border-white/5 hover:border-purple-500/30 p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#7c3aed]/15 rounded-full blur-3xl group-hover:bg-[#7c3aed]/25 transition-all pointer-events-none" />

        <div>
          <div className="w-14 h-14 rounded-2xl bg-[#2a292e] border border-white/10 flex items-center justify-center text-[#d2bbff] shadow-inner mb-6 group-hover:scale-110 group-hover:border-purple-400/40 transition-all">
            <Compass className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest font-display">
            Pillar 01 • Dynamic Match
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
            Discover a Movie
          </h2>
          <p className="text-sm sm:text-base text-[#ccc3d8] mt-2 max-w-md leading-relaxed font-normal">
            I know the mood I crave. Guide the AI using mood spectrums, companions, target runtimes, and favorite actors.
          </p>
        </div>

        <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/5">
          <span className="text-sm font-semibold text-white group-hover:text-[#d2bbff] flex items-center gap-2 transition-colors">
            Start 6-Step Discover
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </span>
          <span className="px-3 py-1 rounded-full bg-[#353439] text-[#ccc3d8] text-xs font-semibold border border-white/5">
            6-Step Flow
          </span>
        </div>
      </div>

      {/* Pillar B: Clue Detective */}
      <div
        id="pillar-clue-card"
        onClick={onSelectClue}
        className="group relative rounded-3xl bg-[#1b1b20] hover:bg-[#1f1f24] border border-white/5 hover:border-sky-500/30 p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#006e95]/15 rounded-full blur-3xl group-hover:bg-[#006e95]/25 transition-all pointer-events-none" />

        <div>
          <div className="w-14 h-14 rounded-2xl bg-[#2a292e] border border-white/10 flex items-center justify-center text-[#7bd0ff] shadow-inner mb-6 group-hover:scale-110 group-hover:border-sky-400/40 transition-all">
            <Fingerprint className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-widest font-display">
            Pillar 02 • Clue Detective
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
            Find From a Clue
          </h2>
          <p className="text-sm sm:text-base text-[#ccc3d8] mt-2 max-w-md leading-relaxed font-normal">
            I remember a scene, dialogue, song, or actor, but forgot the title. CineMind will reverse-search movie memory graphs.
          </p>
        </div>

        <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/5">
          <span className="text-sm font-semibold text-white group-hover:text-[#7bd0ff] flex items-center gap-2 transition-colors">
            Unravel My Clue
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </span>
          <span className="px-3 py-1 rounded-full bg-[#353439] text-[#7bd0ff] text-xs font-semibold border border-white/5">
            Autonomous Engine
          </span>
        </div>
      </div>
    </section>
  );
};
