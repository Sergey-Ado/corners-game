import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HandlerData, TypedSocket } from '../../../src/types/types.ts';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import {
  cancelJoining,
  createRoom,
  okJoining,
  removeRoom,
  sendLobbyState,
  waitJoining,
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
      .spyOn(SocketManager.prototype, 'getRoomState')
      .mockImplementation(() => {
        return { roomData: rooms, waitRoom: null };
      });

    const resultFunction = sendLobbyState(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).toHaveBeenCalledWith(['userId'], 'lobby:send-state', {
      roomState: {
        roomData: rooms,
        waitRoom: null,
      },
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

describe('waitJoining', () => {
  it('should return function', () => {
    const resultFunction = waitJoining(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should call sender if waiting of joining is started', () => {
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };

    const guest = { id: 'userId', username: 'username' };

    const spy = vi
      .spyOn(SocketManager.prototype, 'waitJoining')
      .mockImplementation(() => {
        return {
          room: { ...room, guest },
          lobbyPlayerIds: ['userId', 'user-1'],
        };
      });

    const resultFunction = waitJoining(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockSender).toHaveBeenCalledWith(
      ['userId', 'user-1'],
      'lobby:wait-joining',
      {
        room: { ...room, guest },
      }
    );

    spy.mockRestore();
  });

  it('should not call sender if waiting of joining is not started', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'waitJoining')
      .mockImplementation(() => {});

    const resultFunction = waitJoining(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockSender).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should not call sender if guest is not defined', () => {
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };

    const spy = vi
      .spyOn(SocketManager.prototype, 'waitJoining')
      .mockImplementation(() => {
        return {
          room,
          lobbyPlayerIds: ['userId', 'user-1'],
        };
      });

    const resultFunction = waitJoining(handlerData as HandlerData);

    resultFunction({ roomId: 'room-1' });

    expect(mockSender).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('cancelJoining', () => {
  it('should return function', () => {
    const resultFunction = cancelJoining(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should call sender if canceling of joining is started', () => {
    const guest = { id: 'userId', username: 'username' };
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest,
    };

    const spy = vi
      .spyOn(SocketManager.prototype, 'cancelJoining')
      .mockImplementation(() => {
        return {
          room,
          lobbyPlayerIds: ['userId', 'user-1'],
        };
      });

    const resultFunction = cancelJoining(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).toHaveBeenCalledWith(
      ['userId', 'user-1'],
      'lobby:canceled-joining',
      {
        room,
        initiator: guest,
      }
    );

    spy.mockRestore();
  });

  it('should not call sender if canceling of joining is not started', () => {
    const spy = vi
      .spyOn(SocketManager.prototype, 'cancelJoining')
      .mockImplementation(() => {});

    const resultFunction = cancelJoining(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('okJoining', () => {
  it('should return function', () => {
    const result = okJoining(handlerData as HandlerData);

    expect(result).toEqual(expect.any(Function));
  });

  it('should call sender if joining is ok', () => {
    const spyOk = vi
      .spyOn(SocketManager.prototype, 'okJoining')
      .mockImplementation(() => ({
        roomIds: ['room-1'],
        gamePlayerIds: ['user-1', 'user-2'],
        lobbyPlayerIds: ['user-3'],
      }));

    const resultFunction = okJoining(handlerData as HandlerData);

    resultFunction();

    expect(mockSender).toHaveBeenCalledTimes(2);

    spyOk.mockRestore();
  });

  it('should return undefined if response of socket.manager is undefined', () => {
    const resultFunction = okJoining(handlerData as HandlerData);

    const result = resultFunction();

    expect(result).toBeUndefined();
  });
});
