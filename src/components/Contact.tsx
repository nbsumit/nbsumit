import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, Send } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Website or Web Application');
  const [userNote, setUserNote] = useState('');

  const socials = getAllSocialLinks();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const handleSelectService = (e: CustomEvent<string>) => {
      if (e.detail) {
        setSelectedTopic(e.detail.replace('Inquiry: ', ''));
      }
    };
    window.addEventListener('select-service' as any, handleSelectService);
    return () => window.removeEventListener('select-service' as any, handleSelectService);
  }, []);

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${selectedTopic} - [Your Name / Organization]`);
    const body = encodeURIComponent(
      `Hi Sumit,\n\nI am reaching out regarding ${selectedTopic.toLowerCase()}.\n\nProject Overview:\n${userNote || '[Please describe your project, timeline, and goals]'}\n\nBest regards,\n[Your Name]`
    );
    return `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Email & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Contact & Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                Let's discuss your project
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you need a fresh web application, an automated script, geospatial visualization, or technical consultation, I am happy to connect.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Primary Email
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Replies within 24 hours
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-sm sm:text-base font-bold font-mono text-neutral-950 dark:text-white truncate hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  aria-label="Copy email address to clipboard"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono animate-in fade-in duration-150">
                  Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Verified Social Profiles Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Verified Social Profiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <SocialIcon social={social} size="sm" className="p-0 hover:bg-transparent" />
                      <div className="truncate">
                        <span className="font-semibold text-neutral-900 dark:text-white block leading-tight">
                          {social.name}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 block leading-tight">
                          {social.username}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pre-filled Email Composer Helper */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
                  Start an email inquiry
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Draft your message here, and click send to open your preferred email client directly. No third-party data collection or hidden webhooks.
                </p>
              </div>

              {/* Inquiry Topic Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Inquiry Topic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Website or Web Application',
                    'Fixes & Automation',
                    'Data Visualization & GIS',
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                        selectedTopic === topic
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                          : 'bg-neutral-50 dark:bg-neutral-950/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional brief note */}
              <div className="space-y-2">
                <label htmlFor="inquiry-notes" className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Brief Project Overview (Optional)
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={4}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Outline your project scope, target timeline, or what you'd like to build together..."
                  className="w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all resize-y"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={getMailtoUrl()}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  <Send className="w-4 h-4" />
                  <span>Open in Email Client ({SITE_CONFIG.email})</span>
                </a>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center mt-2.5 font-mono">
                  Standard mailto link · opens your default email program safely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
