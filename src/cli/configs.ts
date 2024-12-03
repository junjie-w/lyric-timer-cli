import { intro, outro,  isCancel, confirm } from '@clack/prompts';
import chalk from 'chalk';

import { showCustomSettings, showDefaultSettings } from './messagses.js';
import { getDurationPrompt, getIntervalPrompt } from './prompts.js';
import { DEFAULT_CONFIG } from '../shared/constants.js';

import type { TimerConfig } from '../shared/types.js';

export const getTimerConfig = async (): Promise<TimerConfig> => {
  intro(chalk.blue('🎵 Welcome to LyricTimer'));

  const useDefaults = await confirm({
    message: `Use default settings? (${DEFAULT_CONFIG.duration} minutes, ${DEFAULT_CONFIG.lyricInterval} seconds interval)`,
  });

  if (isCancel(useDefaults)) {
    outro('See you next time! 👋');
    process.exit(0);
  }

  if (useDefaults) {
    showDefaultSettings(DEFAULT_CONFIG.duration, DEFAULT_CONFIG.lyricInterval);

    await new Promise(resolve => setTimeout(resolve, 1800));
    return DEFAULT_CONFIG;
  }

  const finalDuration = await getDurationPrompt();
  const finalInterval = await getIntervalPrompt();

  showCustomSettings(finalDuration, finalInterval);

  await new Promise(resolve => setTimeout(resolve, 1800));

  return {
    ...DEFAULT_CONFIG,
    duration: finalDuration,
    lyricInterval: finalInterval,
  };
};
