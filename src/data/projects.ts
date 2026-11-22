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
    intro: 'Orbis and Orbis3D belong to the same family, and they are separate tools. Orbis is for maps and spatial analysis. Orbis3D is for terrain.',
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
    summary: 'A GIS application in the browser, for geospatial data.',
    body: 'Orbis is meant to make geospatial processing and analysis easier to reach, without installing desktop software. It opens vector and raster data and follows the habits of a desktop GIS: layers, attribute tables, styling and classification, a processing toolbox, a raster calculator, workflows, coordinate reference systems, and maps prepared for print. Files are read and processed on your own computer. There is no account.',
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
    summary: '3D terrain in the browser, in its own workspace.',
    body: 'Orbis3D sits beside Orbis. It is not a mode inside it. Open an elevation model and turn it into terrain you can light, colour and measure. The workspace computes slope, aspect, hillshade, contours and profiles, follows how water moves across a surface, and includes runoff tools plus an experimental flood model. It reads GeoTIFF, Cloud Optimized GeoTIFF, ESRI ASCII Grid and SRTM, and it can export a 3D model. Processing stays on your computer.',
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
    summary: 'A digital presence and QR platform for small businesses in India.',
    body: 'Bittyfy is in a major rebuild called Bittyfy Reborn, its fourth launch. The direction is a simple digital presence for cafes, restaurants, dhabas, food stalls, local shops and other small businesses. Print it once. Change it anytime. Never reprint.',
    status:
      'What you can use today is a link you name, a QR code that stays the same when the destination changes, print for cards, menus, posters and stickers, and a page of links. A few links are free. Annual plans add more links, and tools such as scheduling. A single place for a shop\'s links, menu and contact details is where this phase is going. That part is not finished.',
    action: 'Open Bittyfy',
  },
  {
    id: 'applyready',
    name: 'ApplyReady',
    group: 'venture',
    url: 'https://applyready.in',
    summary: 'Free tools for a resume and the documents a job application asks for.',
    body: 'ApplyReady is a resume builder, and it also prepares photos, signatures and PDFs to the size a form requires. It runs in the browser. Files are not uploaded. There is no account, no advertising and no paid tier.',
    status: 'Free.',
    action: 'Open ApplyReady',
  },
  {
    id: 'gate-cs-mastery',
    name: 'GATE CS Mastery',
    group: 'education',
    url: 'https://gatecsmastery.com',
    summary: 'Study material for the GATE Computer Science exam, with a substantial share of it free.',
    body: 'GATE CS Mastery is an educational project for GATE Computer Science. Cheat sheets and formula sheets cover the subjects, and you can preview pages before buying them. The study site beside them is free and needs no account: short notes, topic pages, previous-year questions with solutions, and timed mock tests, including past papers.',
    status: 'Notes, past questions and mock tests are free. Cheat sheets and formula sheets are sold.',
    action: 'Open GATE CS Mastery',
    links: [
      {
        label: 'Free study material',
        href: 'https://static.gatecsmastery.com/',
      },
    ],
  },
];
