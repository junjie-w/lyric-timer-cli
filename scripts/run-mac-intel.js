import { execSync } from 'node:child_process';

try {
  execSync('gunzip -c executables/lyric-timer-darwin-x64.gz > executables/lyric-timer-darwin-x64', { stdio: 'inherit' });
  execSync('chmod +x executables/lyric-timer-darwin-x64', { stdio: 'inherit' });
  execSync('./executables/lyric-timer-darwin-x64', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running Mac Intel executable:', error);
  process.exit(1);
}