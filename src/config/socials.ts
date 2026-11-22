/**
 * Profiles checked against the live web on 22 Nov 2026.
 * Instagram @nbsumit is omitted: Instagram's own embed reports that the
 * profile may be broken or removed, while a known profile embeds normally.
 * Add it here, with verified: true, once the account is public.
 */

export interface SocialLink {
  id: 'github' | 'linkedin' | 'x' | 'youtube';
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
