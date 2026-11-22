const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist.');
  process.exit(1);
}

// 1. Copy dist/index.html to root
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(rootDir, 'index.html'));
console.log('✓ Synced dist/index.html -> ./index.html');

// 2. Copy dist/assets to root
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssets)) {
  fs.rmSync(rootAssets, { recursive: true, force: true });
}
fs.cpSync(distAssets, rootAssets, { recursive: true });
console.log('✓ Synced dist/assets -> ./assets');

// 3. Keep the official NB favicon package available from the repository root too.
// nbsumit.com currently has both artifact-based and root-based Pages publishing paths,
// so /favicon/* must resolve correctly in either deployment.
const publicFavicon = path.join(rootDir, 'public', 'favicon');
const rootFavicon = path.join(rootDir, 'favicon');
if (!fs.existsSync(publicFavicon)) {
  console.error('Error: public/favicon directory does not exist.');
  process.exit(1);
}
if (fs.existsSync(rootFavicon)) {
  fs.rmSync(rootFavicon, { recursive: true, force: true });
}
fs.cpSync(publicFavicon, rootFavicon, { recursive: true });
console.log('✓ Synced ./public/favicon -> ./favicon');

const rootIconFiles = [
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];
for (const file of rootIconFiles) {
  const src = path.join(distDir, file);
  if (!fs.existsSync(src)) {
    console.error(`Error: missing production icon ${file}`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(rootDir, file));
}
console.log('✓ Synced standard root favicon files');

const publicFonts = path.join(rootDir, 'public', 'fonts');
const rootFonts = path.join(rootDir, 'fonts');
if (fs.existsSync(publicFonts)) {
  if (fs.existsSync(rootFonts)) {
    fs.rmSync(rootFonts, { recursive: true, force: true });
  }
  fs.cpSync(publicFonts, rootFonts, { recursive: true });
  console.log('✓ Synced ./public/fonts -> ./fonts');
}

const markSrc = path.join(distDir, 'nb-mark.png');
if (!fs.existsSync(markSrc)) {
  console.error('Error: missing production asset nb-mark.png');
  process.exit(1);
}
fs.copyFileSync(markSrc, path.join(rootDir, 'nb-mark.png'));
console.log('✓ Synced dist/nb-mark.png -> ./nb-mark.png');

// 4. Copy dist/site.webmanifest, robots.txt, sitemap.xml to root
const rootMetaFiles = ['site.webmanifest', 'robots.txt', 'sitemap.xml', 'og.jpg'];
for (const file of rootMetaFiles) {
  const src = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(rootDir, file));
    console.log(`✓ Synced dist/${file} -> ./${file}`);
  }
}

const distWork = path.join(distDir, 'work');
const rootWork = path.join(rootDir, 'work');
if (fs.existsSync(distWork)) {
  if (fs.existsSync(rootWork)) {
    fs.rmSync(rootWork, { recursive: true, force: true });
  }
  fs.cpSync(distWork, rootWork, { recursive: true });
  console.log('✓ Synced dist/work -> ./work');
}

// 5. Ensure .nojekyll exists in root
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
console.log('✓ Verified ./.nojekyll');

// 6. Ensure CNAME exists in root
fs.writeFileSync(path.join(rootDir, 'CNAME'), 'nbsumit.com\n');
console.log('✓ Verified ./CNAME (nbsumit.com)');

// 7. QA Check: Ensure no em dash (—) character in any production file
const checkFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'site.webmanifest'),
  ...fs.readdirSync(rootAssets).map(f => path.join(rootAssets, f))
];

const hasEmoji = (text) => /\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(text.replace(/[\u00A9\u00AE]/g, ''));

for (const filePath of checkFiles) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('—') || content.includes('&mdash;') || content.includes('&#8212;')) {
      console.error(`QA Failure: Em dash found in ${filePath}`);
      process.exit(1);
    }
    if (/\.(html|js|css)$/.test(filePath) && hasEmoji(content)) {
      console.error(`QA Failure: Emoji found in ${filePath}`);
      process.exit(1);
    }
  }
}
console.log('✓ QA Verified: no em dash or emoji in production HTML, JS and CSS');
