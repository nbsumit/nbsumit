import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2.5 h-6">
              <img src="/nb-brand.png" alt="NB brand" className="w-6 h-6 object-contain opacity-80" />
              <span className="font-bold text-neutral-900 dark:text-white text-sm leading-none">{SITE_CONFIG.name}</span>
            </div>
            <span className="hidden sm:inline text-neutral-400 leading-none">·</span>
            <a href={'mailto:' + SITE_CONFIG.email} className="inline-flex items-center gap-1.5 h-6 text-xs font-mono leading-none text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 shrink-0" /><span className="leading-none">{SITE_CONFIG.email}</span>
            </a>
          </div>

          <button type="button" onClick={scrollToTop} aria-label="Back to top of page" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <span>Top</span><ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
