import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-4xl space-y-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{SITE_CONFIG.status}</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/nb-brand.png" alt="Sumit Sengar / NB brand" className="w-10 h-10 object-contain shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700" />
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">{SITE_CONFIG.name}</h1>
              <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">@{SITE_CONFIG.handle}</p>
            </div>
          </div>
          <p className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 leading-tight">Independent multidisciplinary builder.</p>
        </div>

        <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
          I design, build, and ship useful digital work across software, visual design, GIS, data, and technical communication.
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 max-w-3xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-neutral-700 dark:text-neutral-300" />
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              One person, many tools. I use AI-assisted workflows where they improve speed or clarity, while remaining responsible for the decisions, implementation, review, testing, and final delivery.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href="#capabilities" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs">
            <span>Explore capabilities</span><ArrowRight className="w-4 h-4" />
          </a>
          <a href="#ecosystem" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all">
            <span>Selected work</span>
          </a>
          <a href={'mailto:' + SITE_CONFIG.email} className="inline-flex items-center gap-2 px-4 py-2.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-medium text-sm transition-colors">
            <Mail className="w-4 h-4" /><span>{SITE_CONFIG.email}</span>
          </a>
        </div>

        <div className="pt-4 flex flex-wrap gap-2">
          {['Software', 'Design', 'GIS', 'Data', 'Automation'].map((item) => (
            <span key={item} className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800/80">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
