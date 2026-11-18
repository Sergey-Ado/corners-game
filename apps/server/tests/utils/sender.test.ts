import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getSender from '../../src/utils/sender';
import { HandlerData, TypedServerIo } from '../../src/types/types';

const mockEmit = vi.fn();
const mockIo: Partial<TypedServerIo> = {
  to: vi.fn().mockReturnThis(),
  emit: mockEmit,
};
const handlerData: Partial<HandlerData> = {
  io: mockIo as TypedServerIo,
  socketIdsMap: new Map([['userId-1', new Set(['socketId-1'])]]),
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('sender', () => {
  it('should call io.emit', () => {
    const sender = getSender(handlerData as HandlerData);

    sender(['userId-1'], 'lobby:removed-room', { roomId: 'roomId-1' });

    expect(mockEmit).toHaveBeenCalledWith('lobby:removed-room', {
      roomId: 'roomId-1',
    });
  });

  it('should not call io.emit if socketIdsMap.get return undefined', () => {
    const sender = getSender(handlerData as HandlerData);

    const spy = vi.spyOn(Map.prototype, 'get').mockReturnValue(undefined);

    sender(['userId-1'], 'lobby:removed-room', { roomId: 'roomId-1' });

    expect(mockEmit).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
