#!/usr/bin/env node
import chalk from 'chalk';

import { main } from '../cli/index.js';

process.on('SIGINT', () => {
  console.log(chalk.dim('\nGracefully shutting down...'));
  process.exit(0);
});

main().catch((error) => {
  console.error(chalk.red('\nError starting timer:'), error);
  console.log(chalk.dim('\nTry running with --help for usage information'));
  process.exit(1);
});
