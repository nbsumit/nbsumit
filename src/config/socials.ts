/**
 * Centralized Social Links Configuration for nbsumit.com
 * Brand handle: @nbsumit across all verified platforms
 */

export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'x' | 'instagram' | 'youtube';
  name: string;
  url: string;
  placeholder: boolean;
  username: string;
  description: string;
}

export const SOCIAL_LINKS: Record<'github' | 'linkedin' | 'x' | 'instagram' | 'youtube', SocialLinkItem> = {
  github: {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Open-source repositories, developer tools, and code experiments',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Professional background, engineering network, and career updates',
  },
  x: {
    id: 'x',
    name: 'X',
    url: 'https://x.com/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Thoughts on software craftsmanship, tools, and indie building',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Visual moments, creative pursuits, and life beyond code',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/@nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Technical walkthroughs, software demos, and educational visuals',
  },
};

export const getAllSocialLinks = (): SocialLinkItem[] => {
  return Object.values(SOCIAL_LINKS);
};

export const isConfiguredSocial = (link: SocialLinkItem): boolean => {
  return !link.placeholder && !link.url.includes('YOUR_');
};
