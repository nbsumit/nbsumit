import React, { useState } from 'react';
import { BookOpen, ExternalLink, Layers } from 'lucide-react';
import { ECOSYSTEM_PROJECTS, ProjectItem } from '../data/ecosystem';
import { CaseStudyModal } from './CaseStudyModal';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const Work: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Web Platform', 'Data & Geospatial', 'Digital Product', 'Writing & Essays'];

  const filteredProjects = selectedCategory === 'All'
    ? ECOSYSTEM_PROJECTS
    : ECOSYSTEM_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Authentic tools, products, and software
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every project here is verified and built with a concrete purpose. No fictional metrics, placeholder mockups, or invented client claims.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 ${
                  selectedCategory === category
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Meta row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/80">
                    {project.status}
                  </span>
                </div>

                {/* Title and subtitle */}
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Problem Statement box */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-mono text-[10px] uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
                    Problem solved:
                  </span>
                  <p className="line-clamp-2">{project.problem}</p>
                </div>

                {/* Highlight Badge */}
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-800/70">
                    {project.highlightBadge}
                  </span>
                </div>
              </div>

              {/* Card Footer: Tech tags and links */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 space-y-4">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links row */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-900 dark:text-white hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                        aria-label={`Visit live website for ${project.title} (opens in new tab)`}
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                        aria-label={`View GitHub repository for ${project.title} (opens in new tab)`}
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  {/* Case study trigger */}
                  <button
                    type="button"
                    onClick={() => setActiveCaseStudy(project)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Deep dive</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
};
