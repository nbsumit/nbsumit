export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Platform' | 'Computational Tool' | 'Writing & Essays' | 'Developer Tools';
  description: string;
  longDescription: string;
  tags: string[];
  url?: string;
  repoUrl?: string;
  status: 'Live' | 'Active Development' | 'Open Source';
  featured: boolean;
  highlightMetric?: string;
}

export const ECOSYSTEM_PROJECTS: ProjectItem[] = [
  {
    id: 'bittyfy',
    title: 'Bittyfy',
    category: 'Web Platform',
    description: 'Custom URL identity and link management platform with memorable slugs and QR generation.',
    longDescription: 'Bittyfy rethinks short links into readable personal identifiers (e.g. bittyfy.com/design) tailored for creators, freelancers, and independent businesses. Features sub-50ms edge resolution, Supabase RLS, and clean privacy controls.',
    tags: ['SvelteKit 5', 'Cloudflare Workers', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    url: 'https://bittyfy.com',
    repoUrl: 'https://github.com/nbsumit/bittyfy.com',
    status: 'Live',
    featured: true,
    highlightMetric: 'Sub-50ms edge redirects',
  },
  {
    id: 'ritayukti',
    title: 'Ritayukti',
    category: 'Web Platform',
    description: 'A calm daily planner for meaningful priorities, focused work, daily rituals, and reflection.',
    longDescription: 'Ritayukti helps people choose their most important work, define a clear next action, and give it focused time. Includes daily and weekly views, a task inbox, ritual tracking, light and dark themes, and local backup and restore. Planner entries stay in the browser, with no account required.',
    tags: ['JavaScript', 'HTML & CSS', 'Local Storage', 'GitHub Pages'],
    url: 'https://ritayukti.dev',
    status: 'Live',
    featured: true,
    highlightMetric: 'No account. Browser-local data.',
  },
  {
    id: 'sumitsengar-me',
    title: 'sumitsengar.me',
    category: 'Writing & Essays',
    description: 'Minimalist editorial space for long-form essays on literature, cinema, and life.',
    longDescription: 'A quiet, distraction-free corner of the web. Built with zero runtime frameworks, pure semantic HTML/CSS, automated reading pace calculation, and elegant dual Playfair Display typography.',
    tags: ['Vanilla JS', 'Semantic HTML', 'CSS Architecture', 'GitHub Pages'],
    url: 'https://sumitsengar.me',
    repoUrl: 'https://github.com/nbsumit/sumitsengar.me',
    status: 'Live',
    featured: true,
    highlightMetric: '0kb framework overhead',
  },
  {
    id: 'math-video-generator',
    title: 'Math Video Generator',
    category: 'Computational Tool',
    description: 'Algorithmic mathematical video generator with Edge-TTS and dynamic subtitles.',
    longDescription: 'An automated educational video synthesis engine that converts structured mathematical scripts into fluid, continuous geometric animations using Manim, synchronized neural voice narration, and frame-accurate burned captions.',
    tags: ['Python', 'Manim', 'Edge-TTS', 'FFmpeg', 'Dynamic Subtitles'],
    repoUrl: 'https://github.com/nbsumit/math-video-generator',
    status: 'Active Development',
    featured: true,
    highlightMetric: '100% programmatic video render',
  },
];
