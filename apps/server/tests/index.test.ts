import { defaultEnv } from '@repo/shared/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import colors from 'colors';

const { listenMock } = vi.hoisted(() => ({
  listenMock: vi.fn((_port: string | number, onListening: () => void) =>
    onListening()
  ),
}));

vi.mock('../src/app.ts', () => ({
  default: { listen: listenMock },
}));

describe('server entry point', () => {
  beforeEach(() => {
    listenMock.mockClear();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('start server on port from PORT', async () => {
    vi.stubEnv('PORT', '4321');
    vi.stubEnv('SHOW_LOG', 'yes');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await import('../src/index.ts');

    expect(listenMock).toHaveBeenCalledWith('4321', expect.any(Function));
    expect(log).toHaveBeenCalledWith(
      colors.blue('Server running on port 4321...')
    );
  });

  it('use default port if PORT is empty', async () => {
    vi.stubEnv('PORT', '');
    vi.stubEnv('SHOW_LOG', 'yes');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await import('../src/index.ts');

    expect(listenMock).toHaveBeenCalledWith(
      defaultEnv.SERVER_PORT,
      expect.any(Function)
    );
    expect(log).toHaveBeenCalledWith(
      colors.blue(`Server running on port ${defaultEnv.SERVER_PORT}...`)
    );
  });
});
