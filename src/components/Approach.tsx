import React from 'react';
import { Accessibility, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const Approach: React.FC = () => {
  const pillars = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Usefulness over spectacle',
      description: 'The web has enough bloated landing pages and empty demo widgets. I focus on creating tools that solve specific, tangible problems for real people with minimum friction.',
    },
    {
      icon: <Zap className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Fast and browser-native',
      description: 'I favor lightweight static-first architectures, client-side Canvas and Web APIs, and edge distribution. Code should load in milliseconds and run reliably without heavy server dependencies.',
    },
    {
      icon: <Accessibility className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Design craft and accessibility',
      description: 'Typography with calibrated hierarchy, purposeful whitespace, and full WCAG 2.2 AA accessibility. Interfaces must work gracefully with keyboards, screen readers, and touch screens.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Direct personal accountability',
      description: 'No account managers, no junior handoffs, no bureaucratic layers. When you collaborate with me, you work directly with the person writing the code, running the tests, and verifying deployment.',
    },
  ];

  return (
    <section id="approach" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            How I think about building
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Practical engineering values that guide every application, script, and digital product I ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 space-y-3"
            >
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 w-fit">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
