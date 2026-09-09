import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const Hero: React.FC = () => {
  const socials = getAllSocialLinks();

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-3xl space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{SITE_CONFIG.status}</span>
        </div>

        {/* Name & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/favicon/favicon-32x32.png"
              alt="Sumit Sengar / NB Brand"
              className="w-10 h-10 rounded-lg shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700"
            />
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                @{SITE_CONFIG.handle}
              </p>
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-normal text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Software engineer, computational explorer, and independent builder.
          </p>
        </div>

        {/* Narrative */}
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I build high-performance web platforms, algorithmic visualization tools, and deterministic software systems. Focused on clean architecture, pedagogical clarity, and lightweight, resilient software craftsmanship.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs"
          >
            <span>Explore Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://sumitsengar.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all"
          >
            <BookOpen className="w-4 h-4 text-neutral-500" />
            <span>Read Essays</span>
          </a>

          <a
            href="#connect"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-medium text-sm transition-colors"
          >
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Subtle Social Strip */}
        <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Connect:
          </span>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <SocialIcon key={s.id} social={s} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
