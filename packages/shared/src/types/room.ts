import { Player } from './user.ts';

export interface RoomData {
  id: string;
  owner: Player;
  guest: Player | null;
}

export interface RoomState {
  roomData: RoomData[];
  waitRoom: RoomData | null;
}
