import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystem';

export const EcosystemGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(ECOSYSTEM_PROJECTS.map((project) => project.category)))];
  const filteredProjects = selectedCategory === 'All' ? ECOSYSTEM_PROJECTS : ECOSYSTEM_PROJECTS.filter((project) => project.category === selectedCategory);

  return (
    <section id="ecosystem" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"><Layers className="w-3.5 h-3.5" /><span>Selected work</span></div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Products, tools, and experiments</h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">A selection of things I have built and continue to improve.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={'px-3 py-1.5 rounded-lg text-xs font-medium transition-all ' + (selectedCategory === category ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800')}>{category}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article key={project.id} className="group flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">{project.category}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">{project.status}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">{project.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed">{project.description}</p>
                {project.highlightMetric && <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400"><Sparkles className="w-3 h-3 text-neutral-900 dark:text-neutral-100" /><span>{project.highlightMetric}</span></div>}
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400">{tag}</span>)}
                </div>
                {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-neutral-900 dark:text-white hover:underline"><span>Visit project</span><ExternalLink className="w-3.5 h-3.5" /></a> : <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">In development</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
