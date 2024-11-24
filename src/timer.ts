import { DEFAULT_CONFIG, DEFAULT_LYRICS } from './constants.js';
import  { type TimerConfig, type Lyric, ConfigurationError, TimerError } from './types.js';
import { getRandomLyric, validateConfig } from './utils.js';

const startTimer = async (
  config: TimerConfig = DEFAULT_CONFIG,
  lyrics: Lyric[] = DEFAULT_LYRICS,
): Promise<void> => {
  try {
    validateConfig(config);

    let remainingSeconds = config.duration * 60;
    const currentLyric = getRandomLyric(lyrics);
    console.log(`\nCurrent lyric: ${currentLyric.text}`);

    let shouldExit = false;

    process.on('SIGINT', () => {
      console.log('\n\nTimer interrupted. Cleaning up...');
      shouldExit = true;
    });

    while (!shouldExit && remainingSeconds > 0) {
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      process.stdout.write(`\rTime remaining: ${timeDisplay}`);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (_error) {
        throw new TimerError('Timer interrupted unexpectedly');
      }
      
      remainingSeconds--;
    }

    if (!shouldExit) {
      console.log('\n\nTimer completed! 🎉');
    }
  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error('\n❌ Configuration Error:', error.message);
      process.exit(1);
    } else if (error instanceof TimerError) {
      console.error('\n❌ Timer Error:', error.message);
      process.exit(2);
    } else {
      console.error('\n❌ Unexpected Error:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(3);
    }
  }
};

export { startTimer, TimerError, ConfigurationError };
