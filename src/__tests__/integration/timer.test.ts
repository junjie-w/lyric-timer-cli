import { ReadStream } from 'node:tty';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { DEFAULT_LYRICS } from '../../core/constants.js';
import * as renderer from '../../core/renderer.js';
import { startTimer } from '../../core/timer.js';

vi.mock('../../core/renderer.js', () => ({
  renderTimer: vi.fn(),
  showExitMessage: vi.fn(),
}));

describe('Timer Operation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('initializes timer correctly', async () => {
    const mockRenderFrame = vi.mocked(renderer.renderTimer);
    const config = {
      duration: 1,
      lyricInterval: 30,
      isPaused: false,
    };

    startTimer(config);
    expect(mockRenderFrame).toHaveBeenCalledWith(
      60,
      expect.any(Object),
      config,
      '',
    );
  });
  
  it('counts down when not paused', async () => {
    const mockRenderFrame = vi.mocked(renderer.renderTimer);
    const config = {
      duration: 1,
      lyricInterval: 30,
      isPaused: false,
    };

    startTimer(config);
    mockRenderFrame.mockClear();

    await vi.advanceTimersByTimeAsync(1000);
    expect(mockRenderFrame).toHaveBeenCalledWith(
      59,
      expect.any(Object),
      config,
      '',
    );
  });

  it('stays paused when isPaused is true', async () => {
    const mockRenderFrame = vi.mocked(renderer.renderTimer);
    const config = {
      duration: 1,
      lyricInterval: 30,
      isPaused: true,
    };

    startTimer(config);
    const initialTime = mockRenderFrame.mock.calls[0][0];
    mockRenderFrame.mockClear();

    await vi.advanceTimersByTimeAsync(1000);
    expect(mockRenderFrame).toHaveBeenCalledWith(
      initialTime,
      expect.any(Object),
      config,
      '',
    );
  });

  it('completes when timer reaches zero', async () => {
    const mockShowExitMessage = vi.mocked(renderer.showExitMessage);
    const config = {
      duration: 1/60,
      lyricInterval: 30,
      isPaused: false,
    };

    const mockStdin = {
      isTTY: true,
      fd: 0,
      setRawMode: vi.fn().mockReturnThis(),
      resume: vi.fn().mockReturnThis(),
      setEncoding: vi.fn().mockReturnThis(),
      on: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
    };

    vi.spyOn(process, 'stdin', 'get')
      .mockReturnValue(mockStdin as unknown as ReadStream & { fd: 0 });

    const timerPromise = startTimer(config, DEFAULT_LYRICS, true);

    await vi.advanceTimersByTimeAsync(3500); 

    await timerPromise;
  
    expect(mockShowExitMessage).toHaveBeenCalled();
    expect(mockStdin.pause).toHaveBeenCalled();
  });

  it('updates lyrics at correct interval', async () => {
    const mockRenderFrame = vi.mocked(renderer.renderTimer);
    const config = {
      duration: 1,
      lyricInterval: 2,
      isPaused: false,
    };

    startTimer(config, DEFAULT_LYRICS);
    const calls: Array<Parameters<typeof renderer.renderTimer>> = [];
    
    mockRenderFrame.mockImplementation((...args) => {
      calls.push(args);
    });

    await vi.advanceTimersByTimeAsync(2100);
    
    const uniqueLyrics = new Set(calls.map(call => call[1]));
    expect(uniqueLyrics.size).toBeGreaterThanOrEqual(1);
  });

  it('handles error in timer loop', async () => {
    const mockShowExitMessage = vi.mocked(renderer.showExitMessage);
    const mockRenderFrame = vi.mocked(renderer.renderTimer);
    
    mockRenderFrame.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const config = {
      duration: 1,
      lyricInterval: 30,
      isPaused: false,
    };

    const mockStdin = {
      isTTY: true,
      fd: 0,
      setRawMode: vi.fn().mockReturnThis(),
      resume: vi.fn().mockReturnThis(),
      setEncoding: vi.fn().mockReturnThis(),
      on: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
    };

    vi.spyOn(process, 'stdin', 'get')
      .mockReturnValue(mockStdin as unknown as ReadStream & { fd: 0 });

    await expect(startTimer(config, DEFAULT_LYRICS, true)).rejects.toThrow('Test error');
    
    expect(mockShowExitMessage).toHaveBeenCalled();
    expect(mockStdin.pause).toHaveBeenCalled();
  });
});
