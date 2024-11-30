import { execSync } from 'child_process';

console.log(`
🎵 LyricTimer CLI Example
========================
Starting LyricTimer using npx...
`);

try {
  console.log('\nRunning timer with default settings...\n');
  
  execSync('npx @junjie-wu/lyric-timer-cli', {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('\nError:', error.message);
  console.log('\nTry running manually:');
  console.log('npx @junjie-wu/lyric-timer-cli');
  process.exit(1);
}
