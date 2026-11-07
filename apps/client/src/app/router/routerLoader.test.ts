import { describe, expect, it } from 'vitest';

describe('getRouterLoader', () => {
  it('should return roomLoader', async () => {
    const getRouterLoader = await import('./routerLoader');
    const { roomLoader } = getRouterLoader.default();
    const res = await roomLoader();

    expect(Array.isArray(res)).toBeTruthy();
  });
});
