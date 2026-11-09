import { RoomData } from './types/room.ts';

export enum UserStatus {
  IN_LOBBY = 'in-lobby',
}

type ClientEvent = { type: 'session:ask-status' } | { type: 'lobby:ask-state' };

type ServerEvent =
  | {
      type: 'session:send-status';
      payload: { userId: string; username: string; status: string };
    }
  | { type: 'lobby:send-state'; payload: { roomData: RoomData[] } };

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
