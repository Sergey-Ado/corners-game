import { describe, expect, it, vi } from 'vitest';
import {
  HandlerData,
  TypedServerIo,
  TypedSocket,
} from '../../../src/types/types.ts';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import {
  removeRoom,
  sendLobbyState,
} from '../../../src/socket/handlers/lobbyHandlers.ts';

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
    const rooms = [
      { id: 'room-1', owner: { id: 'owner-1', username: 'Owner' } },
    ];

    const spy = vi
      .spyOn(SocketManager.prototype, 'getRoomData')
      .mockImplementation(() => {
        return rooms;
      });

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).toHaveBeenCalledWith('lobby:send-state', {
      roomData: rooms,
    });

    spy.mockRestore();
  });

  it('should not send user status if socketId does not exist', () => {
    const spyMap = vi
      .spyOn(Map.prototype, 'get')
      .mockImplementation(() => null);

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).not.toHaveBeenCalled();
    spyMap.mockRestore();
  });
});

describe('removeRoom', () => {
  it('should return function', () => {
    const resultFunction = removeRoom(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should send roomId if socketId exists', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'removeRoom')
      .mockImplementation(() => {
        return { lobbyPlayerIds: ['userId'] };
      });

    const resultFunction = removeRoom(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockEmit).toHaveBeenCalledWith('lobby:removed-room', {
      roomId: 'room-1',
    });

    spy.mockRestore();
  });

  it('should not send roomId if socketId does not exist', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'removeRoom')
      .mockImplementation(() => {
        return { lobbyPlayerIds: ['userId'] };
      });

    const spyMap = vi
      .spyOn(Map.prototype, 'get')
      .mockImplementation(() => null);

    const resultFunction = removeRoom(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockEmit).not.toHaveBeenCalled();

    spy.mockRestore();
    spyMap.mockRestore();
  });

  it('should send roomId if socketId does not exist', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'removeRoom')
      .mockImplementation(() => {});

    const resultFunction = removeRoom(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockEmit).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
