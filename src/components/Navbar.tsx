import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Command } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { SOCIAL_LINKS } from '../config/socials';
import { SocialIcon } from './SocialIcon';

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-semibold text-neutral-900 dark:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          aria-label="nbsumit homepage"
        >
          <img
            src="/nb-brand.png"
            alt="NB Brand Mark"
            className="w-7 h-7 shadow-xs transition-transform group-hover:scale-105"
          />
          <span className="tracking-tight text-base font-bold">
            nbsumit<span className="text-neutral-400 dark:text-neutral-500 font-normal">.com</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400" aria-label="Main Navigation">
          {SITE_CONFIG.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2">
          {/* Quick Command Launcher */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5 shrink-0" />
            <span>Search</span>
            <kbd className="inline-flex items-center gap-0.5 font-mono text-[10px] leading-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-1.5 py-0.5 rounded select-none">
              <span>⌘</span><span>K</span>
            </kbd>
          </button>

          {/* Direct GitHub Icon Link */}
          <SocialIcon social={SOCIAL_LINKS.github} size="md" className="hidden sm:inline-flex" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 text-neutral-950 dark:text-neutral-100 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-neutral-100" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-950" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-mono">Quick Search</span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand();
              }}
              className="px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Command Palette</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
