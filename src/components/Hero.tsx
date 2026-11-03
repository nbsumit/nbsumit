import React from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const Hero: React.FC = () => {
  const socials = getAllSocialLinks();

  return (
    <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden">
      <div className="max-w-3xl space-y-7">
        {/* Availability status badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800/90 text-neutral-700 dark:text-neutral-300 shadow-2xs">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="truncate">{SITE_CONFIG.status}</span>
        </div>

        {/* Small identity label and Primary Headline */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {SITE_CONFIG.tagline}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-white leading-[1.15] break-words">
            {SITE_CONFIG.headline}
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal pt-1">
            {SITE_CONFIG.supporting}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 active:scale-[0.99]"
          >
            <span>Explore my work</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300/90 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100/70 dark:hover:bg-neutral-850 transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 active:scale-[0.99]"
          >
            <span>Work with me</span>
            <ArrowDown className="w-4 h-4 text-neutral-500" />
          </a>
        </div>

        {/* Subtle verified social row with accessible labels */}
        <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-neutral-500 mr-1.5">Verified:</span>
            {socials.map((social) => (
              <SocialIcon key={social.id} social={social} size="sm" />
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
            <span>Sumit Sengar · @{SITE_CONFIG.handle}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
