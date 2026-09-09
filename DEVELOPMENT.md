# DEVELOPMENT.md — nbsumit.com Ecosystem Website

This repository houses both the **official website for [nbsumit.com](https://nbsumit.com)** and the **GitHub Profile README for [@nbsumit](https://github.com/nbsumit)**.

---

## 📁 Project Structure

```
nbsumit/
│
├── README.md              ← GitHub profile README for @nbsumit
├── CNAME                  ← nbsumit.com (custom domain for GitHub Pages)
│
├── src/                   ← Website source code
│   ├── components/        ← Modular UI components
│   │   ├── Navbar.tsx     ← Navigation, quick command palette trigger, theme toggle
│   │   ├── Hero.tsx       ← Introduction, status, call-to-actions, subtle socials
│   │   ├── EcosystemGrid.tsx ← Interactive showcase of projects (Bittyfy, sumitsengar.me, etc.)
│   │   ├── Philosophy.tsx ← Core engineering values & architecture principles
│   │   ├── About.tsx      ← Detailed bio, technical capabilities & subtle social links
│   │   ├── Contact.tsx    ← Dedicated "Find me online" section with all 5 social platforms
│   │   ├── Footer.tsx     ← Footer with all 5 social platforms & copyright
│   │   ├── SocialIcon.tsx ← Accessible, recognizable SVG icons for social platforms
│   │   └── CommandMenu.tsx← Cmd/Ctrl + K keyboard launcher
│   ├── config/
│   │   ├── socials.ts     ← CENTRALIZED SOCIAL LINKS CONFIGURATION
│   │   └── site.ts        ← Site metadata, author information, navigation links
│   ├── data/
│   │   └── ecosystem.ts   ← Project metadata, tags, URLs, and descriptions
│   ├── App.tsx            ← Root application layout and theme provider
│   ├── main.tsx           ← React DOM entry point
│   └── index.css          ← Tailwind CSS v4 directives & global typography
│
├── public/
│   ├── favicon/           ← Official NB brand mark & favicon package
│   │   ├── favicon.ico
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   └── site.webmanifest
│   └── assets/            ← Static brand and graphics assets
│
├── .github/
│   └── workflows/
│       └── deploy.yml     ← Automated GitHub Actions build & Pages deployment
│
├── index.html             ← HTML entry point with OpenGraph SEO & favicon links
├── package.json           ← Dependencies and scripts
├── vite.config.ts         ← Vite configuration with React and Tailwind CSS plugins
├── tsconfig.json          ← TypeScript compiler configuration
└── .gitignore             ← Clean gitignore excluding node_modules, dist, secrets
```

---

## 🔗 Centralized Social Links Configuration

All social media links are centralized in a single file:

```
src/config/socials.ts
```

The supported platforms are:
1. **GitHub** (`github`) — defaults to `https://github.com/nbsumit`
2. **LinkedIn** (`linkedin`) — placeholder `https://www.linkedin.com/in/YOUR_USERNAME`
3. **X (Twitter)** (`x`) — placeholder `https://x.com/YOUR_USERNAME`
4. **Instagram** (`instagram`) — placeholder `https://www.instagram.com/YOUR_USERNAME`
5. **YouTube** (`youtube`) — placeholder `https://youtube.com/@YOUR_CHANNEL`

### How to update your URLs:
Open `src/config/socials.ts` and replace the placeholder URLs with your actual profile URLs.
All parts of the website automatically update:
- **Footer**: displays all configured platforms.
- **Contact section**: renders dedicated cards with names, usernames, and icons.
- **About section**: displays subtle profile badges.
- **Hero section**: quick-access social icon row.
- **Command Palette (`Ctrl+K`)**: searchable social profile links.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js >= 20
- npm >= 10

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
This runs TypeScript checking (`tsc -b`) and Vite production bundling into `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

The project includes an automated GitHub Actions workflow at `.github/workflows/deploy.yml`.

Whenever changes are pushed to the `main` branch of `https://github.com/nbsumit/nbsumit.git`:
1. The GitHub Action checks out the repository.
2. Sets up Node.js and installs dependencies.
3. Builds the production bundle with `npm run build`.
4. Deploys the static `dist/` directory directly to GitHub Pages.
5. GitHub Pages serves the site under the custom domain configured in `CNAME` (`nbsumit.com`).

---

## 🎨 Visual Identity & Brand Assets

The website uses the **NB** brand mark located in `public/favicon/`.
- `favicon-32x32.png` is used as the navbar and hero brand icon.
- Favicon and Apple Touch icons are linked in `index.html`.
- Light and dark themes are supported with automatic system detection and localStorage persistence.
