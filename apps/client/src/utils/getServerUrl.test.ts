import { afterEach, describe, expect, it, vi } from 'vitest';
import { getServerUrl } from './getServerUrl';
import { defaultEnv } from '@repo/shared/api';

describe('getServerUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return VITE_SERVER_URL', () => {
    vi.stubEnv('VITE_SERVER_URL', 'server_url');

    const url = getServerUrl();

    expect(url).toBe('server_url');
  });

  it('should return default server url if VITE_SERVER_URL is undefined', () => {
    vi.stubEnv('VITE_SERVER_URL', undefined);

    const url = getServerUrl();

    expect(url).toBe(defaultEnv.SERVER_URL);
  });
});
