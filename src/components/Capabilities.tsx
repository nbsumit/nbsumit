import React from 'react';
import { Code2, Database, FileText, Map, Palette, Sparkles } from 'lucide-react';

const capabilities = [
  { icon: Code2, title: 'Web & Software', description: 'Websites, landing pages, dashboards, browser tools, product interfaces, and practical software.', tools: ['React', 'TypeScript', 'Python', 'Cloudflare', 'Supabase'] },
  { icon: Palette, title: 'Design & Visuals', description: 'UI and UX concepts, social graphics, presentations, thumbnails, brand assets, and clean visual systems.', tools: ['Figma', 'Adobe workflows', 'Responsive UI', 'Layout systems'] },
  { icon: Map, title: 'GIS & Geospatial', description: 'Maps, spatial analysis, remote-sensing workflows, geospatial data processing, and web mapping.', tools: ['QGIS', 'Google Earth Engine', 'Python', 'Raster & vector'] },
  { icon: FileText, title: 'Documents & Communication', description: 'Resumes, reports, presentations, structured PDFs, technical documentation, and application assets.', tools: ['Reports', 'Presentations', 'PDF workflows', 'Technical writing'] },
  { icon: Database, title: 'Data & Automation', description: 'Data cleanup, analysis, repeatable processing pipelines, lightweight automation, and structured outputs.', tools: ['Python', 'SQL', 'Data processing', 'Automation'] },
  { icon: Sparkles, title: 'Rapid Prototyping', description: 'Fast idea-to-working-output execution using AI-assisted research, prototyping, iteration, and QA.', tools: ['AI-assisted', 'Research', 'Testing', 'Documentation'] },
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">What I can help build</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">The focus is the outcome, not the software logo. I choose tools based on what the project actually needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.title} className="p-6 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-4"><Icon className="w-5 h-5 text-neutral-900 dark:text-neutral-100" /></div>
                <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">{capability.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">{capability.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {capability.tools.map((tool) => (
                    <span key={tool} className="text-[11px] font-mono px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{tool}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
