import { defaultEnv } from '@repo/shared/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { listenMock } = vi.hoisted(() => ({
  listenMock: vi.fn((_port: string | number, onListening: () => void) =>
    onListening()
  ),
}));

vi.mock('../app.ts', () => ({
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
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await import('../index.ts');

    expect(listenMock).toHaveBeenCalledWith('4321', expect.any(Function));
    expect(log).toHaveBeenCalledWith('Server running on port 4321...');
  });

  it('use default port if port is empty', async () => {
    vi.stubEnv('PORT', '');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await import('../index.ts');

    expect(listenMock).toHaveBeenCalledWith(
      defaultEnv.SERVER_PORT,
      expect.any(Function)
    );
    expect(log).toHaveBeenCalledWith(
      `Server running on port ${defaultEnv.SERVER_PORT}...`
    );
  });
});
