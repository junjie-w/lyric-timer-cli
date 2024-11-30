import { intro, outro, select, text, isCancel, note, confirm } from '@clack/prompts';

import { DEFAULT_CONFIG, SETTINGS_SEPARATOR } from '../core/constants.js';

import type { TimerConfig } from '../core/types.js';

type DurationOption = 25 | 45 | 60 | 'custom';
type IntervalOption = 15 | 30 | 60 | 'custom';

export const getTimerConfig = async (): Promise<TimerConfig> => {
  intro('🎵 Welcome to LyricTimer');

  const formatDuration = (minutes: number): string => `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  
  const formatInterval = (seconds: number): string => `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;

  const useDefaults = await confirm({
    message: `Use default settings? (${DEFAULT_CONFIG.duration} minutes, ${DEFAULT_CONFIG.lyricInterval} seconds interval)`,
  });

  if (isCancel(useDefaults)) {
    outro('See you next time! 👋');
    process.exit(0);
  }

  if (useDefaults) {
    note(`
      Using default settings:
      • Duration: ${formatDuration(DEFAULT_CONFIG.duration)}
      • Lyrics change: Every ${formatInterval(DEFAULT_CONFIG.lyricInterval)}
      ${SETTINGS_SEPARATOR}
      Starting in 3 seconds...
    `);

    await new Promise(resolve => setTimeout(resolve, 3000));
    return DEFAULT_CONFIG;
  }

  const duration = await select<DurationOption>({
    message: '⏱ Choose your focus session duration',
    options: [
      { value: 25, label: '🍅 Pomodoro (25 minutes)' },
      { value: 45, label: '🎯 Focus Block (45 minutes)' },
      { value: 60, label: '🌊 Deep Work (60 minutes)' },
      { value: 'custom', label: '✨ Custom duration' },
    ],
  });

  if (isCancel(duration)) {
    outro('See you next time! 👋');
    process.exit(0);
  }

  let finalDuration: number;
  if (duration === 'custom') {
    const customDuration = await text({
      message: '⏱ Enter your preferred duration in minutes',
      placeholder: '25',
      validate(value) {
        const num = Number(value);
        if (isNaN(num)) {return 'Please enter a valid number';}
        if (num <= 0) {return 'Duration must be greater than 0';}
        if (num > 180) {return 'Maximum duration is 180 minutes';}
        return;
      },
    });

    if (isCancel(customDuration)) {
      outro('See you next time! 👋');
      process.exit(0);
    }

    finalDuration = Number(customDuration);
  } else {
    finalDuration = duration;
  }

  const interval = await select<IntervalOption>({
    message: '🎵 How often should lyrics change?',
    options: [
      { value: 15, label: '🚀 Frequent (15 seconds)' },
      { value: 30, label: '⚡️ Regular (30 seconds)' },
      { value: 60, label: '🌟 Relaxed (60 seconds)' },
      { value: 'custom', label: '✨ Custom interval' },
    ],
  });

  if (isCancel(interval)) {
    outro('See you next time! 👋');
    process.exit(0);
  }

  let finalInterval: number;
  if (interval === 'custom') {
    const customInterval = await text({
      message: 'Enter interval in seconds',
      placeholder: '30',
      validate(value) {
        const num = Number(value);
        if (isNaN(num)) {return 'Please enter a valid number';}
        if (num < 5) {return 'Minimum interval is 5 seconds';}
        if (num > 300) {return 'Maximum interval is 300 seconds';}
        return;
      },
    });

    if (isCancel(customInterval)) {
      outro('See you next time! 👋');
      process.exit(0);
    }

    finalInterval = Number(customInterval);
  } else {
    finalInterval = interval;
  }

  note(`
    Session configured:
    • Duration: ${formatDuration(finalDuration)}
    • Lyrics change: Every ${formatInterval(finalInterval)}
    ${SETTINGS_SEPARATOR}
    Starting in 3 seconds...
  `);

  await new Promise(resolve => setTimeout(resolve, 3000));

  return {
    ...DEFAULT_CONFIG,
    duration: finalDuration,
    lyricInterval: finalInterval,
  };
};
