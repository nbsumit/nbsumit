import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, ArrowRight } from 'lucide-react';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystem';
import { getAllSocialLinks } from '../config/socials';
import { SITE_CONFIG } from '../config/site';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const socials = getAllSocialLinks();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = ECOSYSTEM_PROJECTS.filter(
    p => p.title.toLowerCase().includes(query.toLowerCase()) ||
         p.description.toLowerCase().includes(query.toLowerCase()) ||
         p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredSocials = socials.filter(
    s => s.name.toLowerCase().includes(query.toLowerCase()) ||
         s.username.toLowerCase().includes(query.toLowerCase())
  );

  const navItems = SITE_CONFIG.navLinks.filter(
    n => n.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects, sections, socials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Projects &amp; Tools
              </div>
              <div className="space-y-0.5">
                {filteredProjects.map((p) => (
                  <a
                    key={p.id}
                    href={p.url || p.repoUrl || '#ecosystem'}
                    target={p.url || p.repoUrl ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <div>
                      <div className="font-semibold text-neutral-950 dark:text-white">{p.title}</div>
                      <div className="text-neutral-500 line-clamp-1">{p.description}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Navigation
              </div>
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Socials */}
          {filteredSocials.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Social Profiles
              </div>
              <div className="space-y-0.5">
                {filteredSocials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <div>
                      <span className="font-semibold text-neutral-950 dark:text-white">{s.name}</span>
                      <span className="text-neutral-500 ml-2 font-mono">{s.username}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && navItems.length === 0 && filteredSocials.length === 0 && (
            <div className="py-8 text-center text-neutral-500">
              No matching results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Navigation Quick-Launcher</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
