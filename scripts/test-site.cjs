const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

test('Site Invariants & Configuration QA', async (t) => {
  await t.test('CNAME file matches authoritative domain', () => {
    const cnamePath = path.join(rootDir, 'CNAME');
    assert.ok(fs.existsSync(cnamePath), 'CNAME must exist');
    const content = fs.readFileSync(cnamePath, 'utf8').trim();
    assert.equal(content, 'nbsumit.com', 'CNAME must be nbsumit.com');
  });

  await t.test('robots.txt exists and references sitemap', () => {
    const robotsPath = path.join(rootDir, 'public', 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'public/robots.txt must exist');
    const content = fs.readFileSync(robotsPath, 'utf8');
    assert.ok(content.includes('Sitemap: https://nbsumit.com/sitemap.xml'), 'robots.txt must reference sitemap');
  });

  await t.test('sitemap.xml exists and has canonical loc', () => {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    assert.ok(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
    const content = fs.readFileSync(sitemapPath, 'utf8');
    assert.ok(content.includes('<loc>https://nbsumit.com/</loc>'), 'sitemap.xml must have https://nbsumit.com/');
  });

  await t.test('GitHub Profile README is preserved', () => {
    const readmePath = path.join(rootDir, 'README.md');
    assert.ok(fs.existsSync(readmePath), 'README.md must exist');
    const content = fs.readFileSync(readmePath, 'utf8');
    assert.ok(content.includes('Sumit Sengar'), 'README must identify Sumit Sengar');
    assert.ok(content.includes('hello@nbsumit.com'), 'README must contain official email');
    assert.ok(content.includes('nbsumit.com'), 'README must contain official domain');
  });

  await t.test('index.html contains production SEO & canonical link', () => {
    const indexPath = path.join(rootDir, 'index.html');
    assert.ok(fs.existsSync(indexPath), 'index.html must exist');
    const content = fs.readFileSync(indexPath, 'utf8');
    assert.ok(content.includes('<title>nbsumit</title>'), 'Title must be nbsumit');
    assert.ok(content.includes('rel="canonical" href="https://nbsumit.com/"'), 'Canonical link must be present');
    assert.ok(!content.includes('—'), 'No em dash in index.html to guarantee postbuild integrity');
  });

  await t.test('Original brand logo and favicon assets exist', () => {
    const iconFiles = [
      'nb-brand.png',
      'favicon.ico',
      'favicon-32x32.png',
      'favicon-16x16.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'site.webmanifest'
    ];
    for (const f of iconFiles) {
      assert.ok(
        fs.existsSync(path.join(rootDir, 'public', f)) || fs.existsSync(path.join(rootDir, f)),
        `Icon asset ${f} must exist`
      );
    }
  });
});
