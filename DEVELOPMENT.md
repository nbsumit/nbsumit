# nbsumit.com

Personal site for Sumit. Vite, React and TypeScript, deployed to GitHub Pages from `main`.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```

`npm run build` typechecks, bundles into `dist/`, and copies the Pages files back to the repository root so either publishing path can serve the site. `CNAME` stays `nbsumit.com`.

## Where things live

- `src/App.tsx` and `src/space/engine.ts` are the opening: the starfield, the count, the NB mark drawing itself, and the moon on the ring.
- `src/index.css` is that opening's styling. Leave its timing and geometry alone unless you are changing the animation on purpose.
- `src/site.css` and `src/components/` are the page that follows the opening.
- `src/data/projects.ts` is the list of public work. Add a project there.
- `src/config/socials.ts` is the profiles that were checked and are linked.
- `src/config/site.ts` is the name, title, navigation and email.

Reduced motion skips the opening sequence and shows the page. A link to a section (`/#philosophy`) does the same, so the link lands on that section.
