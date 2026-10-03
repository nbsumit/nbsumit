import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Search, X } from 'lucide-react';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystem';
import { SITE_CONFIG } from '../config/site';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase();
  const filteredProjects = ECOSYSTEM_PROJECTS.filter((project) => project.title.toLowerCase().includes(normalizedQuery) || project.description.toLowerCase().includes(normalizedQuery) || project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)));
  const navItems = SITE_CONFIG.navLinks.filter((item) => item.label.toLowerCase().includes(normalizedQuery));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-950/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden" role="dialog" aria-modal="true" aria-label="Site search">
        <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input type="text" placeholder="Search projects and sections..." value={query} onChange={(event) => setQuery(event.target.value)} autoFocus className="flex-1 bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none" />
          <button type="button" onClick={onClose} aria-label="Close search" className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"><X className="w-4 h-4" /></button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          {navItems.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">Sections</div>
              <div className="space-y-0.5">
                {navItems.map((item) => <a key={item.href} href={item.href} onClick={onClose} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"><span>{item.label}</span><ArrowRight className="w-3.5 h-3.5 text-neutral-400" /></a>)}
              </div>
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">Projects</div>
              <div className="space-y-0.5">
                {filteredProjects.map((project) => (
                  <a key={project.id} href={project.url || '#ecosystem'} target={project.url ? '_blank' : '_self'} rel={project.url ? 'noopener noreferrer' : undefined} onClick={onClose} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200">
                    <div><div className="font-semibold text-neutral-950 dark:text-white">{project.title}</div><div className="text-neutral-500 line-clamp-1">{project.description}</div></div>
                    {project.url ? <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2" /> : <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2" />}
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && navItems.length === 0 && <div className="py-8 text-center text-neutral-500">No matching results found for "{query}".</div>}
        </div>

        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500"><span>Quick navigation</span><span className="font-mono">ESC to close</span></div>
      </div>
    </div>
  );
};
