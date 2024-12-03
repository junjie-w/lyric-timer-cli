import { createTimer } from '@junjie-wu/lyric-timer-cli';

console.log(`
🎵 LyricTimer Library Example
============================
Starting a 30-minute focus session with 10-second lyric intervals...
`);

await new Promise(resolve => setTimeout(resolve, 1000));

try {
  await createTimer({
    duration: 30,
    lyricInterval: 10,
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
