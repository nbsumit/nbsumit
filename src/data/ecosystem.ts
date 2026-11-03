export interface CaseStudy {
  challenge: string;
  solution: string;
  architecture: string[];
  keyDecisions: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Platform' | 'Data & Geospatial' | 'Digital Product' | 'Writing & Essays';
  description: string;
  problem: string;
  contribution: string;
  tags: string[];
  url?: string;
  repoUrl?: string;
  status: 'Live' | 'Active Development' | 'Open Source';
  featured: boolean;
  highlightBadge: string;
  caseStudy: CaseStudy;
}

export const ECOSYSTEM_PROJECTS: ProjectItem[] = [
  {
    id: 'bittyfy',
    title: 'Bittyfy',
    subtitle: 'Custom Short Links and QR Codes',
    category: 'Web Platform',
    description: 'Custom URL identity and link management platform with memorable slugs, permanent QR codes, and editable destinations.',
    problem: 'Standard link shorteners produce random, unmemorable strings that break when underlying target URLs change, offering little identity control to independent creators.',
    contribution: 'Designed and engineered the full-stack web application, authentication flow, responsive UI, dynamic QR code generation, and Cloudflare Edge routing.',
    tags: ['SvelteKit 5', 'Cloudflare Workers', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    url: 'https://bittyfy.com',
    status: 'Active Development',
    featured: true,
    highlightBadge: 'Editable Destinations',
    caseStudy: {
      challenge: 'Provide fast redirect performance worldwide while allowing users to reconfigure where their branded links point without invalidating previously printed QR codes.',
      solution: 'Leveraged Cloudflare Workers for ultra-low latency edge resolution, paired with Supabase PostgreSQL and Row-Level Security (RLS) for privacy-conscious destination management.',
      architecture: [
        'Edge routing on Cloudflare Workers for sub-50ms worldwide resolution',
        'SvelteKit 5 frontend with fluid reactive state management',
        'Supabase PostgreSQL with strict Row Level Security policies',
        'Client-side SVG QR code generator with zero third-party tracking'
      ],
      keyDecisions: [
        'Permanent slugs remain constant while destinations can be updated at any time',
        'No invasive visitor cookies or cross-site tracking scripts'
      ]
    }
  },
  {
    id: 'applyready',
    title: 'ApplyReady',
    subtitle: 'Zero-Upload Exam Document Suite',
    category: 'Web Platform',
    description: 'Privacy-first photo, signature, and document optimization utility engineered for exam portals with 100% in-browser processing.',
    problem: 'Government and competitive exam portals (UPSC, SSC, IBPS) enforce strict file dimensions, aspect ratios, and kilobyte size limits. Candidates often upload sensitive ID documents to questionable third-party conversion servers.',
    contribution: 'Built the client-side image processing engine, interactive cropping canvas, dynamic DPI scaling, and target file size compression algorithms.',
    tags: ['Vanilla JS', 'Canvas API', 'Client-Side Compression', 'Cropper.js', 'CSS Architecture'],
    url: 'https://applyready.in',
    repoUrl: 'https://github.com/nbsumit/applyready',
    status: 'Live',
    featured: true,
    highlightBadge: '100% In-Browser · Zero Uploads',
    caseStudy: {
      challenge: 'Ensure strict compliance with diverse portal specifications without uploading a single byte of user documents or photos to an external server.',
      solution: 'Implemented pure client-side processing using the HTML5 Canvas API and binary file streaming, providing instant feedback and binary compression entirely within the user browser.',
      architecture: [
        'HTML5 Canvas API for exact pixel cropping and resolution re-sampling',
        'Binary iterative JPEG/PNG compressor to meet rigid 20KB-50KB limits',
        'Zero backend endpoints: complete isolation from external networks',
        'Local state only, ensuring complete privacy for sensitive government documents'
      ],
      keyDecisions: [
        'Zero server-side image processing ensures user privacy and zero hosting overhead',
        'Preset templates tailored for major exam boards to eliminate user guesswork'
      ]
    }
  },
  {
    id: 'gate-cs-mastery',
    title: 'GATE CS Mastery',
    subtitle: 'Syllabus-Aligned Revision Cheat Sheets',
    category: 'Digital Product',
    description: 'Digital revision platform and condensed study packs for GATE Computer Science aspirants, organized subject by subject.',
    problem: 'GATE CS aspirants face vast technical syllabi across 12 discrete engineering subjects with fragmented, bulky reference materials and difficult last-minute revision.',
    contribution: 'Authored curriculum-mapped cheat sheets, designed print-ready A4 technical layouts, built the Astro digital storefront, and integrated automated digital delivery.',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'Razorpay', 'Cloudflare Pages'],
    url: 'https://gatecsmastery.com',
    status: 'Live',
    featured: true,
    highlightBadge: '12 Subjects · Direct PDF Delivery',
    caseStudy: {
      challenge: 'Deliver dense technical formulas, theorems, and algorithm complexities in clean, legible A4 visual formats while providing an instant digital checkout experience.',
      solution: 'Created a static Astro storefront with minimal JavaScript payload, paired with serverless checkout verification and instant tokenized digital delivery.',
      architecture: [
        'Astro static-first build with near-zero runtime JavaScript',
        'Razorpay checkout integration for seamless digital transactions',
        'Structured schema.org educational catalog metadata for high search discoverability',
        'Cloudflare Pages global edge distribution'
      ],
      keyDecisions: [
        'Subject-by-subject modular packs so students only buy what they need',
        'Typography calibrated for print and screen readability with high contrast'
      ]
    }
  },
  {
    id: 'csv-map-visualizer',
    title: 'CSV Map Visualizer',
    subtitle: 'High-Speed Client-Side Geospatial Mapping',
    category: 'Data & Geospatial',
    description: 'Browser-based geospatial tool that parses coordinate datasets into clustered interactive maps and spatial heatmaps without external server transfer.',
    problem: 'Visualizing large latitude/longitude CSV datasets usually requires spinning up complex GIS desktop software or uploading sensitive proprietary coordinate files to third-party cloud tools.',
    contribution: 'Developed the coordinate parser, auto-detection of coordinate columns, Leaflet map integration, and spatial cluster aggregation.',
    tags: ['React', 'TypeScript', 'Leaflet', 'Supercluster', 'Vite'],
    repoUrl: 'https://github.com/nbsumit/csv-map-visualizer',
    status: 'Open Source',
    featured: true,
    highlightBadge: 'Client-Side Clustering',
    caseStudy: {
      challenge: 'Render and cluster thousands of geospatial coordinates smoothly in the browser viewport without degrading frame rates or sending raw data off-device.',
      solution: 'Integrated Supercluster with hierarchical spatial index trees (K-D trees) running client-side, rendering markers dynamically based on the current bounding box.',
      architecture: [
        'Web Worker CSV ingestion for non-blocking UI coordinate parsing',
        'Supercluster geospatial indexing for instant multi-point clustering',
        'Leaflet.js map viewport rendering with customizable tile layers',
        'Exportable filtered GeoJSON and map snapshot capabilities'
      ],
      keyDecisions: [
        'Heuristic detection of common latitude/longitude header patterns',
        'Strictly local execution protecting proprietary coordinate datasets'
      ]
    }
  },
  {
    id: 'ritayukti',
    title: 'Ritayukti',
    subtitle: 'Calm Daily Intentions & Focus Planner',
    category: 'Web Platform',
    description: 'A distraction-free daily planner for meaningful priorities, focused sessions, daily rituals, and evening reflections.',
    problem: 'Modern productivity apps are cluttered with push notifications, team chat, infinite nesting, and account creation barriers that distract from actual focused work.',
    contribution: 'Designed and built the application architecture, lightweight local-storage state engine, focus session timer, and responsive dark/light layouts.',
    tags: ['JavaScript', 'HTML5', 'CSS Architecture', 'Local Storage', 'Cloudflare Pages'],
    url: 'https://ritayukti.dev',
    status: 'Live',
    featured: true,
    highlightBadge: 'Local Storage · Zero Account Barrier',
    caseStudy: {
      challenge: 'Create a tactile, peaceful daily planning environment that requires no sign-up, works offline, and respects the user mental space.',
      solution: 'Constructed an intentional single-page utility using standard web primitives and localStorage persistence, complete with JSON backup and restore capabilities.',
      architecture: [
        'Pure semantic HTML5 and vanilla JavaScript with zero framework overhead',
        'Browser-native localStorage synchronization for complete user data sovereignty',
        'Full JSON export/import mechanism for cross-device migration',
        'Accessible modal dialogs for settings, search, and focus sessions'
      ],
      keyDecisions: [
        'No remote server database: user thoughts and notes never leave their machine',
        'Focused single-task view to minimize cognitive load during active work'
      ]
    }
  },
  {
    id: 'sumitsengar-me',
    title: 'sumitsengar.me',
    subtitle: 'Minimalist Editorial & Long-Form Essays',
    category: 'Writing & Essays',
    description: 'Personal editorial publication featuring long-form essays on literature, philosophy, cinema, and life.',
    problem: 'Modern blogging platforms are weighed down by trackers, popups, paywalls, and heavy JavaScript runtimes that hinder comfortable long-form reading.',
    contribution: 'Crafted the custom typographic system, reading pace estimator, clean dark/light themes, and static publication pipeline.',
    tags: ['Vanilla JS', 'Semantic HTML5', 'CSS Architecture', 'GitHub Pages'],
    url: 'https://sumitsengar.me',
    repoUrl: 'https://github.com/nbsumit/sumitsengar.me',
    status: 'Live',
    featured: true,
    highlightBadge: '0kb Framework Overhead',
    caseStudy: {
      challenge: 'Achieve magazine-level typography, optimal line lengths, and distraction-free readability on any screen size with zero runtime dependencies.',
      solution: 'Built with pure semantic HTML5, CSS custom properties, and handcrafted typographic proportions following classical editorial book design principles.',
      architecture: [
        '100% static HTML and CSS hosted on GitHub Pages with custom domain',
        'Typographic scale anchored by Playfair Display and system humanist fonts',
        'Client-side reading time estimator calculated from text node word counts',
        'Zero external trackers, cookies, or telemetry'
      ],
      keyDecisions: [
        'Strict 65-character line lengths for comfortable eye movement',
        'Respects system dark/light preferences seamlessly without layout shift'
      ]
    }
  },
];
