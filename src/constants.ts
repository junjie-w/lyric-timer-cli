import type { Lyric } from './types.js';

export const DEFAULT_CONFIG = {
  duration: 25,
  lyricInterval: 15,
  isPaused: false,
};

export const SEPARATOR = '· · · · · · · · · · · · · · ·';
export const TIME_SEPARATOR = '✧ · · · · · ·';
export const SETTINGS_SEPARATOR = '┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄';

export const DEFAULT_LYRICS: Lyric[] = [
  {
    text: 'Sweet dreams are made of this,\nWho am I to disagree?',
    artist: 'Eurythmics',
    year: 1983,
  },
  {
    text: 'Blackbird singing in the dead of night,\nTake these broken wings and learn to fly.',
    artist: 'The Beatles',
    year: 1968,
  },
  {
    text: 'The sound of silence like a storm that\'s about to begin,\nDarkness settles in.',
    artist: 'Simon & Garfunkel',
    year: 1964,
  },
  {
    text: 'Is this the real life? Is this just fantasy?\nCaught in a landslide, no escape from reality.',
    artist: 'Queen',
    year: 1975,
  },
  {
    text: 'There\'s a lady who\'s sure all that glitters is gold,\nAnd she\'s buying a stairway to heaven.',
    artist: 'Led Zeppelin',
    year: 1971,
  },
  {
    text: 'Imagine there\'s no heaven,\nIt\'s easy if you try.',
    artist: 'John Lennon',
    year: 1971,
  },
  {
    text: 'Don\'t stop believin\',\nHold on to that feelin\'!',
    artist: 'Journey',
    year: 1981,
  },
  {
    text: 'Every breath you take, every move you make,\nI\'ll be watching you.',
    artist: 'The Police',
    year: 1983,
  },
  {
    text: 'You may say I\'m a dreamer,\nBut I\'m not the only one.',
    artist: 'John Lennon',
    year: 1971,
  },
  {
    text: 'Hey Jude, don\'t make it bad,\nTake a sad song and make it better.',
    artist: 'The Beatles',
    year: 1968,
  },
];
