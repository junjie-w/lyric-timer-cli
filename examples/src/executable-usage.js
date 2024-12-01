import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..', '..');
const EXECUTABLE_PATH = join(ROOT_DIR, 'executables', 'index.js');

console.log(`
📦 LyricTimer Executable Example
==============================
Starting LyricTimer using standalone executable...
`);

async function buildExecutable() {
  console.log('Executable not found. Building it now...\n');
  try {
    execSync('npm run build:exe', {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
    console.log('\nBuild complete! Starting LyricTimer...\n');
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

try {
  if (!existsSync(EXECUTABLE_PATH)) {
    await buildExecutable();
  }

  execSync(`node ${EXECUTABLE_PATH}`, {
    stdio: 'inherit',
    cwd: __dirname,
  });
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\nIf the error persists, try rebuilding manually:');
  console.log('cd ..');
  console.log('npm run build:exe');
}
