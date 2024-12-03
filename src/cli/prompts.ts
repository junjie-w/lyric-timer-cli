import {  outro, select, text, isCancel } from '@clack/prompts';

import { DurationOption, IntervalOption } from '../shared/types.js';

export const getDurationPrompt = async (): Promise<number> => {
  const duration = await select<DurationOption>({
    message: '⏱ Choose your focus session duration',
    options: [
      { value: 25, label: '25 minutes' },
      { value: 45, label: '45 minutes' },
      { value: 60, label: '60 minutes' },
      { value: 'custom', label: '✨ Custom duration' },
    ],
  });

  if (isCancel(duration)) {
    outro('See you next time! 👋');
    process.exit(0);
  }
  
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

    return Number(customDuration);
  } 
  return duration;
};

export const getIntervalPrompt = async (): Promise<number> => {
  const interval = await select<IntervalOption>({
    message: '🎵 How often should lyrics change?',
    options: [
      { value: 15, label: '15 seconds' },
      { value: 30, label: '30 seconds' },
      { value: 60, label: '60 seconds' },
      { value: 'custom', label: '✨ Custom interval' },
    ],
  });
  
  if (isCancel(interval)) {
    outro('See you next time! 👋');
    process.exit(0);
  }
  
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
  
    return Number(customInterval);
  } 
  return interval;
};

