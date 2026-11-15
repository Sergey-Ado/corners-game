import { describe, expect, it } from 'vitest';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import { RoomData } from '@repo/shared/room';
import { UserStatus } from '@repo/shared/socketEvents';

const mockRoomData: RoomData[] = [
  {
    id: 'room-1',
    owner: {
      id: 'userId-1',
      username: 'User-1',
    },
  },
  {
    id: 'room-2',
    owner: {
      id: 'userId-2',
      username: 'User-2',
    },
  },
];
const players = mockRoomData.map(room => room.owner);

describe('socketManager', () => {
  it('should set and return roomData', () => {
    const socketManager = new SocketManager();

    socketManager.initial(mockRoomData);

    const roomData = socketManager.getRoomData();

    expect(roomData).toEqual(mockRoomData);
  });

  it('should return user status using getUserStatus method', () => {
    const socketManager = new SocketManager();

    const status = socketManager.getUserStatus();

    expect(status).toBe(UserStatus.IN_LOBBY);
  });

  it('should add rooms and players to lobby using initial method', () => {
    const socketManager = new SocketManager();

    socketManager.initial(mockRoomData);

    expect(socketManager['roomManager']['rooms']).toEqual(mockRoomData);
    expect(socketManager['lobbyManager']['players']).toEqual(players);
  });

  it('should remove room and return ids of players in lobby', () => {
    const socketManager = new SocketManager();
    socketManager.initial(mockRoomData);

    const result = socketManager.removeRoom('room-1');

    expect(socketManager['roomManager']['rooms']).toEqual([mockRoomData[1]]);
    expect(result).toEqual({ lobbyPlayerIds: ['userId-1', 'userId-2'] });
  });

  it('should return undefined if room is not exits', () => {
    const socketManager = new SocketManager();

    const result = socketManager.removeRoom('room-1');

    expect(result).toBeUndefined();
  });
});
