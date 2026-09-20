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

// 4. Copy dist/site.webmanifest to root
const manifestSrc = path.join(distDir, 'site.webmanifest');
if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, path.join(rootDir, 'site.webmanifest'));
  console.log('✓ Synced dist/site.webmanifest -> ./site.webmanifest');
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

for (const filePath of checkFiles) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('—')) {
      console.error(`QA Failure: Em dash (—) found in ${filePath}`);
      process.exit(1);
    }
  }
}
console.log('✓ QA Verified: 0 em dash (—) occurrences in production assets');
