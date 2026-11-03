import React, { useEffect } from 'react';
import { CheckCircle2, ExternalLink, Layers, X } from 'lucide-react';
import { ProjectItem } from '../data/ecosystem';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                {project.category}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                {project.status}
              </span>
            </div>
            <h2 id="case-study-title" className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {/* Problem Statement */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              The Problem
            </h3>
            <p className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/70 dark:border-neutral-800/70 text-neutral-800 dark:text-neutral-200">
              {project.problem}
            </p>
          </div>

          {/* Verifiable Contribution */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              My Contribution
            </h3>
            <p>{project.contribution}</p>
          </div>

          {/* Architecture & Engineering Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Architecture</span>
            </h3>
            <ul className="space-y-2">
              {project.caseStudy.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-neutral-100 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Engineering & Decisions */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Key Decisions
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-neutral-600 dark:text-neutral-400">
              {project.caseStudy.keyDecisions.map((decision, idx) => (
                <li key={idx}>{decision}</li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/50">
          <div className="flex items-center gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium text-xs hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <span>Visit live project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Source code</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            ESC to close
          </button>
        </div>
      </div>
    </div>
  );
};
