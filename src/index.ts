import { startTimer } from './core/timer.js';

export const createTimer = async (options: {
  duration?: number;
  lyricInterval?: number;
}): Promise<void> => {
  const config = {
    duration: options.duration || 25,
    lyricInterval: options.lyricInterval || 15,
    isPaused: false,
  };
  
  return startTimer(config);
};

export { startTimer } from './core/timer.js';
export type { TimerConfig, Lyric } from './core/types.js';
