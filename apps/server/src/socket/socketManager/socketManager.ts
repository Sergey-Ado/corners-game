import { UserStatus } from '@repo/shared/socketEvents';
import Room from './room.ts';
import { RoomData } from '@repo/shared/room';

export class SocketManager {
  private rooms: Room[] = [];

  public getUserStatus(): UserStatus {
    return UserStatus.IN_LOBBY;
  }

  public setRooms(mockRooms: RoomData[]): void {
    this.rooms = mockRooms.map(mockRoom => {
      const { id, ownerId, ownerName } = mockRoom;
      const room = new Room({ ownerId, ownerName });
      room.setId(id);
      return room;
    });
  }

  public getRoomData(): RoomData[] {
    return this.rooms.map(room => room.getData());
  }
}
