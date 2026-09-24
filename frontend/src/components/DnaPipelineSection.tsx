import React from 'react';
import { GitFork, Cpu, Dices, Shuffle, CheckCircle, Database } from 'lucide-react';

interface DnaPipelineSectionProps {
  onOpenSurprise: () => void;
}

export const DnaPipelineSection: React.FC<DnaPipelineSectionProps> = ({
  onOpenSurprise,
}) => {
  return (
    <section id="section-dna" className="space-y-6 scroll-mt-24">
      {/* CineMind DNA Taste Snapshot Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar / Taste Card */}
        <div className="lg:col-span-5 bg-[#1b1b20] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#d2bbff] mb-1 font-display">
              <Cpu className="w-4 h-4" />
              <span>CineMind Movie DNA Analysis</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Your Psychological Taste Profile
            </h3>
            <p className="text-xs sm:text-sm text-[#ccc3d8] mt-1">
              Constructed from your historical session vectors and clue selections.
            </p>
          </div>

          {/* SVG Vector Taste Radar Graphic */}
          <div className="py-6 flex items-center justify-center">
            <svg
              className="w-52 h-52 text-[#d2bbff]"
              viewBox="0 0 200 200"
              fill="none"
              aria-label="CineMind Taste Profile Radar Chart"
            >
              {/* Concentric Web Polygons */}
              <polygon
                points="100,20 176,57 176,143 100,180 24,143 24,57"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="1.5"
              />
              <polygon
                points="100,50 148,73 148,127 100,150 52,127 52,73"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              <polygon
                points="100,75 124,87 124,113 100,125 76,113 76,87"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="1"
              />

              {/* Polar Axes */}
              <line x1="100" y1="100" x2="100" y2="20" stroke="currentColor" strokeOpacity="0.25" />
              <line x1="100" y1="100" x2="176" y2="57" stroke="currentColor" strokeOpacity="0.25" />
              <line x1="100" y1="100" x2="176" y2="143" stroke="currentColor" strokeOpacity="0.25" />
              <line x1="100" y1="100" x2="100" y2="180" stroke="currentColor" strokeOpacity="0.25" />
              <line x1="100" y1="100" x2="24" y2="143" stroke="currentColor" strokeOpacity="0.25" />
              <line x1="100" y1="100" x2="24" y2="57" stroke="currentColor" strokeOpacity="0.25" />

              {/* Filled Taste Polygon */}
              <polygon
                points="100,32 168,68 152,130 100,165 40,120 35,62"
                fill="currentColor"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeWidth="2.5"
              />

              {/* Data Point Dots */}
              <circle cx="100" cy="32" r="4" className="fill-[#7bd0ff]" />
              <circle cx="168" cy="68" r="4" className="fill-[#7bd0ff]" />
              <circle cx="152" cy="130" r="4" className="fill-[#7bd0ff]" />
              <circle cx="100" cy="165" r="4" className="fill-[#7bd0ff]" />
              <circle cx="40" cy="120" r="4" className="fill-[#7bd0ff]" />
              <circle cx="35" cy="62" r="4" className="fill-[#7bd0ff]" />
            </svg>
          </div>

          {/* DNA Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#2a292e] p-3 rounded-xl border border-white/5">
              <span className="text-[#958da1]">Top Mood:</span>
              <span className="text-[#d2bbff] font-bold block mt-0.5">Mindblown (42%)</span>
            </div>
            <div className="bg-[#2a292e] p-3 rounded-xl border border-white/5">
              <span className="text-[#958da1]">Favorite Genre:</span>
              <span className="text-[#7bd0ff] font-bold block mt-0.5">Sci-Fi / Thriller (38%)</span>
            </div>
            <div className="bg-[#2a292e] p-3 rounded-xl border border-white/5">
              <span className="text-[#958da1]">Ideal Length:</span>
              <span className="text-[#c0c1ff] font-bold block mt-0.5">118 – 148 min</span>
            </div>
            <div className="bg-[#2a292e] p-3 rounded-xl border border-white/5">
              <span className="text-[#958da1]">Night Archetype:</span>
              <span className="text-white font-bold block mt-0.5">Friends & Debate</span>
            </div>
          </div>
        </div>

        {/* Architecture Flow Pipeline Card */}
        <div className="lg:col-span-7 bg-[#1b1b20] border border-white/5 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7bd0ff] mb-1 font-display">
              <Database className="w-4 h-4" />
              <span>Explainable AI Infrastructure</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              How CineMind Vectorizes Cinema
            </h3>
            <p className="text-xs sm:text-sm text-[#ccc3d8] mt-1">
              Our natural language discovery pipeline bridges raw human sentiment with TMDB 5,000 feature spaces.
            </p>
          </div>

          {/* Step-by-Step Architecture Pipeline */}
          <div className="space-y-3 py-6">
            <div className="p-3.5 rounded-xl bg-[#2a292e] border border-white/5 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-xs shrink-0 font-display">
                1
              </span>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  Sentiment & Prompt Tokenization
                </div>
                <div className="text-xs text-[#ccc3d8]">
                  Extracts entities, mood adjectives, and memory cues from conversational input.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#2a292e] border border-white/5 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#006e95] text-white flex items-center justify-center font-bold text-xs shrink-0 font-display">
                2
              </span>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  TF-IDF & Dense Vector Projection
                </div>
                <div className="text-xs text-[#ccc3d8]">
                  Projects keywords into multidimensional semantic space across 4,803 TMDB films.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#2a292e] border border-white/5 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#3131c0] text-white flex items-center justify-center font-bold text-xs shrink-0 font-display">
                3
              </span>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  Multi-Weight Cosine Scoring
                </div>
                <div className="text-xs text-[#ccc3d8]">
                  Calculates angular distance: 40% plot clue, 30% cast/crew, 20% mood, 10% runtime constraint.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#2a292e] border border-white/5 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#353439] text-[#d2bbff] flex items-center justify-center font-bold text-xs shrink-0 font-display">
                4
              </span>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  Smart Typo Resilience Engine
                </div>
                <div className="text-xs text-[#ccc3d8]">
                  Fuzzy string metrics auto-correct queries ("Incepton" → "Inception").
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2a292e]/60 p-3 rounded-xl flex items-center justify-between text-xs text-[#958da1] border border-white/5">
            <span>Model weights updated 14m ago</span>
            <span className="text-[#7bd0ff] font-semibold">v2.4.8 Production Neural Node</span>
          </div>
        </div>
      </div>

      {/* Surprise Me Feature Showcase Card */}
      <div className="bg-gradient-to-r from-[#1b1b20] via-[#2a292e] to-[#1b1b20] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed]/30 text-[#d2bbff] text-xs font-bold font-display">
            <Dices className="w-4 h-4" />
            <span>Spontaneous Cinema Discovery</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Paralyzed by infinite choice?
          </h3>
          <p className="text-sm text-[#ccc3d8] leading-relaxed">
            Let CineMind generate a high-confidence surprise masterpiece customized to current critically acclaimed gems.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenSurprise}
          className="h-12 px-6 rounded-xl bg-[#d2bbff] hover:bg-[#c0c1ff] text-[#3f008e] font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-purple-400/20 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer font-display shrink-0"
        >
          <Shuffle className="w-5 h-5" />
          <span>🎲 Surprise Me Now</span>
        </button>
      </div>
    </section>
  );
};
