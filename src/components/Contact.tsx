import React from 'react';
import { Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Contact: React.FC = () => {
  return (
    <section id="connect" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Contact</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">Have an idea or need a hand?</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
            If you have an idea, need help with a project, or want to build something together, feel free to contact me at <a href={'mailto:' + SITE_CONFIG.email} className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline">{SITE_CONFIG.email}</a>.
          </p>

          <a href={'mailto:' + SITE_CONFIG.email} className="mt-8 group flex items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all" aria-label={'Send email to ' + SITE_CONFIG.email}>
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"><Mail className="w-5 h-5" /></div>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Email</p>
                <p className="text-base sm:text-xl font-bold text-neutral-950 dark:text-white break-all">{SITE_CONFIG.email}</p>
              </div>
            </div>
            <span className="hidden sm:inline text-sm font-medium text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">Write an email</span>
          </a>
        </div>
      </div>
    </section>
  );
};
