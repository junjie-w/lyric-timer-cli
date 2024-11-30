import chalk from 'chalk';

import { DEFAULT_CONFIG, DEFAULT_LYRICS } from './constants.js';
import { renderTimer, showExitMessage } from './renderer.js';
import { getRandomLyric } from './utils.js';

import type { TimerConfig, Lyric } from './types.js';

export const startTimer = async (
  config: TimerConfig = DEFAULT_CONFIG,
  lyrics: Lyric[] = DEFAULT_LYRICS,
  testMode = false,
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
    if (!testMode) {
      process.exit(0);
    }
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
      statusMessage = config.isPaused ? '⏸  Timer paused...' : '▶️  Timer resumed!';
    }
  };

  process.stdin.on('data', handleInput);

  while (!shouldExit) {
    try {
      renderTimer(remainingSeconds, currentLyric, config, statusMessage);
      
      if (statusMessage) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        statusMessage = '';
      }

      if (!config.isPaused) {
        if (Date.now() - lyricUpdateTime >= config.lyricInterval * 1000) {
          currentLyric = getRandomLyric(lyrics, currentLyric);
          lyricUpdateTime = Date.now();
        }

        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          console.clear();
          console.log(chalk.green('\n✨ Timer completed! Great work!\n'));
          await new Promise(resolve => setTimeout(resolve, 1500));
          cleanup();
          if (!testMode) {
            process.exit(0);
          }
          shouldExit = true;
          break;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error in timer loop:', error);
      cleanup();
      if (!testMode) {
        process.exit(1);
      }
      throw error;
    }
  }

  return Promise.resolve() as Promise<never>;
};
