import { TypedSocket } from '@/types/general.types';
import { RoomData, RoomState } from '@repo/shared/room';
import { describe, expect, it, vi } from 'vitest';

describe('getRouterLoader', () => {
  it('should ask lobby state and return rooms from socket response', async () => {
    const roomData: RoomData[] = [
      { id: 'room-1', owner: { id: 'user-1', username: 'User' }, guest: null },
    ];
    const roomState: RoomState = {
      roomData,
      waitRoom: null,
    };

    let sendState: ((payload: { roomState: RoomState }) => void) | undefined;

    const socket = {
      emit: vi.fn(),
      on: vi.fn(
        (
          event: string,
          handler: (payload: { roomState: RoomState }) => void
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

    sendState({ roomState });

    await expect(resultPromise).resolves.toEqual({ roomState, socket });
  });
});
