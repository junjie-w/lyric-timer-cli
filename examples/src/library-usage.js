import { createTimer } from '@junjie-wu/lyric-timer-cli';

console.log(`
🎵 LyricTimer Library Example
============================
Starting a 2-minute focus session with 15-second lyric intervals...
`);

try {
  await createTimer({
    duration: 2,
    lyricInterval: 15,
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
