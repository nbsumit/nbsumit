import React from 'react';
import { ShieldCheck, Zap, Eye, Code2 } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Zero-Bloat Simplicity',
      description: 'Prioritize native web standards, minimal runtime dependencies, and tight bundle sizes over heavy abstractions.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Deterministic Correctness',
      description: 'Design systems where state, transitions, and mathematical pipelines behave predictably under edge cases.',
    },
    {
      icon: <Eye className="w-5 h-5 text-sky-500" />,
      title: 'Pedagogical & Visual Clarity',
      description: 'Transform complex computational concepts (from calculus to geospatial coordinates) into intuitive, visual experiences.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-purple-500" />,
      title: 'Autonomous & Open Craft',
      description: 'Build transparent software toolchains, reproducible workflows, and ergonomic interfaces crafted for builders.',
    },
  ];

  return (
    <section id="philosophy" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
            Engineering Principles
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            The core architecture tenets that shape every tool, interface, and experiment across the ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 w-fit">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
