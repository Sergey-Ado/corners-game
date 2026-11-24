import { RoomData, RoomState } from './types/room.ts';
import { Player } from './types/user.ts';

export enum UserStatus {
  IN_LOBBY = 'in-lobby',
  IN_GAME = 'in-game',
}

type ClientEvent =
  | { type: 'session:ask-status' }
  | { type: 'lobby:ask-state' }
  | { type: 'lobby:remove-room'; payload: { roomId: string } }
  | { type: 'lobby:create-room' }
  | { type: 'lobby:ask-joining'; payload: { roomId: string } }
  | { type: 'lobby:cancel-joining' }
  | { type: 'lobby:ok-joining' };

type ServerEvent =
  | {
      type: 'session:send-status';
      payload: { userId: string; username: string; status: string };
    }
  | { type: 'lobby:send-state'; payload: { roomState: RoomState } }
  | { type: 'lobby:removed-room'; payload: { roomId: string } }
  | { type: 'lobby:created-room'; payload: { room: RoomData } }
  | { type: 'lobby:wait-joining'; payload: { room: RoomData } }
  | {
      type: 'lobby:canceled-joining';
      payload: { room: RoomData; initiator: Player };
    }
  | { type: 'game:started-game' };

type EventName<T> = T extends { type: infer K } ? K : never;

type EventPayload<T> = T extends { payload: infer P }
  ? P extends undefined
    ? () => void
    : (data: P) => void
  : () => void;

type DiscriminatedUnionToSocketEvents<T extends { type: string }> = {
  [K in EventName<T>]: EventPayload<Extract<T, { type: K }>>;
};

export type ServerToClientEvents =
  DiscriminatedUnionToSocketEvents<ServerEvent>;

export type ClientToServerEvents =
  DiscriminatedUnionToSocketEvents<ClientEvent>;
