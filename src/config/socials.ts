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
    description: 'Open source repositories, experiments, and developer toolchains',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/YOUR_USERNAME', // Replace with your LinkedIn profile URL
    placeholder: true,
    username: 'Sumit Sengar',
    description: 'Professional experience, engineering network, and updates',
  },
  x: {
    id: 'x',
    name: 'X (Twitter)',
    url: 'https://x.com/YOUR_USERNAME', // Replace with your X / Twitter handle URL
    placeholder: true,
    username: '@YOUR_USERNAME',
    description: 'Tech thoughts, build-in-public logs, and quick announcements',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/YOUR_USERNAME', // Replace with your Instagram profile URL
    placeholder: true,
    username: '@YOUR_USERNAME',
    description: 'Visual stories, creative interests, and life beyond code',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@YOUR_CHANNEL', // Replace with your YouTube channel URL
    placeholder: true,
    username: '@YOUR_CHANNEL',
    description: 'Educational tech walkthroughs, math animations, and software guides',
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
