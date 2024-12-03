import * as clackPrompts from '@clack/prompts';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

import { getTimerConfig } from '../../cli/configs.js';
import { DEFAULT_CONFIG } from '../../shared/constants.js';

interface TextOptions {
  message: string;
  placeholder?: string;
  validate?: (value: string) => string | void;
}

vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  select: vi.fn(),
  text: vi.fn(),
  confirm: vi.fn(),
  note: vi.fn(),
  isCancel: vi.fn().mockReturnValue(false),
  timer: vi.fn().mockImplementation(async () => ({ start: vi.fn(), stop: vi.fn() })),
}));

vi.useRealTimers();
const originalSetTimeout = global.setTimeout;
global.setTimeout = vi.fn().mockImplementation((fn) => {
  fn();
  return undefined;
}) as unknown as typeof setTimeout;

describe('CLI Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterAll(() => {
    vi.clearAllMocks();
    global.setTimeout = originalSetTimeout;
  });

  it('returns default config when user accepts defaults', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(true);
    
    const config = await getTimerConfig();
    expect(config).toEqual(DEFAULT_CONFIG);
    expect(clackPrompts.note).toHaveBeenCalled();
  });

  it('handles custom duration selection', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select)
      .mockResolvedValueOnce(25)  
      .mockResolvedValueOnce(30); 

    const config = await getTimerConfig();
    expect(config.duration).toBe(25);
    expect(config.lyricInterval).toBe(30);
  });

  it('handles custom duration input', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select)
      .mockResolvedValueOnce('custom')
      .mockResolvedValueOnce(30);
    vi.mocked(clackPrompts.text).mockResolvedValue('40');

    const config = await getTimerConfig();
    expect(config.duration).toBe(40);
  });

  it('handles custom interval input', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select)
      .mockResolvedValueOnce(25)
      .mockResolvedValueOnce('custom');
    vi.mocked(clackPrompts.text).mockResolvedValue('45');

    const config = await getTimerConfig();
    expect(config.lyricInterval).toBe(45);
  });

  it('validates duration input', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select)
      .mockResolvedValueOnce('custom')
      .mockResolvedValueOnce(30);

    const textMock = vi.mocked(clackPrompts.text);
    let validationFunction: ((value: string) => string | void) | undefined;

    textMock.mockImplementationOnce((opts: TextOptions) => {
      validationFunction = opts.validate;
      return Promise.resolve('25');
    });

    await getTimerConfig();

    expect(validationFunction).toBeDefined();
    if (validationFunction) {
      expect(validationFunction('-1')).toBe('Duration must be greater than 0');
      expect(validationFunction('0')).toBe('Duration must be greater than 0');
      expect(validationFunction('181')).toBe('Maximum duration is 180 minutes');
      expect(validationFunction('abc')).toBe('Please enter a valid number');
      expect(validationFunction('25')).toBeUndefined();
    }
  });

  it('validates interval input', async () => {
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select)
      .mockResolvedValueOnce(25)
      .mockResolvedValueOnce('custom');

    const textMock = vi.mocked(clackPrompts.text);
    let validationFunction: ((value: string) => string | void) | undefined;

    textMock.mockImplementationOnce((opts: TextOptions) => {
      validationFunction = opts.validate;
      return Promise.resolve('30');
    });

    await getTimerConfig();

    expect(validationFunction).toBeDefined();
    if (validationFunction) {
      expect(validationFunction('4')).toBe('Minimum interval is 5 seconds');
      expect(validationFunction('301')).toBe('Maximum interval is 300 seconds');
      expect(validationFunction('abc')).toBe('Please enter a valid number');
      expect(validationFunction('30')).toBeUndefined();
    }
  });
 
  it('handles initial confirmation cancellation', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.mocked(clackPrompts.isCancel).mockReturnValue(true);
  
    await getTimerConfig();
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  it('handles duration selection cancellation', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const isCancel = vi.mocked(clackPrompts.isCancel);
    isCancel.mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await getTimerConfig();
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });

  it('handles custom duration input cancellation', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const isCancel = vi.mocked(clackPrompts.isCancel);
  
    vi.mocked(clackPrompts.confirm).mockResolvedValue(false);
    vi.mocked(clackPrompts.select).mockResolvedValue('custom');
    isCancel
      .mockReturnValueOnce(false) 
      .mockReturnValueOnce(false) 
      .mockReturnValueOnce(true); 

    await getTimerConfig();
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });
});
