import { TypedSocket } from '@/types/general.types';
import { RoomData } from '@repo/shared/room';
import { describe, expect, it, vi } from 'vitest';

describe('getRouterLoader', () => {
  it('should ask lobby state and return rooms from socket response', async () => {
    const roomData: RoomData[] = [
      { id: 'room-1', ownerId: 'owner-1', ownerName: 'Owner' },
    ];

    let sendState: ((payload: { roomData: RoomData[] }) => void) | undefined;

    const socket = {
      emit: vi.fn(),
      on: vi.fn(
        (
          event: string,
          handler: (payload: { roomData: RoomData[] }) => void
        ) => {
          if (event === 'lobby:send-state') {
            sendState = handler;
          }
        }
      ),
    } as unknown as TypedSocket;

    const { default: getRouterLoader } = await import('./routerLoaders');
    const { lobbyLoader } = getRouterLoader(socket);

    const resultPromise = lobbyLoader();

    expect(socket.emit).toHaveBeenCalledWith('lobby:ask-state');
    expect(socket.on).toHaveBeenCalledWith(
      'lobby:send-state',
      expect.any(Function)
    );

    if (!sendState) {
      throw new Error('Handler of lobby:send-state is not registered');
    }

    sendState({ roomData });

    await expect(resultPromise).resolves.toEqual({ roomData });
  });
});
