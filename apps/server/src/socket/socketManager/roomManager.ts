import { RoomData } from '@repo/shared/room';
import { Player } from '@repo/shared/user';
import { v4 as uuid } from 'uuid';

export default class RoomManager {
  private rooms: RoomData[] = [];

  public setRooms(mockRooms: RoomData[]): void {
    this.rooms = mockRooms.map(mockRoom => {
      const { id, owner } = mockRoom;

      const room = { id, owner, guest: null };
      return room;
    });
  }

  public getRoomData(): RoomData[] {
    return this.rooms;
  }

  public removeRoomById(id: string): boolean {
    if (this.rooms.every(room => room.id !== id)) return false;

    this.rooms = this.rooms.filter(room => room.id !== id);
    return true;
  }

  public hasRoom(userId: string): boolean {
    return Boolean(this.rooms.some(room => room.owner.id === userId));
  }

  public addRoom(userId: string, username: string): RoomData {
    const room = {
      id: uuid(),
      owner: {
        id: userId,
        username,
      },
      guest: null,
    };

    this.rooms.push(room);

    return room;
  }

  public addGuest(roomId: string, guest: Player): RoomData | undefined {
    const room = this.rooms.find(room => room.id === roomId);

    if (!room || room.guest) return;

    room.guest = guest;

    return room;
  }

  public cancelJoining(userId: string): RoomData | undefined {
    const room = this.rooms.find(
      room =>
        (room.owner.id === userId && room.guest !== null) ||
        room.guest?.id === userId
    );
    if (!room) return;

    const roomOld = { ...room };

    room.guest = null;

    return roomOld;
  }

  public getRoomByPlayerId(userId: string): RoomData | null {
    const room = this.rooms.find(
      room =>
        (room.owner.id === userId && room.guest) ||
        (room.guest && room.guest.id === userId)
    );

    return room || null;
  }
}
