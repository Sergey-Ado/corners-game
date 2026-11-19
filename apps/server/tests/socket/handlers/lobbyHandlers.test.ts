import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HandlerData, TypedSocket } from '../../../src/types/types.ts';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import {
  createRoom,
  removeRoom,
  sendLobbyState,
} from '../../../src/socket/handlers/lobbyHandlers.ts';

const mockSender = vi.fn();

const socket: Partial<TypedSocket> = {
  data: {
    userId: 'userId',
    username: 'username',
  },
};

vi.mock('../../../src/utils/sender.ts', () => ({
  default: (): any => mockSender,
}));

const handlerData: Partial<HandlerData> = {
  socket: socket as TypedSocket,
  socketManager: new SocketManager(),
};

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('sendLobbyState', () => {
  it('should return function', () => {
    const resultFunction = sendLobbyState(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should call sender with roomData', () => {
    const rooms = [
      {
        id: 'room-1',
        owner: { id: 'owner-1', username: 'Owner' },
        guest: null,
      },
    ];

    const spy = vi
      .spyOn(SocketManager.prototype, 'getRoomData')
      .mockImplementation(() => {
        return rooms;
      });

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).toHaveBeenCalledWith(['userId'], 'lobby:send-state', {
      roomData: rooms,
    });

    spy.mockRestore();
  });
});

describe('removeRoom', () => {
  it('should return function', () => {
    const resultFunction = removeRoom(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should call sender if socketManager.remove return lobbyPlayerIds', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'removeRoom')
      .mockImplementation(() => {
        return { lobbyPlayerIds: ['userId'] };
      });

    const resultFunction = removeRoom(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockSender).toHaveBeenCalledWith(['userId'], 'lobby:removed-room', {
      roomId: 'room-1',
    });

    spy.mockRestore();
  });

  it('should not call sender if socketManager.remove return undefined', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'removeRoom')
      .mockImplementation(() => {});

    const resultFunction = removeRoom(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockSender).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('createRoom', () => {
  it('should return function', () => {
    const resultFunction = createRoom(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should call sender if room is created', () => {
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };

    const spy = vi
      .spyOn(SocketManager.prototype, 'createRoom')
      .mockImplementation(() => {
        return {
          room,
          lobbyPlayerIds: ['userId'],
        };
      });

    const resultFunction = createRoom(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).toHaveBeenCalledWith(['userId'], 'lobby:created-room', {
      room,
    });

    spy.mockRestore();
  });

  it('should not call sender if room is not created', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'createRoom')
      .mockImplementation(() => {});

    const resultFunction = createRoom(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
