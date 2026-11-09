import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TypedServerIo, TypedSocket } from '../../types/types.ts';
import initialConnected from '../../socket/handlers/initialConnected.ts';
import { SocketManager } from '../../socket/socketManager/socketManager.ts';

const mockIo: Partial<TypedServerIo> = {};
const mockOn = vi.fn();
const mockSocketManager: Partial<SocketManager> = {};

const socket: Partial<TypedSocket> = {
  id: 'socketId1',
  on: mockOn,
  data: { userId: 'userId', username: 'username' },
};

vi.mock('../../socket/handlers/initialSocketStores.ts', () => ({
  default: (): any => ({
    socketIdsMap: new Map([['userId', new Set(['socketId0'])]]),
    socketManager: mockSocketManager,
  }),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('initialConnected', () => {
  it('should return function', () => {
    const returnFunction = initialConnected(mockIo as TypedServerIo);

    expect(returnFunction).toEqual(expect.any(Function));
  });

  it('should call Set.add if socketIds already exist', () => {
    const returnFunction = initialConnected(mockIo as TypedServerIo);

    const mockSet = new Set(['socketId1']);
    const spyGet = vi
      .spyOn(Map.prototype, 'get')
      .mockImplementation(() => mockSet);
    const spyAdd = vi.spyOn(Set.prototype, 'add');
    const spySet = vi.spyOn(Map.prototype, 'set');

    returnFunction(socket as TypedSocket);

    expect(spyAdd).toHaveBeenCalledWith('socketId1');
    expect(spySet).toHaveBeenCalledWith('userId', mockSet);

    spyGet.mockRestore();
    spyAdd.mockRestore();
    spySet.mockRestore();
  });

  it('should create new socketIds if socketIds in not exist', () => {
    const returnFunction = initialConnected(mockIo as TypedServerIo);

    const spyGet = vi.spyOn(Map.prototype, 'get').mockReturnValue(undefined);
    const spySet = vi.spyOn(Map.prototype, 'set');

    returnFunction(socket as TypedSocket);

    expect(spySet).toHaveBeenCalledWith('userId', new Set(['socketId1']));

    spyGet.mockRestore();
    spySet.mockRestore();
  });

  it('should set handlers', () => {
    const returnFunction = initialConnected(mockIo as TypedServerIo);

    returnFunction(socket as TypedSocket);

    expect(mockOn).toHaveBeenCalledWith(
      'session:ask-status',
      expect.any(Function)
    );

    expect(mockOn).toHaveBeenCalledWith(
      'lobby:ask-state',
      expect.any(Function)
    );
  });
});
