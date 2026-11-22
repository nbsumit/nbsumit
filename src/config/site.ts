export interface NavLink {
  label: string;
  href: string;
}

export const SITE = {
  name: 'Sumit',
  fullName: 'Sumit Sengar',
  handle: 'nbsumit',
  domain: 'nbsumit.com',
  url: 'https://nbsumit.com/',
  title: 'Sumit | Independent Founder & Builder',
  description:
    'Sumit is an independent founder and builder. He makes useful products: Orbis, Orbis3D, Bittyfy, ApplyReady and GATE CS Mastery.',
  email: 'hello@nbsumit.com',
  role: 'Independent Founder & Builder',
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Vision', href: '#vision' },
    { label: 'Connect', href: '#connect' },
  ] as NavLink[],
};
