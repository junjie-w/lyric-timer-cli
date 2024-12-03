import chalk from 'chalk';

import { getTimerConfig } from './configs.js';
import { startTimer } from '../core/timer.js';

export const main = async (): Promise<void> => {
  try {
    const config = await getTimerConfig();
    await startTimer(config);
  } catch (error) {
    console.error(chalk.red('\nAn unexpected error occurred:', error));
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error(chalk.red('\nAn unexpected error occurred:', error));
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(chalk.red('\nUnhandled promise rejection:', error));
  process.exit(1);
});

if (process.argv[1]?.match(/cli\/index\.(ts|js)$/)) {
  main().catch((error) => {
    console.error(chalk.red('\nUnhandled application error:', error));
    process.exit(1);
  });
}
