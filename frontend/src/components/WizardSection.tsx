import React, { useState } from 'react';
import { WizardState, MoodType, NightMode } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Film,
  Star,
  Users,
  Clock,
  User,
  Heart,
  Baby,
  X,
  Check,
  RefreshCw,
} from 'lucide-react';

interface WizardSectionProps {
  wizardState: WizardState;
  onChangeState: (updater: (prev: WizardState) => WizardState) => void;
  onSynthesize: () => void;
  isProcessing: boolean;
}

export const WizardSection: React.FC<WizardSectionProps> = ({
  wizardState,
  onChangeState,
  onSynthesize,
  isProcessing,
}) => {
  const {
    currentStep,
    selectedMood,
    selectedGenres,
    anchorMovie,
    selectedStars,
    nightMode,
    maxRuntime,
  } = wizardState;

  const totalSteps = 5;

  const moods: { type: MoodType; emoji: string; title: string; desc: string }[] = [
    { type: 'Happy', emoji: '😊', title: 'Happy', desc: 'Upbeat & light' },
    { type: 'Cathartic', emoji: '😢', title: 'Cathartic', desc: 'Deep tears' },
    { type: 'Romantic', emoji: '❤️', title: 'Romantic', desc: 'Intimate pull' },
    { type: 'Thrilled', emoji: '⚡', title: 'Thrilled', desc: 'High octane' },
    { type: 'Expansive', emoji: '🏔️', title: 'Expansive', desc: 'Epic journey' },
    { type: 'Chilled', emoji: '👻', title: 'Chilled', desc: 'Eerie suspense' },
    { type: 'Mindblown', emoji: '🤯', title: 'Mindblown', desc: 'Twists & paradoxes' },
  ];

  const genres = [
    'Sci-Fi',
    'Mystery',
    'Psychological Thriller',
    'Drama',
    'Crime',
    'Cyberpunk',
    'Adventure',
    'Action',
  ];

  const popularAnchors = [
    'Inception',
    'Blade Runner 2049',
    'Arrival',
    'Shutter Island',
    'Coherence',
    'Interstellar',
  ];

  const popularStars = [
    'Leonardo DiCaprio',
    'Matthew McConaughey',
    'Christian Bale',
    'Emma Stone',
    'Scarlett Johansson',
    'Cillian Murphy',
    'Amy Adams',
    'Ryan Gosling',
  ];

  const nightModes: {
    mode: NightMode;
    title: string;
    sub: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      mode: 'Solo',
      title: 'Alone',
      sub: 'Deep Focus',
      desc: 'Just me, full immersion',
      icon: <User className="w-6 h-6 text-[#958da1]" />,
    },
    {
      mode: 'Partner',
      title: 'With Partner',
      sub: 'Date Night',
      desc: 'Engaging, memorable dialogue',
      icon: <Heart className="w-6 h-6 text-[#c0c1ff]" />,
    },
    {
      mode: 'Friends',
      title: 'With Friends',
      sub: 'Crowd Pleaser',
      desc: 'Thrilling, discussion-fueling',
      icon: <Users className="w-6 h-6 text-[#d2bbff]" />,
    },
    {
      mode: 'Family',
      title: 'Family',
      sub: 'All Audiences',
      desc: 'Wholesome, universally loved',
      icon: <Baby className="w-6 h-6 text-[#7bd0ff]" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      onChangeState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      onSynthesize();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      onChangeState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const toggleGenre = (genre: string) => {
    onChangeState((prev) => {
      const exists = prev.selectedGenres.includes(genre);
      return {
        ...prev,
        selectedGenres: exists
          ? prev.selectedGenres.filter((g) => g !== genre)
          : [...prev.selectedGenres, genre],
      };
    });
  };

  const toggleStar = (star: string) => {
    onChangeState((prev) => {
      const exists = prev.selectedStars.includes(star);
      return {
        ...prev,
        selectedStars: exists
          ? prev.selectedStars.filter((s) => s !== star)
          : [...prev.selectedStars, star],
      };
    });
  };

  return (
    <section id="section-wizard" className="space-y-6 scroll-mt-24">
      <div className="bg-[#1b1b20] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header & Stepper Line */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div>
            <span className="text-[11px] font-bold text-[#d2bbff] uppercase tracking-widest font-display">
              Interactive Discovery Wizard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-display">
              What do you feel like watching?
            </h2>
          </div>

          <div
            id="wizard-step-badge"
            className="flex items-center gap-2 bg-[#2a292e] px-4 py-2 rounded-full border border-white/5 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#d2bbff] animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Step {currentStep} of {totalSteps} Active
            </span>
          </div>
        </div>

        {/* Visual Stepper Progress Track */}
        <div className="grid grid-cols-5 gap-2 py-2 mb-8">
          {[1, 2, 3, 4, 5].map((step) => {
            const isFilled = step <= currentStep;
            return (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isFilled
                    ? 'bg-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.5)]'
                    : 'bg-[#2a292e]'
                }`}
              />
            );
          })}
        </div>

        {/* Step Container Panels */}
        <div className="min-h-[340px]">
          {/* STEP 1: MOOD & GENRE */}
          {currentStep === 1 && (
            <div id="step-panel-1" className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Select your current mood:</h3>
                <p className="text-sm text-[#ccc3d8] mt-1">
                  We align emotional vectors from film dialogue, color grading, and soundtrack motifs.
                </p>
              </div>

              {/* Mood Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {moods.map((m) => {
                  const isSelected = selectedMood === m.type;
                  return (
                    <button
                      key={m.type}
                      id={`mood-btn-${m.type.toLowerCase()}`}
                      onClick={() => onChangeState((prev) => ({ ...prev, selectedMood: m.type }))}
                      type="button"
                      className={`group p-3.5 rounded-2xl transition-all text-center flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer border ${
                        isSelected
                          ? 'bg-[#7c3aed]/40 border-purple-400 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] scale-[1.03]'
                          : 'bg-[#2a292e] hover:bg-[#353439] border-white/5 text-[#e4e1e8]'
                      }`}
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-200">
                        {m.emoji}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? 'text-[#d2bbff]' : 'text-white'
                        } font-display`}
                      >
                        {m.title}
                      </span>
                      <span className="text-[11px] text-[#958da1]">{m.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Genre Affinity Chips */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#958da1] uppercase tracking-wider block mb-2 font-display">
                  Optional genre affinity:
                </span>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        id={`genre-chip-${genre.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => toggleGenre(genre)}
                        type="button"
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#7c3aed] text-white border-purple-400 shadow-md shadow-purple-900/40'
                            : 'bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] hover:text-white border-white/5'
                        }`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BASE MOVIE ANCHOR */}
          {currentStep === 2 && (
            <div id="step-panel-2" className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Anchor with a reference movie (Optional):
                </h3>
                <p className="text-sm text-[#ccc3d8] mt-1">
                  The AI will transfer thematic, visual, and narrative vectors from this anchor.
                </p>
              </div>

              <div className="relative max-w-xl">
                <Film className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#958da1]" />
                <input
                  id="base-movie-input"
                  type="text"
                  value={anchorMovie}
                  onChange={(e) =>
                    onChangeState((prev) => ({ ...prev, anchorMovie: e.target.value }))
                  }
                  placeholder="e.g. Inception, Arrival, The Prestige..."
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[#2a292e] text-white placeholder-[#958da1] text-sm sm:text-base border border-white/10 focus:outline-none focus:border-purple-400 focus:bg-[#353439] shadow-inner transition-all"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#958da1] uppercase tracking-wider block font-display">
                  Popular thematic anchors:
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularAnchors.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() =>
                        onChangeState((prev) => ({ ...prev, anchorMovie: title }))
                      }
                      className="px-3.5 py-1.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] hover:text-white text-xs sm:text-sm font-medium border border-white/5 transition-all cursor-pointer"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="skip-anchor-btn"
                  type="button"
                  onClick={() =>
                    onChangeState((prev) => ({
                      ...prev,
                      anchorMovie: 'None (Unconstrained Vector Discovery)',
                    }))
                  }
                  className="text-xs sm:text-sm text-[#7bd0ff] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Skip anchor movie — give me completely fresh discovery</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STARS & CAST */}
          {currentStep === 3 && (
            <div id="step-panel-3" className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Include or prioritize favorite stars:
                </h3>
                <p className="text-sm text-[#ccc3d8] mt-1">
                  Weight the collaborative filtering algorithm toward specific cinematic presences.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {popularStars.map((star) => {
                  const isSelected = selectedStars.includes(star);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => toggleStar(star)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#7c3aed] text-white border-purple-400 shadow-md shadow-purple-900/40'
                          : 'bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] hover:text-white border-white/5'
                      }`}
                    >
                      {isSelected ? <Star className="w-3.5 h-3.5 fill-white text-white" /> : null}
                      <span>{star}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  id="no-star-pref-btn"
                  type="button"
                  onClick={() => onChangeState((prev) => ({ ...prev, selectedStars: [] }))}
                  className="px-4 py-2 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] hover:text-white text-xs sm:text-sm font-semibold border border-white/5 transition-all cursor-pointer"
                >
                  Clear star preferences (Cast agnostic)
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MOVIE NIGHT MODE */}
          {currentStep === 4 && (
            <div id="step-panel-4" className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Who is gathering tonight?</h3>
                <p className="text-sm text-[#ccc3d8] mt-1">
                  We adjust pacing, complexity, and age ratings to match the room.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nightModes.map((item) => {
                  const isSelected = nightMode === item.mode;
                  return (
                    <button
                      key={item.mode}
                      type="button"
                      onClick={() =>
                        onChangeState((prev) => ({ ...prev, nightMode: item.mode }))
                      }
                      className={`p-5 rounded-2xl text-left flex flex-col justify-between h-36 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#7c3aed]/35 border-purple-400 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] scale-[1.02]'
                          : 'bg-[#2a292e] hover:bg-[#353439] border-white/5 text-[#ccc3d8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {item.icon}
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-[#d2bbff]' : 'text-[#958da1]'
                          }`}
                        >
                          {item.sub}
                        </span>
                      </div>
                      <div>
                        <div
                          className={`text-base font-bold font-display ${
                            isSelected ? 'text-white' : 'text-[#e4e1e8]'
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs text-[#958da1] mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: RUNTIME & SYNTHESIS */}
          {currentStep === 5 && (
            <div id="step-panel-5" className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Target Runtime Window:</h3>
                <p className="text-sm text-[#ccc3d8] mt-1">
                  Narrow down films based on how much evening you have left.
                </p>
              </div>

              {/* Runtime Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: '< 90 min', val: 90 },
                  { label: '90 – 110 min', val: 110 },
                  { label: '110 – 150 min', val: 148 },
                  { label: '150+ min (Epic)', val: 180 },
                ].map((preset) => {
                  const isSelected = maxRuntime === preset.val;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        onChangeState((prev) => ({ ...prev, maxRuntime: preset.val }))
                      }
                      className={`p-3.5 rounded-xl text-center text-sm font-bold border transition-all cursor-pointer font-display ${
                        isSelected
                          ? 'bg-[#7c3aed] text-white border-purple-400 shadow-lg'
                          : 'bg-[#2a292e] hover:bg-[#353439] text-[#ccc3d8] border-white/5'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Ceiling Slider */}
              <div className="bg-[#2a292e] p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-[#ccc3d8]">Exact runtime ceiling:</span>
                  <span className="text-[#d2bbff] text-base font-bold font-display">
                    {maxRuntime} minutes
                  </span>
                </div>
                <input
                  id="runtime-slider"
                  type="range"
                  min="80"
                  max="210"
                  value={maxRuntime}
                  onChange={(e) =>
                    onChangeState((prev) => ({
                      ...prev,
                      maxRuntime: parseInt(e.target.value, 10),
                    }))
                  }
                  className="w-full accent-[#7c3aed] h-2 bg-[#1b1b20] rounded-lg cursor-pointer"
                />
              </div>

              {/* Active Synthesis Query Summary Box */}
              <div className="bg-[#0e0e12]/90 border border-white/5 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-widest block font-display">
                    Active Synthesis Query
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#2a292e] text-[#d2bbff] text-xs font-semibold border border-white/5">
                      Mood: {selectedMood}
                    </span>
                    {selectedGenres.length > 0 && (
                      <span className="px-2.5 py-1 rounded-md bg-[#2a292e] text-[#7bd0ff] text-xs font-semibold border border-white/5">
                        Genres: {selectedGenres.slice(0, 2).join(', ')}
                      </span>
                    )}
                    {anchorMovie && (
                      <span className="px-2.5 py-1 rounded-md bg-[#2a292e] text-[#c0c1ff] text-xs font-semibold border border-white/5">
                        Anchor: {anchorMovie.split('(')[0].trim()}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-[#2a292e] text-[#ccc3d8] text-xs font-semibold border border-white/5">
                      Mode: {nightMode} Night
                    </span>
                  </div>
                </div>

                <button
                  id="btn-run-recommendation"
                  type="button"
                  onClick={onSynthesize}
                  className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#006e95] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/30 hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer border border-purple-400/20"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Synthesize Matches</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Navigation Footer */}
        <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/5">
          <button
            id="wizard-prev-btn"
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-5 py-2.5 rounded-xl bg-[#2a292e] text-[#ccc3d8] font-semibold text-sm flex items-center gap-2 transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#353439] hover:text-white cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            id="wizard-next-btn"
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#d2bbff] hover:bg-[#c0c1ff] text-[#3f008e] font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-display"
          >
            <span>{currentStep === totalSteps ? 'Synthesize Matches' : 'Continue'}</span>
            {currentStep === totalSteps ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Processing State Banner */}
      {isProcessing && (
        <div
          id="recs-processing-banner"
          className="bg-[#1b1b20] border border-purple-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7c3aed]/20 text-[#d2bbff]">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Executing TF-IDF Cosine Embedding...
          </h3>
          <div className="max-w-md mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-[#958da1]">
            <span className="text-[#7bd0ff]">Vectorizing Mood</span>
            <span className="text-[#7bd0ff]">Clustering Dialogue</span>
            <span className="text-[#7bd0ff]">Pruning Runtimes</span>
            <span className="text-[#d2bbff] animate-pulse">Sorting Ranks</span>
          </div>
        </div>
      )}
    </section>
  );
};
