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
        guest: null,
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
        guest: null,
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
        guest: null,
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
        guest: null,
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
      { id: expect.any(String), owner: player, guest: null },
    ]);
    expect(result).toEqual({
      id: expect.any(String),
      owner: player,
      guest: null,
    });
  });

  it('should add guest to room using addGuest method', () => {
    const roomManager = new RoomManager();
    const room = {
      id: 'room-1',
      owner: {
        id: 'user-1',
        username: 'username-1',
      },
      guest: null,
    };
    roomManager['rooms'] = [room];

    const guest = { id: 'user-2', username: 'username-2' };

    const result = roomManager.addGuest('room-1', guest);

    expect(result).toEqual({ ...room, guest });
  });

  it('should return undefined using addGuest method if room is not exist', () => {
    const roomManager = new RoomManager();
    const guest = { id: 'userId', username: 'username' };

    const result = roomManager.addGuest('roomId', guest);

    expect(result).toBeUndefined();
  });

  it('should remove guest using cancelJoining method if initiator is owner', () => {
    const roomManager = new RoomManager();
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };
    const oldRoom = { ...room };

    roomManager['rooms'] = [room];

    const result = roomManager.cancelJoining('user-1');

    expect(result).toEqual(oldRoom);
    expect(roomManager['rooms']).toEqual([{ ...room, guest: null }]);
  });

  it('should remove guest using cancelJoining method if initiator is guest', () => {
    const roomManager = new RoomManager();
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };
    const oldRoom = { ...room };

    roomManager['rooms'] = [room];

    const result = roomManager.cancelJoining('user-2');

    expect(result).toEqual(oldRoom);
    expect(roomManager['rooms']).toEqual([{ ...room, guest: null }]);
  });

  it('should return undefined using cancelJoining method if room is not exist', () => {
    const roomManager = new RoomManager();

    const result = roomManager.cancelJoining('user-1');

    expect(result).toBeUndefined();
  });

  it('should return room using getInaccessibleRoomByPlayerId if player is guest', () => {
    const roomManager = new RoomManager();
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: { id: 'user-2', username: 'username-2' },
    };

    roomManager['rooms'] = [room];

    const result = roomManager.getInaccessibleRoomByPlayerId('user-2');

    expect(result).toEqual(room);
  });

  it('should return null using getInaccessibleRoomByPlayerId method if guest is not exist', () => {
    const roomManager = new RoomManager();
    const room = {
      id: 'roomId',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };

    roomManager['rooms'] = [room];

    const result = roomManager.getInaccessibleRoomByPlayerId('user-1');

    expect(result).toBeNull();
  });
});
