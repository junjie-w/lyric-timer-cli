import chalk from 'chalk';

import { SEPARATOR, TIME_SEPARATOR_TOP, TIME_SEPARATOR_BOTTOM } from './constants.js';
import { clearScreen, rightAlign, formatTime } from './utils.js';

import type { Lyric, TimerConfig } from './types.js';

export const renderTimer = (
  remainingSeconds: number,
  currentLyric: Lyric,
  config: TimerConfig,
  message: string = '',
): void => {
  clearScreen();
    
  const consoleWidth = process.stdout.columns || 80;

  console.log('');
  console.log(chalk.blue('🎵 LyricTimer'));
  console.log(chalk.dim('✨  A gentle companion for your focus time 🌟'));
  console.log('');

  console.log(rightAlign(chalk.dim(SEPARATOR), consoleWidth));
  console.log(rightAlign(chalk.dim(`🎵 ${currentLyric.text}`), consoleWidth));
  console.log(rightAlign(chalk.dim(`   ~ ${currentLyric.artist}, ${currentLyric.year}`), consoleWidth));
  console.log(rightAlign(chalk.dim(SEPARATOR), consoleWidth));

  const formattedTime = formatTime(remainingSeconds);
  const separatorLength = TIME_SEPARATOR_TOP.length;
  const timeOffset = Math.floor((separatorLength - formattedTime.length) / 2);

  console.log(chalk.dim(TIME_SEPARATOR_TOP));
  console.log(
    chalk.dim(' '.repeat(timeOffset)) + 
    chalk.cyan(formattedTime) + 
    chalk.dim(' '.repeat(timeOffset)),
  );
  console.log(chalk.dim(TIME_SEPARATOR_BOTTOM));
  console.log('');

  if (message) {
    console.log(chalk.dim(message));
  } else if (config.isPaused) {
    console.log(chalk.green('⏸  Timer paused...'));
  }
};

export const showExitMessage = (): void => {
  console.clear();
  console.log(chalk.blue('\n🌟 Thank you for using LyricTimer'));
  console.log(chalk.dim('Every focused second shapes your story'));
  console.log(chalk.dim('Your dedication lights up the world'));
  console.log(chalk.dim('\nSee you on your next adventure ✨\n'));
  process.exit(0);
};
