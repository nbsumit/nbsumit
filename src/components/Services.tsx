import React from 'react';
import { ArrowRight, Code2, Cpu, Wrench } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tech: string[];
  inquirySubject: string;
}

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 'web-apps',
      icon: <Code2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Websites & Web Applications',
      subtitle: 'Modern frontends, functional web apps, and MVPs',
      description: 'Clean, responsive web development built for speed, accessibility, and longevity. From single-purpose web utilities and marketing landing pages to full-stack MVPs with Supabase, Cloudflare, or Astro.',
      deliverables: [
        'Marketing landing pages & personal brand sites',
        'Interactive client-side web tools & calculators',
        'Full-stack MVPs with authentication & databases',
        'Performance optimization & WCAG AA accessibility audits'
      ],
      tech: ['React 19', 'TypeScript', 'SvelteKit', 'Astro', 'Tailwind CSS', 'Vite'],
      inquirySubject: 'Inquiry: Website or Web Application',
    },
    {
      id: 'fixes-automation',
      icon: <Wrench className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Fixes & Automation',
      subtitle: 'Debugging, workflow scripts, and deployment troubleshooting',
      description: 'Hands-on problem solving for stuck software. I diagnose broken CI/CD pipelines, repair responsive layout bugs, automate repetitive data exports, and eliminate fragile manual tasks with targeted scripts.',
      deliverables: [
        'Debugging tricky frontend bugs and styling issues',
        'GitHub Actions CI/CD and GitHub Pages deployment fixes',
        'Custom Python scripts for repetitive file and data transformations',
        'API integration between web apps, webhooks, and third-party tools'
      ],
      tech: ['Python', 'Node.js', 'GitHub Actions', 'Bash/PowerShell', 'Vite', 'REST APIs'],
      inquirySubject: 'Inquiry: Fixes & Automation',
    },
    {
      id: 'gis-visualization',
      icon: <Cpu className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
      title: 'Data Visualization & GIS',
      subtitle: 'Interactive maps, spatial analytics, and data tools',
      description: 'Bridging computer science and geospatial technology. I transform tabular coordinate data, GeoJSON, and satellite/raster datasets into crisp interactive maps, browser heatmaps, and clear analytical dashboards.',
      deliverables: [
        'Interactive web maps with Leaflet and clustered points',
        'CSV, GeoJSON, and Shapefile processing pipelines',
        'Geospatial data analysis in QGIS and Google Earth Engine',
        'Client-side visualization with zero external server exposure'
      ],
      tech: ['Leaflet', 'Supercluster', 'QGIS', 'Google Earth Engine', 'Python (GeoPandas)'],
      inquirySubject: 'Inquiry: Data Visualization & GIS',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            What I can help you build
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I work independently on small and focused technical engagements. You collaborate with me directly from discovery to delivery.
          </p>
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Icon badge */}
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 w-fit">
                  {service.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Typical Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-400 dark:text-neutral-600 select-none">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-5 border-t border-neutral-100 dark:border-neutral-800/70 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={`#contact?service=${service.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      // Dispatch custom event to preselect service in contact form
                      window.dispatchEvent(
                        new CustomEvent('select-service', { detail: service.inquirySubject })
                      );
                    }
                  }}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 transition-all group"
                >
                  <span>Inquire about this</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
