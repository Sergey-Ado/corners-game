import { describe, expect, it, vi } from 'vitest';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import { RoomData, RoomState } from '@repo/shared/room';
import { UserStatus } from '@repo/shared/socketEvents';
import RoomManager from '../../../src/socket/socketManager/roomManager.ts';

const mockRoomData: RoomData[] = [
  {
    id: 'room-1',
    owner: {
      id: 'userId-1',
      username: 'User-1',
    },
    guest: null,
  },
  {
    id: 'room-2',
    owner: {
      id: 'userId-2',
      username: 'User-2',
    },
    guest: null,
  },
];
const players = mockRoomData.map(room => room.owner);

const mockRoomState: RoomState = {
  roomData: mockRoomData,
  waitRoom: null,
};

describe('socketManager', () => {
  it('should set and return roomData', () => {
    const socketManager = new SocketManager();

    socketManager.initial(mockRoomData);

    const roomState = socketManager.getRoomState('room-1');

    expect(roomState).toEqual(mockRoomState);
  });

  it('should return user status using getUserStatus method', () => {
    const socketManager = new SocketManager();

    const status = socketManager.getUserStatus({
      id: 'userId-1',
      username: 'User-1',
    });

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

  it('should create room and return new room and ids of players in lobby using createRoom method', () => {
    const socketManager = new SocketManager();

    socketManager['lobbyManager']['players'] = [
      { id: 'user-1', username: 'username-1' },
      { id: 'user-2', username: 'username-2' },
    ];

    const result = socketManager.createRoom({
      id: 'user-1',
      username: 'username-1',
    });

    expect(result).toEqual({
      room: {
        id: expect.any(String),
        owner: {
          id: 'user-1',
          username: 'username-1',
        },
        guest: null,
      },
      lobbyPlayerIds: ['user-1', 'user-2'],
    });
  });

  it('should return undefined if player is not in lobby using createRoom method', () => {
    const socketManager = new SocketManager();

    const result = socketManager.createRoom({
      id: 'user-1',
      username: 'username-1',
    });

    expect(result).toBeUndefined();
  });

  it('should return undefined if player has room using createRoom method', () => {
    const socketManager = new SocketManager();

    socketManager['lobbyManager']['players'] = [
      { id: 'user-1', username: 'username-1' },
      { id: 'user-2', username: 'username-2' },
    ];
    socketManager['roomManager']['rooms'] = [
      {
        id: 'room-1',
        owner: { id: 'user-1', username: 'username-1' },
        guest: null,
      },
    ];

    const result = socketManager.createRoom({
      id: 'user-1',
      username: 'username-1',
    });

    expect(result).toBeUndefined();
  });

  it('should return room with guest using waitJoining method', () => {
    const socketManager = new SocketManager();

    socketManager['lobbyManager']['players'] = [
      { id: 'user-1', username: 'username-1' },
      { id: 'user-2', username: 'username-2' },
    ];
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest: null,
    };
    socketManager['roomManager']['rooms'] = [room];
    const guest = { id: 'user-2', username: 'username-2' };

    const result = socketManager.waitJoining('room-1', guest);

    expect(result).toEqual({
      room: { ...room, guest },
      lobbyPlayerIds: ['user-1', 'user-2'],
    });
  });

  it('should return undefined using waitJoining method if guest is not add to room', () => {
    const socketManager = new SocketManager();

    const guest = { id: 'user-2', username: 'username-2' };

    const spy = vi
      .spyOn(RoomManager.prototype, 'addGuest')
      .mockImplementation(() => undefined);

    const result = socketManager.waitJoining('room-1', guest);

    expect(result).toBeUndefined();

    spy.mockRestore();
  });

  it('should return room using cancelJoining method', () => {
    const socketManager = new SocketManager();

    socketManager['lobbyManager']['players'] = [
      { id: 'user-1', username: 'username-1' },
      { id: 'user-2', username: 'username-2' },
    ];
    const guest = { id: 'user-2', username: 'username-2' };
    const room = {
      id: 'room-1',
      owner: { id: 'user-1', username: 'username-1' },
      guest,
    };
    const oldRoom = { ...room };
    socketManager['roomManager']['rooms'] = [room];

    const result = socketManager.cancelJoining('user-1');

    expect(result).toEqual({
      room: oldRoom,
      lobbyPlayerIds: ['user-1', 'user-2'],
    });
  });

  it('should return undefined using cancelJoining method if guest is not remove from room', () => {
    const socketManager = new SocketManager();

    const spy = vi
      .spyOn(RoomManager.prototype, 'cancelJoining')
      .mockImplementation(() => undefined);

    const result = socketManager.cancelJoining('user-1');

    expect(result).toBeUndefined();

    spy.mockRestore();
  });
});
