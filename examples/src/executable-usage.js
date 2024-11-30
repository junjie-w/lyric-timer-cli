import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(`
📦 LyricTimer Executable Example
==============================
Starting timer using standalone executable...
`);

try {
  console.log('Running standalone executable...\n');
  
  execSync('node ../../executables/index.js', {
    stdio: 'inherit',
    cwd: __dirname,
  });
} catch (error) {
  console.error('\n❌ Error:', error.message);
  
  console.log(`
Troubleshooting:
1. Make sure you've built the executable:
   cd ..
   npm run build:executables

2. Try running the executable directly:
   node ../../executables/index.js

Note: This example uses the Node.js executable version.
The compressed distributable can be found in executables/lyric-timer-*.gz
`);
}
