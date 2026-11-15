import { RoomData } from '@repo/shared/room';

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
}
