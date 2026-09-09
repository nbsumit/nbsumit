/**
 * Centralized Social Links Configuration for nbsumit.com
 * 
 * IMPORTANT:
 * Update your actual profile URLs below in ONE place.
 * All components across the website (Navbar, Footer, About, Contact, Command Palette)
 * dynamically read from this single source of truth.
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
    description: 'Open source repositories, tools, and research experiments',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Professional background, engineering network, and updates',
  },
  x: {
    id: 'x',
    name: 'X (Twitter)',
    url: 'https://x.com/nbsumit',
    placeholder: false,
    username: '@nbsumit',
    description: 'Thoughts on software engineering, computational tools, and building',
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
    description: 'Educational software demos, computational visuals, and walkthroughs',
  },
};

/**
 * Returns an array of all social links for iterations in UI components.
 */
export const getAllSocialLinks = (): SocialLinkItem[] => {
  return Object.values(SOCIAL_LINKS);
};

/**
 * Helper to check if a social link is an active user link or a placeholder.
 */
export const isConfiguredSocial = (link: SocialLinkItem): boolean => {
  return !link.placeholder && !link.url.includes('YOUR_');
};
