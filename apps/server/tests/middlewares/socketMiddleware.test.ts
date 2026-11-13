import { describe, expect, it, vi } from 'vitest';
import getSocketMiddleware from '../../src/socket/middlewares/socketMiddleware.ts';
import { Event } from 'socket.io';

const { mockOn } = vi.hoisted(() => ({
  mockOn: vi.fn(),
}));
const mockNext = vi.fn();

vi.mock('../../src/utils/logger.ts', () => ({
  default: (): any => ({
    on: mockOn,
  }),
}));

describe('getSocketMiddleware', () => {
  it('should return function', () => {
    const result = getSocketMiddleware('userId');

    expect(result).toEqual(expect.any(Function));
  });
});

describe('Returned function', () => {
  it('should call logger.on and next', () => {
    const returnFunction = getSocketMiddleware('userId');

    const event = ['event', 'payload'];

    returnFunction(event as Event, mockNext);

    expect(mockOn).toHaveBeenCalledWith('userId', 'event', 'payload');
    expect(mockNext).toHaveBeenCalled();
  });
});
