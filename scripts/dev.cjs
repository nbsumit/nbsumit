const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Run prebuild logic to ensure index.html has /src/main.tsx
require('./prebuild.cjs');

// Spawn vite dev server
const isWindows = process.platform === 'win32';
const cmd = isWindows ? 'npx.cmd' : 'npx';
const child = spawn(cmd, ['vite'], { stdio: 'inherit', shell: true });

child.on('close', (code) => {
  process.exit(code || 0);
});
