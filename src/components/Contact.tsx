import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllSocialLinks } from '../config/socials';
import { SocialIcon } from './SocialIcon';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const socials = getAllSocialLinks();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="connect" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect &amp; Communication</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Find Me Online
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Have a project, collaboration idea, or question? Connect with me through any of the platforms below or send a direct message.
          </p>
        </div>

        {/* Direct Email Card */}
        <div className="mb-10 p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Email
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              aria-label={`Send email to ${SITE_CONFIG.email}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Dedicated "Find me online" 5 Platforms Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Social Platforms &amp; Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform.name} profile (${platform.username}) · opens in new tab`}
                title={`${platform.name} profile · ${platform.username}`}
                className="group p-4 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <SocialIcon social={platform} size="md" className="p-0 hover:bg-transparent" />
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                          {platform.name}
                        </h4>
                        <span className="text-xs font-mono text-neutral-500">
                          {platform.username}
                        </span>
                      </div>
                    </div>

                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {platform.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="font-mono">Open in new tab</span>
                  {platform.placeholder && (
                    <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                      Configurable
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
