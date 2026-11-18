import { describe, expect, it } from 'vitest';
import RoomManager from '../../../src/socket/socketManager/roomManager';

describe('roomManager', () => {
  it('should set rooms using setRooms method', () => {
    const roomManager = new RoomManager();
    const rooms = [
      {
        id: 'room-1',
        owner: {
          id: 'user-1',
          username: 'username',
        },
      },
    ];

    roomManager.setRooms(rooms);

    expect(roomManager['rooms']).toEqual(rooms);
  });

  it('should return rooms using getRoomData method', () => {
    const roomManager = new RoomManager();
    const rooms = [
      {
        id: 'room-1',
        owner: {
          id: 'user-1',
          username: 'username',
        },
      },
    ];
    roomManager['rooms'] = rooms;

    const roomData = roomManager.getRoomData();

    expect(roomData).toEqual(rooms);
  });

  it('should remove room by id using removeRoomById method', () => {
    const roomManager = new RoomManager();
    const rooms = [
      {
        id: 'room-1',
        owner: {
          id: 'user-1',
          username: 'username',
        },
      },
    ];
    roomManager['rooms'] = rooms;

    const result = roomManager.removeRoomById('room-1');

    expect(roomManager['rooms']).toEqual([]);
    expect(result).toBeTruthy();
  });

  it('should not remove room by id if room is not exist', () => {
    const roomManager = new RoomManager();

    const result = roomManager.removeRoomById('room-1');

    expect(result).toBeFalsy();
  });

  it('should return true using hasRoom method if room is exist', () => {
    const roomManager = new RoomManager();
    const rooms = [
      {
        id: 'room-1',
        owner: {
          id: 'user-1',
          username: 'username',
        },
      },
    ];
    roomManager['rooms'] = rooms;

    const result = roomManager.hasRoom('user-1');

    expect(result).toBeTruthy();
  });

  it('should return false using hasRoom method if room is not exists', () => {
    const roomManager = new RoomManager();

    const result = roomManager.hasRoom('user-1');

    expect(result).toBeFalsy();
  });

  it('should add and return new room using addRoom method', () => {
    const roomManager = new RoomManager();
    const player = { id: 'user-1', username: 'username' };

    const result = roomManager.addRoom(player.id, player.username);

    expect(roomManager['rooms']).toEqual([
      { id: expect.any(String), owner: player },
    ]);
    expect(result).toEqual({ id: expect.any(String), owner: player });
  });
});
