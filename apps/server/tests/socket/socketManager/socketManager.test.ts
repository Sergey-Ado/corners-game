import { describe, expect, it } from 'vitest';
import { SocketManager } from '../../../src/socket/socketManager/socketManager.ts';
import { RoomData, RoomState } from '@repo/shared/room';
import { UserStatus } from '@repo/shared/socketEvents';

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
});
