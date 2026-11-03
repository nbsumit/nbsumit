import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Command, Copy, ExternalLink, Moon, Search, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystem';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
  darkMode?: boolean;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  darkMode,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const socials = getAllSocialLinks();

  const filteredSections = SITE_CONFIG.navLinks.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery)
  );

  const filteredProjects = ECOSYSTEM_PROJECTS.filter(
    (project) =>
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery) ||
      project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  );

  const filteredSocials = socials.filter(
    (social) =>
      social.name.toLowerCase().includes(normalizedQuery) ||
      social.username.toLowerCase().includes(normalizedQuery)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-950/65 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Command launcher"
    >
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search work, services, socials, or actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command launcher"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 text-xs">
          {/* Quick Actions */}
          {(!normalizedQuery || 'theme dark light copy email'.includes(normalizedQuery)) && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Quick Actions
              </div>
              <div className="space-y-0.5">
                {onToggleTheme && (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleTheme();
                      onClose();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200 text-left"
                  >
                    <span className="flex items-center gap-2">
                      {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                      <span>Toggle {darkMode ? 'Light' : 'Dark'} Theme</span>
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">Action</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200 text-left"
                >
                  <span className="flex items-center gap-2">
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? 'Copied to clipboard!' : `Copy Email (${SITE_CONFIG.email})`}</span>
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">Action</span>
                </button>
              </div>
            </div>
          )}

          {/* Sections Navigation */}
          {filteredSections.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Sections
              </div>
              <div className="space-y-0.5">
                {filteredSections.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Projects
              </div>
              <div className="space-y-0.5">
                {filteredProjects.map((project) => (
                  <a
                    key={project.id}
                    href={project.url || '#work'}
                    target={project.url ? '_blank' : '_self'}
                    rel={project.url ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-neutral-950 dark:text-white flex items-center gap-1.5">
                        <span>{project.title}</span>
                        <span className="text-[10px] font-mono text-neutral-400 font-normal">
                          · {project.category}
                        </span>
                      </div>
                      <div className="text-neutral-500 line-clamp-1 text-[11px]">
                        {project.description}
                      </div>
                    </div>
                    {project.url ? (
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Profiles */}
          {filteredSocials.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-[10px]">
                Social Profiles
              </div>
              <div className="space-y-0.5">
                {filteredSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-950 dark:text-white">{social.name}</span>
                      <span className="text-neutral-400 font-mono text-[11px]">{social.username}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 &&
            filteredSections.length === 0 &&
            filteredSocials.length === 0 && (
              <div className="py-8 text-center text-neutral-500">
                No matching results found for "{query}".
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1 font-mono">
            <Command className="w-3 h-3" />
            <span>Navigation Launcher</span>
          </span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
