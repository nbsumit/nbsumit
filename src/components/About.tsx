import React from 'react';
import { User, Cpu, Code2, Globe, Terminal } from 'lucide-react';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const About: React.FC = () => {
  const socials = getAllSocialLinks();

  const skillGroups = [
    {
      category: 'Languages & Core',
      icon: <Code2 className="w-4 h-4 text-emerald-500" />,
      items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'SQL (PostgreSQL)', 'HTML5 / Modern CSS'],
    },
    {
      category: 'Web & Frameworks',
      icon: <Globe className="w-4 h-4 text-sky-500" />,
      items: ['React 19', 'SvelteKit 5', 'Vite', 'Tailwind CSS', 'Next.js'],
    },
    {
      category: 'Computational & Media',
      icon: <Cpu className="w-4 h-4 text-purple-500" />,
      items: ['Manim (Math Animation)', 'Edge-TTS', 'FFmpeg', 'Geospatial Analytics (Leaflet)', 'Supercluster'],
    },
    {
      category: 'Infrastructure & Tooling',
      icon: <Terminal className="w-4 h-4 text-amber-500" />,
      items: ['Cloudflare Workers', 'Supabase (Auth/RLS)', 'GitHub Actions', 'Git / Linux', 'Agent Toolchains'],
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                <User className="w-3.5 h-3.5" />
                <span>Background &amp; Profile</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                About Sumit Sengar
              </h2>
            </div>

            <div className="prose dark:prose-invert text-neutral-600 dark:text-neutral-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                I am a software engineer and builder passionate about creating clean, reliable web applications, educational computational tools, and developer workflows.
              </p>
              <p>
                My work spans designing low-latency identity platforms like <strong className="text-neutral-900 dark:text-white font-semibold">Bittyfy</strong>, running a personal reflective writing space at <strong className="text-neutral-900 dark:text-white font-semibold">sumitsengar.me</strong>, engineering programmatic mathematical visualization engines, and developing autonomous agent tools.
              </p>
              <p>
                I value software that is fast, resilient, and transparent—systems with minimal bloat, clear mental models, and uncompromising attention to detail.
              </p>
            </div>

            {/* Subtle Social Links Section (as requested) */}
            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                Online Profiles &amp; Networks
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {socials.map((s) => (
                  <SocialIcon
                    key={s.id}
                    social={s}
                    size="sm"
                    showLabel={true}
                    className="border border-neutral-200/70 dark:border-neutral-800/70"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Matrix */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500">
              Technical Capabilities
            </h3>

            <div className="space-y-3">
              {skillGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    {group.icon}
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {group.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
