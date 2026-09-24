import React, { useState } from 'react';
import { Search, Dices, Bookmark, Sparkles, Menu, X, Clapperboard, Film } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'wizard' | 'clue' | 'dna';
  onSelectTab: (tab: 'home' | 'wizard' | 'clue' | 'dna') => void;
  onOpenSearch: () => void;
  onOpenSurprise: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenSurprise,
  onOpenWatchlist,
  watchlistCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home', action: () => onSelectTab('home') },
    { label: 'Discover', id: 'wizard', action: () => onSelectTab('wizard') },
    { label: 'Find From a Clue', id: 'clue', action: () => onSelectTab('clue') },
    { label: 'Recommendations', id: 'recs', action: () => onSelectTab('wizard') },
    { label: 'Watchlist', id: 'watchlist', action: onOpenWatchlist },
    { label: 'Movie DNA', id: 'dna', action: () => onSelectTab('dna') },
    { label: 'About AI', id: 'about', action: () => onSelectTab('dna') },
  ];

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-40 bg-[#0e0e12]/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all"
    >
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <button
            id="header-brand-btn"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3131c0] p-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#131317] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#d2bbff]" />
              </div>
            </div>
            <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1 font-display">
              CineMind
              <span className="text-[#d2bbff] drop-shadow-[0_0_12px_rgba(124,58,237,0.85)]">AI</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                (link.id === 'home' && activeTab === 'home') ||
                (link.id === 'wizard' && activeTab === 'wizard') ||
                (link.id === 'clue' && activeTab === 'clue') ||
                (link.id === 'dna' && activeTab === 'dna');

              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.id}`}
                  onClick={link.action}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2a292e] text-white font-semibold shadow-inner'
                      : 'text-[#ccc3d8] hover:text-white hover:bg-[#1f1f24]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Surprise Me, Watchlist & User Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            id="header-search-trigger"
            onClick={onOpenSearch}
            className="hidden md:flex items-center bg-[#1b1b20]/90 hover:bg-[#2a292e] rounded-xl px-3.5 py-2 border border-white/5 shadow-inner transition-all group"
          >
            <Search className="w-4 h-4 text-[#958da1] group-hover:text-white mr-2.5 transition-colors" />
            <span className="text-xs text-[#958da1] group-hover:text-white/80 w-36 lg:w-48 text-left transition-colors">
              Search titles, clues...
            </span>
            <span className="ml-2 px-1.5 py-0.5 bg-[#353439] rounded text-[10px] font-semibold text-[#958da1] tracking-wider border border-white/5">
              ⌘K
            </span>
          </button>

          {/* Surprise Me CTA */}
          <button
            id="header-surprise-btn"
            onClick={onOpenSurprise}
            type="button"
            className="flex items-center gap-2 bg-[#2a292e] hover:bg-[#353439] text-[#e4e1e8] hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-[0_0_16px_rgba(124,58,237,0.15)] hover:shadow-[0_0_20px_rgba(124,58,237,0.35)] border border-white/5 cursor-pointer"
          >
            <Dices className="w-4 h-4 text-[#d2bbff]" />
            <span className="hidden sm:inline font-display">Surprise Me</span>
          </button>

          {/* Watchlist Counter */}
          <button
            id="header-watchlist-btn"
            onClick={onOpenWatchlist}
            type="button"
            className="flex items-center gap-2 bg-[#2a292e] hover:bg-[#353439] text-[#e4e1e8] hover:text-white px-3 py-2 rounded-xl transition-all border border-white/5 cursor-pointer"
            aria-label="Open Watchlist"
          >
            <Bookmark className="w-4 h-4 text-[#7bd0ff]" />
            <span className="bg-[#7c3aed] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
              {watchlistCount}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div
            id="header-user-avatar"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#7bd0ff] p-[1.5px] cursor-pointer hover:scale-105 transition-transform"
            title="User Profile"
          >
            <div className="w-full h-full bg-[#1b1b20] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">CM</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#2a292e] text-[#ccc3d8] hover:text-white transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-[#131317] border-b border-white/10 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.action();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#ccc3d8] hover:text-white hover:bg-[#1f1f24] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1f1f24] text-[#958da1] text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search titles or clues</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
