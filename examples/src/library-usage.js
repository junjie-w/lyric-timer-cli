import { createTimer } from '@junjie-wu/lyric-timer-cli';

console.log(`
🎵 LyricTimer Library Example
============================
Starting a 20-minute focus session with 15-second lyric intervals...
`);

await new Promise(resolve => setTimeout(resolve, 1000));

try {
  await createTimer({
    duration: 20,
    lyricInterval: 15,
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
