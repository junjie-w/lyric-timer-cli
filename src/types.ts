export interface Lyric {
  text: string;
  artist: string;
  year: number;
}

export interface TimerConfig {
  duration: number;
  lyricInterval: number;
  isPaused: boolean;
}

export class TimerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimerError';
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
