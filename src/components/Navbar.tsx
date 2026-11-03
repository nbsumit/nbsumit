import React, { useEffect, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded-xl"
          aria-label="nbsumit homepage"
        >
          <BrandLogo size={32} showText={true} />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xs backdrop-blur-xs text-xs font-medium text-neutral-600 dark:text-neutral-400"
          aria-label="Main navigation"
        >
          {SITE_CONFIG.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Command Palette, Theme Toggle, Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Quick command launcher */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
            aria-label="Open command palette (Ctrl+K or ⌘K)"
            title="Press ⌘K or Ctrl+K anytime"
          >
            <Command className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-mono text-[11px]">K</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation links">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-850 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand();
              }}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Search sections & projects</span>
            </button>
            <span className="text-xs text-neutral-500 font-mono">@nbsumit</span>
          </div>
        </div>
      )}
    </header>
  );
};
