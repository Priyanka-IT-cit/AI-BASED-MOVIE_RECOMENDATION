/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Movie, WizardState } from './types';
import { TOP_RECOMMENDATIONS, SURPRISE_MOVIES } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { WizardSection } from './components/WizardSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { ClueDetectiveSection } from './components/ClueDetectiveSection';
import { DnaPipelineSection } from './components/DnaPipelineSection';
import { CompareModal } from './components/CompareModal';
import { SurpriseModal } from './components/SurpriseModal';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { WatchlistModal } from './components/WatchlistModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { Sliders, Search, Dna } from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<'wizard' | 'clue' | 'dna'>('wizard');

  // Interactive Recommender Wizard state
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    selectedMood: 'Mindblown',
    selectedGenres: ['Sci-Fi'],
    anchorMovie: 'Interstellar (2014)',
    selectedStars: ['Leonardo DiCaprio', 'Matthew McConaughey'],
    nightMode: 'Friends',
    maxRuntime: 145,
  });

  // Data states
  const [movies, setMovies] = useState<Movie[]>(TOP_RECOMMENDATIONS);
  const [watchlist, setWatchlist] = useState<string[]>([
    'inception-2010',
    'arrival-2016',
    'shutter-island-2010',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Modals state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [selectedModalMovie, setSelectedModalMovie] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCompareOpen(false);
        setIsSurpriseOpen(false);
        setSelectedModalMovie(null);
        setIsWatchlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Watchlist toggle handler
  const handleToggleWatchlist = (movie: Movie) => {
    if (watchlist.includes(movie.id)) {
      setWatchlist((prev) => prev.filter((id) => id !== movie.id));
      addToast(`Removed "${movie.title}" from Watchlist`, 'info');
    } else {
      setWatchlist((prev) => [...prev, movie.id]);
      addToast(`Added "${movie.title}" to Watchlist!`, 'success');
    }
  };

  const handleRemoveFromWatchlist = (movieId: string) => {
    const movie = allCorpusMovies.find((m) => m.id === movieId);
    setWatchlist((prev) => prev.filter((id) => id !== movieId));
    if (movie) {
      addToast(`Removed "${movie.title}" from Watchlist`, 'info');
    }
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);
    addToast('Watchlist cleared', 'info');
  };

  // Connect frontend to FastAPI recommendation backend
const handleSynthesize = async () => {
  setIsProcessing(true);

  const resultsElem = document.getElementById('recommendation-results');
  resultsElem?.scrollIntoView({ behavior: 'smooth' });

  try {
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_title: wizardState.anchorMovie || null,
        mood: wizardState.selectedMood || null,
        max_runtime: wizardState.maxRuntime || null,
        language: 'en',
        top_n: 5,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.recommendations) {
      setMovies(data.recommendations);

      addToast(
        `AI found ${data.recommendations.length} movie recommendations!`,
        'success'
      );
    } else {
      throw new Error('No recommendations returned from backend.');
    }

    resultsElem?.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Recommendation API error:', error);

    addToast(
      'Could not connect to the movie recommendation backend.',
      'error'
    );
  } finally {
    setIsProcessing(false);
  }
};

  // Combined corpus for search and watchlist lookups
  const allCorpusMovies = [...TOP_RECOMMENDATIONS, ...SURPRISE_MOVIES];
  const watchlistMovies = allCorpusMovies.filter((m) => watchlist.includes(m.id));

  // Navigation tab click helper
  const handleSelectNavTab = (tab: 'home' | 'wizard' | 'clue' | 'dna') => {
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSection(tab);
      const targetElem = document.getElementById(
        tab === 'wizard'
          ? 'section-wizard'
          : tab === 'clue'
          ? 'section-clue'
          : 'section-dna'
      );
      targetElem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#131317] text-[#e4e1e8] font-sans antialiased flex flex-col relative selection:bg-[#7c3aed] selection:text-white">
      {/* Fixed Radial Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,58,237,0.18),transparent_70%)] z-0" />

      {/* Main Top Header */}
      <Header
        activeTab={activeSection}
        onSelectTab={handleSelectNavTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* 1. Brand & Hero Section */}
          <HeroSection
            onFindFromClue={() => {
              setActiveSection('clue');
              document
                .getElementById('section-clue')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            onWhatShouldIWatch={() => {
              setActiveSection('wizard');
              document
                .getElementById('section-wizard')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSurpriseMe={() => setIsSurpriseOpen(true)}
          />

          {/* 2. Two Prominent Entry Pillars */}
          <PillarsSection
            onSelectDiscover={() => {
              setActiveSection('wizard');
              document
                .getElementById('section-wizard')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectClue={() => {
              setActiveSection('clue');
              document
                .getElementById('section-clue')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Section Switcher Tabs */}
          <div id="section-switcher-tabs" className="flex items-center justify-center pt-2">
            <div className="bg-[#1b1b20] p-1.5 rounded-2xl border border-white/5 flex flex-wrap items-center justify-center gap-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => setActiveSection('wizard')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer font-display ${
                  activeSection === 'wizard'
                    ? 'bg-[#7c3aed] text-white shadow-lg shadow-purple-900/40'
                    : 'text-[#ccc3d8] hover:text-white hover:bg-[#2a292e]'
                }`}
              >
                <Sliders className="w-4 h-4 text-[#d2bbff]" />
                <span>1. 6-Step Recommender</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('clue')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer font-display ${
                  activeSection === 'clue'
                    ? 'bg-[#7c3aed] text-white shadow-lg shadow-purple-900/40'
                    : 'text-[#ccc3d8] hover:text-white hover:bg-[#2a292e]'
                }`}
              >
                <Search className="w-4 h-4 text-[#7bd0ff]" />
                <span>2. Clue Detective</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('dna')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer font-display ${
                  activeSection === 'dna'
                    ? 'bg-[#7c3aed] text-white shadow-lg shadow-purple-900/40'
                    : 'text-[#ccc3d8] hover:text-white hover:bg-[#2a292e]'
                }`}
              >
                <Dna className="w-4 h-4 text-[#c0c1ff]" />
                <span>3. CineMind DNA & Pipeline</span>
              </button>
            </div>
          </div>

          {/* Conditional / Tab Sections */}
          {activeSection === 'wizard' && (
            <>
              {/* 3. Interactive 6-Step Recommender Wizard */}
              <WizardSection
                wizardState={wizardState}
                onChangeState={setWizardState}
                onSynthesize={handleSynthesize}
                isProcessing={isProcessing}
              />

              {/* 4. Top 5 Curated Recommendations (Always accessible) */}
              <RecommendationsSection
                movies={movies}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
                onOpenCompare={() => setIsCompareOpen(true)}
                onSelectMovie={(movie) => setSelectedModalMovie(movie)}
              />
            </>
          )}

          {activeSection === 'clue' && (
            <ClueDetectiveSection
              onMovieResolved={(msg) => addToast(msg, 'success')}
              onSelectMovie={(movie) => setSelectedModalMovie(movie)}
              topMovie={movies[0]}
            />
          )}

          {activeSection === 'dna' && (
            <DnaPipelineSection onOpenSurprise={() => setIsSurpriseOpen(true)} />
          )}
        </div>
      </main>

      {/* Global Modals & Overlays */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        movies={movies}
      />

      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        watchlist={watchlist}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <MovieDetailsModal
        movie={selectedModalMovie}
        onClose={() => setSelectedModalMovie(null)}
        watchlist={watchlist}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistMovies={watchlistMovies}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
        onSelectMovie={(movie) => setSelectedModalMovie(movie)}
        onClearWatchlist={handleClearWatchlist}
      />

      <SearchCommandModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        movies={allCorpusMovies}
        onSelectMovie={(movie) => setSelectedModalMovie(movie)}
      />

      {/* Toast Feedback Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer & Persistent Floating Badges */}
      <Footer />
    </div>
  );
}
