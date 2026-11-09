import { describe, expect, it, vi } from 'vitest';
import { sendStatus } from '../../socket/handlers/sessionHandlers.ts';
import { HandlerData, TypedServerIo, TypedSocket } from '../../types/types.ts';
import { SocketManager } from '../../socket/socketManager/socketManager.ts';

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

describe('sendStatus', () => {
  it('should return function', () => {
    const resultFunction = sendStatus(handlerData as HandlerData);

    expect(resultFunction).toEqual(expect.any(Function));
  });

  it('should send user status if socketId exists', () => {
    const resultFunction = sendStatus(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).toHaveBeenCalledWith('session:send-status', {
      userId: 'userId',
      username: 'username',
      status: 'in-lobby',
    });
  });

  it('should send user status if socketId does not exist', () => {
    const spyMap = vi
      .spyOn(Map.prototype, 'get')
      .mockImplementation(() => null);

    const resultFunction = sendStatus(handlerData as HandlerData);

    resultFunction();

    expect(mockEmit).not.toHaveBeenCalled();
    spyMap.mockRestore();
  });
});
