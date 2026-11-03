import React from 'react';
import { ArrowUp, Command, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { BrandLogo } from './BrandLogo';
import { SocialIcon } from './SocialIcon';

export const Footer: React.FC = () => {
  const socials = getAllSocialLinks();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <BrandLogo size={28} />
            <div>
              <span className="font-bold text-neutral-900 dark:text-white text-sm block leading-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-xs text-neutral-500 font-mono block leading-tight">
                @{SITE_CONFIG.handle} · {SITE_CONFIG.domain}
              </span>
            </div>
          </div>

          {/* Social Icons row */}
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <SocialIcon key={social.id} social={social} size="sm" />
            ))}
          </div>

          {/* Quick email and Top action */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.email}</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <p>© 2026 Sumit Sengar. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>{SITE_CONFIG.location}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-neutral-400">
              <Command className="w-3 h-3" />
              <span>Press K to search</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
