export interface RoomInput {
  ownerId: string;
  ownerName: string;
}

export interface RoomData extends RoomInput {
  id: string;
}
