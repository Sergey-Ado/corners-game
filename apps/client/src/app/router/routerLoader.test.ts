import { describe, expect, it } from 'vitest';

describe('getRouterLoader', () => {
  it('should return roomLoader', async () => {
    const getRouterLoader = await import('./routerLoader');
    const { roomLoader } = getRouterLoader.default();
    const res = await roomLoader();

    expect(res).toHaveProperty('roomData');
    expect(Array.isArray(res.roomData)).toBeTruthy();
  });
});
