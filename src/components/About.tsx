import React from 'react';
import { Code2, Cpu, Globe, Mail, Terminal, User } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const About: React.FC = () => {
  const skillGroups = [
    { category: 'Software', icon: <Code2 className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />, items: ['TypeScript', 'JavaScript', 'Python', 'React', 'SvelteKit'] },
    { category: 'Design & Interface', icon: <Globe className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />, items: ['Figma', 'Adobe workflows', 'Responsive UI', 'Typography', 'Layout'] },
    { category: 'Geospatial', icon: <Cpu className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />, items: ['QGIS', 'Google Earth Engine', 'Raster analysis', 'Vector analysis', 'Web maps'] },
    { category: 'Delivery & Infrastructure', icon: <Terminal className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />, items: ['Cloudflare', 'Supabase', 'GitHub Actions', 'Git', 'QA & documentation'] },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2"><User className="w-3.5 h-3.5" /><span>About</span></div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">One person across several disciplines</h2>
            </div>
            <div className="text-neutral-600 dark:text-neutral-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>I am Sumit Sengar, an independent builder working across software, geospatial technology, design, data, and technical communication.</p>
              <p>My background spans computer science and geoinformatics, which is why my work often moves between code, maps, interfaces, data pipelines, documents, and product thinking.</p>
              <p>I do not present myself as a large agency. I work independently, use modern tools including AI when appropriate, and take responsibility for what I deliver.</p>
            </div>
            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-neutral-500 uppercase tracking-wider">Email:</span>
              <a href={'mailto:' + SITE_CONFIG.email} className="text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1 font-semibold"><Mail className="w-3.5 h-3.5 text-neutral-400" /><span>{SITE_CONFIG.email}</span></a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500">Working toolkit</h3>
            <div className="space-y-3">
              {skillGroups.map((group) => (
                <div key={group.category} className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-2 mb-2.5">{group.icon}<h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">{group.category}</h4></div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => <span key={item} className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">{item}</span>)}
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
