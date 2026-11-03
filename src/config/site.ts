export interface NavLink {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: 'Sumit Sengar',
  handle: 'nbsumit',
  brand: 'NB',
  domain: 'nbsumit.com',
  url: 'https://nbsumit.com',
  title: 'nbsumit | Sumit Sengar - Independent Developer & Creator',
  tagline: 'Independent developer & creator',
  headline: 'I build useful things for the internet.',
  supporting: 'I create digital products, web applications, tools, and educational content, turning ideas into things people can actually use.',
  description: 'Personal brand and portfolio of Sumit Sengar (nbsumit) - Independent developer and builder creating software, web applications, GIS data tools, and educational products.',
  email: 'hello@nbsumit.com',
  status: 'Available for focused projects and collaborations',
  location: 'India (IST · UTC+5:30)',
  navLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'About', href: '#about' },
    { label: 'Writing', href: '#writing' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[],
};
