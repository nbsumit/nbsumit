import React from 'react';
import { Code2, Compass, Cpu, Mail, Terminal, User } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const About: React.FC = () => {
  const toolkits = [
    {
      category: 'Languages & Frontend',
      icon: <Code2 className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />,
      items: ['TypeScript', 'JavaScript (ESNext)', 'React 19', 'SvelteKit 5', 'Astro', 'HTML5 & Canvas API', 'Tailwind CSS v4'],
    },
    {
      category: 'Backend & Cloud',
      icon: <Terminal className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />,
      items: ['Node.js', 'Python', 'Cloudflare Workers & Pages', 'Supabase & PostgreSQL', 'REST APIs', 'GitHub Actions CI/CD'],
    },
    {
      category: 'GIS & Geospatial',
      icon: <Cpu className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />,
      items: ['QGIS', 'Google Earth Engine', 'Leaflet.js', 'Supercluster', 'GeoJSON & Shapefiles', 'Spatial Analysis'],
    },
    {
      category: 'Creative & Technical Writing',
      icon: <Compass className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />,
      items: ['Figma', 'Technical Documentation', 'Curriculum Design', 'Manim (Math Animation)', 'LaTeX', 'Markdown'],
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Biography and Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500">
                <User className="w-3.5 h-3.5" />
                <span>About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                Builder, developer, and curious explorer
              </h2>
            </div>

            <div className="text-neutral-600 dark:text-neutral-300 space-y-4 text-base leading-relaxed">
              <p>
                I am Sumit Sengar, known across the internet as <strong className="font-semibold text-neutral-900 dark:text-white">nbsumit</strong>. I am an independent developer and builder based in India.
              </p>
              <p>
                My background bridges computer science, web software, and geoinformatics. That combination shapes how I approach problems: I am equally comfortable building snappy client-side web tools, automating stubborn data transformations, processing satellite imagery, or writing clear educational guides.
              </p>
              <p>
                I do not run an agency. I work as an independent maker. I turn ideas into concrete digital products that people can actually use, with a strong preference for simplicity, user privacy, fast load times, and clean craftsmanship.
              </p>
              <p>
                When I am not writing code, I enjoy reading literature, exploring cinema, creating math animation videos with Manim, and writing reflective essays on my personal site.
              </p>
            </div>

            {/* Email contact prompt */}
            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="text-neutral-500 uppercase tracking-wider">Direct email:</span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-1.5 text-neutral-900 dark:text-white hover:underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* Structured Toolkit */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Technical Capabilities
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Technologies and tools I work with on a regular basis:
              </p>
            </div>

            <div className="space-y-3.5">
              {toolkits.map((toolkit) => (
                <div
                  key={toolkit.category}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800/80 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      {toolkit.icon}
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-mono">
                      {toolkit.category}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {toolkit.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
