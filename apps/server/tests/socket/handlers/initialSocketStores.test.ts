import { describe, expect, it } from 'vitest';
import initialSocketStores from '../../../src/socket/handlers/initialSocketStores.ts';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';

describe('initialSocketStore', () => {
  it('should return object with socketIdsMap and socketManager', () => {
    const { socketIdsMap, socketManager } = initialSocketStores();

    expect(socketIdsMap).toBeInstanceOf(Map);
    expect(socketManager).toBeInstanceOf(SocketManager);
  });

  it('should use singleton class', () => {
    const { socketIdsMap, socketManager } = initialSocketStores();
    const { socketIdsMap: newSocketIdsMap, socketManager: newSocketManager } =
      initialSocketStores();

    expect(socketIdsMap === newSocketIdsMap).toBeTruthy();
    expect(socketManager === newSocketManager).toBeTruthy();
  });
});
