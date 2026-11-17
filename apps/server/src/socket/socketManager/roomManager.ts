import { RoomData } from '@repo/shared/room';
import { v4 as uuid } from 'uuid';

export default class RoomManager {
  private rooms: RoomData[] = [];

  public setRooms(mockRooms: RoomData[]): void {
    this.rooms = mockRooms.map(mockRoom => {
      const { id, owner } = mockRoom;

      const room = { id, owner };
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
    };

    this.rooms.push(room);

    return room;
  }
}
