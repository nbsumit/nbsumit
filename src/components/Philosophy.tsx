import React from 'react';
import { Code2, Eye, ShieldCheck, Zap } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const principles = [
    { icon: <Code2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />, title: 'Solo, directly accountable', description: 'You work with me directly. There are no agency layers between the brief, the decisions, and the final delivery.' },
    { icon: <Zap className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />, title: 'AI-assisted, not AI-owned', description: 'I use AI where it improves research, iteration, coding, or production speed. I remain responsible for the output.' },
    { icon: <Eye className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />, title: 'Tool-agnostic execution', description: 'The project comes first. I choose the simplest suitable combination of software, code, design tools, and automation.' },
    { icon: <ShieldCheck className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />, title: 'Review before delivery', description: 'Generated or assisted work is checked, tested, refined, and documented before it is treated as finished.' },
  ];

  return (
    <section id="process" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">How I work</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">Transparent, practical, accountable</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">AI is part of the workflow when useful. Ownership of the work stays with me.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <article key={principle.title} className="p-6 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80">
              <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 w-fit mb-3">{principle.icon}</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">{principle.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
