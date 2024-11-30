import { describe, it, expect, vi } from 'vitest';

import { formatTime, getRandomLyric, rightAlign } from '../../core/utils.js';

import type { Lyric } from '../../core/types.js';

vi.mock('node:readline', () => ({
  cursorTo: vi.fn(),
}));

describe('formatTime', () => {
  it('formats seconds to MM:SS correctly', () => {
    const testCases: [number, string][] = [
      [0, '00:00'],
      [59, '00:59'],
      [60, '01:00'],
      [3599, '59:59'],
      [3600, '60:00'],
    ];

    testCases.forEach(([input, expected]) => {
      expect(formatTime(input)).toBe(expected);
    });
  });
});

describe('getRandomLyric', () => {
  const sampleLyrics: Lyric[] = [
    { text: 'Lyric 1', artist: 'Artist 1', year: 2020 },
    { text: 'Lyric 2', artist: 'Artist 2', year: 2021 },
    { text: 'Lyric 3', artist: 'Artist 3', year: 2022 },
  ];

  it('returns a lyric from the array', () => {
    const result = getRandomLyric(sampleLyrics);
    expect(sampleLyrics).toContainEqual(result);
  });

  it('handles single lyric case', () => {
    const singleLyric = [sampleLyrics[0]];
    const result = getRandomLyric(singleLyric);
    expect(result).toEqual(singleLyric[0]);
  });

  it('attempts to return different lyric when current is provided', () => {
    const currentLyric = sampleLyrics[0];
    const attempts = new Set();
    
    for (let i = 0; i < 10; i++) {
      const result = getRandomLyric(sampleLyrics, currentLyric);
      attempts.add(result);
    }
    
    expect(attempts.size).toBeGreaterThan(1);
  });
});

describe('rightAlign', () => {
  it('aligns single line text', () => {
    const result = rightAlign('test', 40);
    expect(result.length).toBe(40);
    expect(result.endsWith(`test${  ' '.repeat(30)}`)).toBe(true);
  });

  it('handles multiline text', () => {
    const result = rightAlign('line1\nline2', 40);
    const lines = result.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0].endsWith(`line1${  ' '.repeat(30)}`)).toBe(true);
    expect(lines[1].endsWith(`line2${  ' '.repeat(30)}`)).toBe(true);
  });

  it('handles custom padding', () => {
    const result = rightAlign('test', 40, 10);
    expect(result.length).toBe(40);
    expect(result.endsWith(`test${  ' '.repeat(10)}`)).toBe(true);
  });
});

describe('clearScreen', () => {
  it('clears screen and resets cursor', async () => {
    const { clearScreen } = await import('../../core/utils.js');
    const consoleSpy = vi.spyOn(console, 'clear').mockImplementation(() => {});
    
    clearScreen();
    
    expect(consoleSpy).toHaveBeenCalled();
  });
});
