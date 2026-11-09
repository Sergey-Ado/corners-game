import { describe, expect, it, vi } from 'vitest';
import { HandlerData, TypedServerIo, TypedSocket } from '../../types/types.ts';
import { SocketManager } from '../../socket/socketManager/socketManager.ts';
import { sendLobbyState } from '../../socket/handlers/lobbyHandlers.ts';

const mockEmit = vi.fn();

const io: Partial<TypedServerIo> = {
  to: vi.fn().mockReturnThis(),
  emit: mockEmit,
};

const socket: Partial<TypedSocket> = {
  data: {
    userId: 'userId',
    username: 'username',
  },
};

const handlerData: Partial<HandlerData> = {
  io: io as TypedServerIo,
  socket: socket as TypedSocket,
  socketIdsMap: new Map([['userId', new Set(['socketId'])]]),
  socketManager: new SocketManager(),
};

describe('sendLobbyState', () => {
  it('should return function', () => {
    const resultFunction = sendLobbyState(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should send user status if socketId exists', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'getRoomData')
      .mockImplementation(() => {
        return [{ id: 'room-1', ownerId: 'owner-1', ownerName: 'Owner' }];
      });

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).toHaveBeenCalledWith('lobby:send-state', {
      roomData: [{ id: 'room-1', ownerId: 'owner-1', ownerName: 'Owner' }],
    });

    spy.mockRestore();
  });

  it('should send user status if socketId does not exist', () => {
    const spyMap = vi
      .spyOn(Map.prototype, 'get')
      .mockImplementation(() => null);

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).not.toHaveBeenCalled();
    spyMap.mockRestore();
  });
});
