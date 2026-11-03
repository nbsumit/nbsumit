import React from 'react';
import { BookOpen, ExternalLink, PenLine, Video } from 'lucide-react';

export const Writing: React.FC = () => {
  const publications = [
    {
      title: 'sumitsengar.me',
      tag: 'Personal Essays',
      icon: <PenLine className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      description: 'A quiet, minimalist editorial publication featuring long-form writing on books, cinema, philosophy, and mindful living. Crafted with zero JavaScript framework overhead.',
      url: 'https://sumitsengar.me',
      linkText: 'Read essays on sumitsengar.me',
    },
    {
      title: 'GATE CS Mastery',
      tag: 'Technical Education',
      icon: <BookOpen className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      description: 'Curated technical cheat sheets, formula sheets, and condensed revision materials mapping the official GATE Computer Science syllabus across 12 subjects.',
      url: 'https://gatecsmastery.com',
      linkText: 'Explore study materials',
    },
    {
      title: 'Computational Math Animations',
      tag: 'Video & Animation',
      icon: <Video className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      description: 'Programmatic animations of mathematical principles and algorithm geometry created using Python and the Manim mathematical animation engine.',
      url: 'https://www.youtube.com/@nbsumit',
      linkText: 'Watch on YouTube',
    },
  ];

  return (
    <section id="writing" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Writing & Content
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            Essays, tutorials, and technical guides
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I believe clear writing is the foundation of clear thinking. Here is where I share long-form reflections, educational packs, and visual explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <article
              key={pub.title}
              className="flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 w-fit">
                    {pub.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {pub.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    {pub.title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {pub.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-white hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                >
                  <span>{pub.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
