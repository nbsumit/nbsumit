/**
 * Profiles for @nbsumit.
 * Instagram was private and is now public. A direct fetch still hits
 * Instagram's login wall; the public embed for this username loads.
 */

export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'x' | 'youtube';
  name: string;
  url: string;
  handle: string;
}

export const SOCIALS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/nbsumit',
    handle: '@nbsumit',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nbsumit',
    handle: '@nbsumit',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/nbsumit/',
    handle: '@nbsumit',
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com/nbsumit',
    handle: '@nbsumit',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/@nbsumit',
    handle: '@nbsumit',
  },
];
