import { note } from '@clack/prompts';

import { SETTINGS_SEPARATOR } from '../shared/constants.js';
import { formatDuration, formatInterval } from '../shared/utils.js';

export const showDefaultSettings = (duration: number, interval: number): void => {
  note(`
    Using default settings:
    • Duration: ${formatDuration(duration)}
    • Lyrics change: Every ${formatInterval(interval)}

    Controls:
    • Space: Pause/Resume
    • q: Quit

    ${SETTINGS_SEPARATOR}
    Starting...
  `);
};

export const showCustomSettings = (duration: number, interval: number): void => {
  note(`
    Session configured:
    • Duration: ${formatDuration(duration)}
    • Lyrics change: Every ${formatInterval(interval)}

    Controls:
    • Space: Pause/Resume
    • q: Quit

    ${SETTINGS_SEPARATOR}
    Starting...
  `);
};
