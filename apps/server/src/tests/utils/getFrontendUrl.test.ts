import { afterEach, describe, expect, it, vi } from 'vitest';
import getFrontendUrl from '../../utils/getFrontendUrl.ts';
import { defaultEnv } from '@repo/shared/api';

describe('getFrontendUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return FRONTEND_URL', () => {
    vi.stubEnv('FRONTEND_URL', 'frontend_url');

    const url = getFrontendUrl();

    expect(url).toBe('frontend_url');
  });

  it('should return default frontend url if FRONTEND_URL is undefined', () => {
    vi.stubEnv('FRONTEND_URL', undefined);

    const url = getFrontendUrl();

    expect(url).toBe(defaultEnv.FRONTEND_URL);
  });
});
