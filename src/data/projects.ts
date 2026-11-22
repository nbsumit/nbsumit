/**
 * Public work shown on nbsumit.com.
 * To add a project later, append an item to PROJECTS and, if it needs a new
 * group, add that group to GROUPS. Copy and status should match the live site.
 */

export type GroupId = 'software' | 'venture' | 'education';

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  group: GroupId;
  url: string;
  summary: string;
  body: string;
  /** What is true today, including anything that is only a direction. */
  status: string;
  action: string;
  links?: ProjectLink[];
  image?: ProjectImage;
}

export const GROUPS: { id: GroupId; title: string; intro?: string }[] = [
  {
    id: 'software',
    title: 'Independent software',
    intro: 'Orbis is a GIS workspace. Orbis3D is for terrain. They belong together, and they are not the same product.',
  },
  {
    id: 'venture',
    title: 'Products and ventures',
  },
  {
    id: 'education',
    title: 'Education',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'orbis',
    name: 'Orbis',
    group: 'software',
    url: 'https://orbis.nbsumit.com/',
    summary: 'A GIS workspace in the browser.',
    body: 'Orbis opens vector and raster data and works the way a desktop GIS does: layers, attribute tables, styling and classification, a processing toolbox, a raster calculator, workflows, coordinate reference systems, and maps prepared for print. Files are read and processed on your own computer. There is no account, and nothing is installed.',
    status: 'Free to use.',
    action: 'Open Orbis',
    image: {
      src: '/work/orbis.webp',
      width: 1440,
      height: 900,
      alt: 'The Orbis workspace, with a classified map, an attribute table and a style panel.',
    },
  },
  {
    id: 'orbis3d',
    name: 'Orbis3D',
    group: 'software',
    url: 'https://orbis3d.nbsumit.com/',
    summary: 'Elevation data, as 3D terrain.',
    body: 'Orbis3D turns a digital elevation model into terrain you can light, colour and measure. It computes slope, aspect, hillshade, contours and profiles, follows how water moves across a surface, and includes runoff tools plus an experimental flood model. It reads GeoTIFF, Cloud Optimized GeoTIFF, ESRI ASCII Grid and SRTM, and it can export 3D models. Processing stays on your computer.',
    status: 'Free and open source.',
    action: 'Open Orbis3D',
    image: {
      src: '/work/orbis3d.webp',
      width: 1440,
      height: 900,
      alt: 'Orbis3D showing a 3D terrain model of the Nanda Devi SRTM elevation data.',
    },
  },
  {
    id: 'bittyfy',
    name: 'Bittyfy',
    group: 'venture',
    url: 'https://bittyfy.com',
    summary: 'A digital presence and QR platform for small businesses.',
    body: 'Bittyfy is for cafés, restaurants, dhabas, food stalls and local shops in India. Print it once. Change it anytime. Never reprint. This is the fourth launch, and the phase is called Bittyfy Reborn. A good deal of the architecture is new.',
    status:
      'Live now: a permanent QR code, a destination you can change later, print-ready cards, menus, posters and stickers, and a page of links. A few links are free. More links, and tools such as scheduling, are on annual plans. A single place for a shop, with its links, menu and contact details, is the direction of this phase. It is not offered as a finished feature.',
    action: 'Open Bittyfy',
  },
  {
    id: 'applyready',
    name: 'ApplyReady',
    group: 'venture',
    url: 'https://applyready.in',
    summary: 'Free tools for a job application.',
    body: 'ApplyReady is a resume builder, together with tools for the photos, signatures and PDFs an application form asks for. Everything runs in the browser. Files are not uploaded. There is no account, no advertising and no paid tier, and the code is public.',
    status: 'Free.',
    action: 'Open ApplyReady',
  },
  {
    id: 'gate-cs-mastery',
    name: 'GATE CS Mastery',
    group: 'education',
    url: 'https://gatecsmastery.com',
    summary: 'Study material for the GATE Computer Science exam.',
    body: 'Cheat sheets and formula sheets, with pages you can look through before you buy them. The free study site has short notes, study pages by subject and topic, previous-year questions with solutions, and timed mock tests, including past papers. A large part of the material is free so the basics are not something a person has to pay for.',
    status: 'Live. Notes, past questions and mock tests are free. Cheat sheets and formula sheets are sold.',
    action: 'Open GATE CS Mastery',
    links: [
      {
        label: 'Free study material',
        href: 'https://static.gatecsmastery.com/',
      },
    ],
  },
];
