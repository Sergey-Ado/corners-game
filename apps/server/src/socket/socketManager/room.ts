import { v4 as uuid } from 'uuid';
import { RoomData } from '@repo/shared/room';
import { Player } from '@repo/shared/user';

export default class Room {
  private id: string;
  private owner: Player;

  public constructor(owner: Player) {
    this.id = uuid();
    this.owner = { ...owner };
  }

  public getData(): RoomData {
    return { id: this.id, owner: { ...this.owner } };
  }

  public setId(id: string): void {
    this.id = id;
  }
}
