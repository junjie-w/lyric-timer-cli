import { cursorTo } from 'node:readline';

import type { Lyric } from './types.js';

export const getRandomLyric = (lyrics: Lyric[], currentLyric?: Lyric): Lyric => {
  let newLyric;
  do {
    newLyric = lyrics[Math.floor(Math.random() * lyrics.length)];
  } while (currentLyric && newLyric.text === currentLyric.text && lyrics.length > 1);
  return newLyric;
};

export const rightAlign = (text: string, width: number, rightPadding: number = 30): string => {
  const lines = text.split('\n');
  return lines.map(line => {
    const effectiveWidth = width - rightPadding;
    return ' '.repeat(Math.max(0, effectiveWidth - line.length)) + line + ' '.repeat(rightPadding);
  }).join('\n');
};

export const formatTime = (timeInSeconds: number): string => {
  const seconds = Math.max(0, timeInSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const clearScreen = (): void => {
  console.clear();
  cursorTo(process.stdout, 0, 0);
};

export const formatDuration = (minutes: number): string => `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
export const formatInterval = (seconds: number): string => `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
