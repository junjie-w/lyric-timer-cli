import chalk from 'chalk';

import { getTimerConfig } from './configs.js';
import { startTimer } from '../core/timer.js';

export const main = async (): Promise<void> => {
  try {
    const config = await getTimerConfig();
    
    console.log('\nControls:');
    console.log(chalk.dim('• Space: Pause/Resume'));
    console.log(chalk.dim('• q: Quit\n'));

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

if (process.argv[1]?.endsWith('cli/index.ts') || 
    process.argv[1]?.endsWith('cli/index.js')) {
  main().catch((error) => {
    console.error(chalk.red('\nFatal error:', error));
    process.exit(1);
  });
}
