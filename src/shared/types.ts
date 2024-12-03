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

export type DurationOption = 25 | 45 | 60 | 'custom';
export type IntervalOption = 15 | 30 | 60 | 'custom';
