import { startTimer } from './timer.js';

const DEFAULT_CONFIG = {
  duration: 25,
  lyricInterval: 30,
  isPaused: false,
};

console.log('🎵 Timer Starting...');
startTimer(DEFAULT_CONFIG);
