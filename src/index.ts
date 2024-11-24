import chalk from 'chalk';

import { DEFAULT_CONFIG } from './constants.js';
import { startTimer } from './timer.js';

console.log(chalk.blue('\n🎵 LyricTimer'));
console.log(chalk.dim('✨ A gentle companion for your focus time 🌟\n'));

console.log('Timer Settings:');
console.log(chalk.dim(`• Duration: ${DEFAULT_CONFIG.duration} minutes`));
console.log(chalk.dim(`• Lyrics Interval: ${DEFAULT_CONFIG.lyricInterval} seconds\n`));

console.log('Controls:');
console.log(chalk.dim('• Space: Pause/Resume'));
console.log(chalk.dim('• q: Quit\n'));

await new Promise(resolve => setTimeout(resolve, 2000));

startTimer(DEFAULT_CONFIG).catch(console.error);

process.on('uncaughtException', (error) => {
  console.error(chalk.red('An unexpected error occurred:', error));
  process.exit(1);
});
