import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const Footer: React.FC = () => {
  const socials = getAllSocialLinks();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Domain info */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon/favicon-32x32.png"
                alt="NB Brand"
                className="w-6 h-6 rounded-md opacity-80"
              />
              <span className="font-bold text-neutral-900 dark:text-white text-sm">
                {SITE_CONFIG.name}
              </span>
            </div>
            <span className="hidden sm:inline text-neutral-400">·</span>
            {/* Primary Contact Email */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              aria-label={`Send email to ${SITE_CONFIG.email}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          {/* Social Icons Strip (All 5 platforms) */}
          <div className="flex items-center gap-1.5" aria-label="Social media profiles">
            {socials.map((platform) => (
              <SocialIcon key={platform.id} social={platform} size="sm" />
            ))}
          </div>

          {/* Back to top & GitHub source */}
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <a
              href="https://github.com/nbsumit/nbsumit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Source Code
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
