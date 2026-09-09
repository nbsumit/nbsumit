const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace any production bundle script/link with the source entry point
html = html.replace(/<script type=["']module["'] crossorigin src=["']\/assets\/index-.*?\.js["']><\/script>/g, '');
html = html.replace(/<link rel=["']stylesheet["'] crossorigin href=["']\/assets\/index-.*?\.css["']>/g, '');

if (!html.includes('/src/main.tsx')) {
  html = html.replace('</div>', '</div>\n    <script type="module" src="/src/main.tsx"></script>');
}

html = html.replace(/\n\s*\n\s*\n+/g, '\n\n');
html = html.replace(/\n\s*\n\s*<\/body>/, '\n  </body>');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ Prepared index.html with source entrypoint /src/main.tsx');
