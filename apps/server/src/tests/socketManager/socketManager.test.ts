import { describe, expect, it } from 'vitest';
import { SocketManager } from '../../socket/socketManager/socketManager.ts';
import { RoomData } from '@repo/shared/room';
import { UserStatus } from '@repo/shared/socketEvents';

const mockRoomData: RoomData[] = [
  {
    id: 'room-1',
    ownerId: 'userId-1',
    ownerName: 'User-1',
  },
  {
    id: 'room-2',
    ownerId: 'userId-2',
    ownerName: 'User-2',
  },
];

describe('socketManager', () => {
  it('should set and return roomData', () => {
    const socketManager = new SocketManager();

    socketManager.setRooms(mockRoomData);

    const roomData = socketManager.getRoomData();

    expect(roomData).toEqual(mockRoomData);
  });

  it('should return user status using getUserStatus method', () => {
    const socketManager = new SocketManager();

    const status = socketManager.getUserStatus();

    expect(status).toBe(UserStatus.IN_LOBBY);
  });
});
