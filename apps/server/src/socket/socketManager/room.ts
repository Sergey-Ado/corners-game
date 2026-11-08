import { v4 as uuid } from 'uuid';
import { RoomData, RoomInput } from '@repo/shared/room';

export default class Room {
  private id: string;
  private ownerId: string;
  private ownerName: string;

  public constructor({ ownerId, ownerName }: RoomInput) {
    this.id = uuid();
    this.ownerId = ownerId;
    this.ownerName = ownerName;
  }

  public getData(): RoomData {
    return { id: this.id, ownerId: this.ownerId, ownerName: this.ownerName };
  }
}
