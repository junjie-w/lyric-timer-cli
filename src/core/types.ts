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
