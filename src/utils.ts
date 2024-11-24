import { cursorTo } from 'node:readline';

import { ConfigurationError, type Lyric, type TimerConfig } from './types.js';

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

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

export const clearScreen = (): void => {
  console.clear();
  cursorTo(process.stdout, 0, 0);
};

export const validateConfig = (config: TimerConfig): void => {
  if (config.duration <= 0) {
    throw new ConfigurationError('Timer duration must be greater than 0');
  }
  if (config.lyricInterval <= 0) {
    throw new ConfigurationError('Lyric interval must be greater than 0');
  }
};
