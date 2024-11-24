import { DEFAULT_CONFIG, DEFAULT_LYRICS } from './constants.js';
import { renderFrame, showExitMessage } from './renderer.js';
import { getRandomLyric } from './utils.js';

import type { TimerConfig, Lyric } from './types.js';

const startTimer = async (
  config: TimerConfig = DEFAULT_CONFIG,
  lyrics: Lyric[] = DEFAULT_LYRICS,
): Promise<never> => {
  let remainingSeconds = config.duration * 60;
  let currentLyric = getRandomLyric(lyrics);
  let lyricUpdateTime = Date.now();
  let statusMessage = '';
  let shouldExit = false;

  const cleanup = (): void => {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    process.stdin.pause();
    showExitMessage();
    process.exit(0);
  };

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  const handleInput = (key: string): void => {
    if (key === '\u0003' || key === 'q') {
      shouldExit = true;
      cleanup();
      return;
    }
    
    if (key === ' ') {
      config.isPaused = !config.isPaused;
      statusMessage = config.isPaused ? '⏸ Timer paused' : '▶️ Timer resumed';
    }
  };

  process.stdin.on('data', handleInput);

  while (!shouldExit) {
    try {
      renderFrame(remainingSeconds, currentLyric, config, statusMessage);
      
      if (statusMessage) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        statusMessage = '';
      }

      if (!config.isPaused) {
        if (Date.now() - lyricUpdateTime >= config.lyricInterval * 1000) {
          const currentIndex = lyrics.indexOf(currentLyric);
          const nextIndex = (currentIndex + 1) % lyrics.length;
          currentLyric = lyrics[nextIndex];
          lyricUpdateTime = Date.now();
        }

        if (remainingSeconds > 0) {
          remainingSeconds--;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error in timer loop:', error);
      cleanup();
    }
  }

  return Promise.resolve() as Promise<never>;
};

export { startTimer };
