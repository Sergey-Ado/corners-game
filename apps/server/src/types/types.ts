import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import { Server, Socket } from 'socket.io';

interface SocketData {
  userId: string;
  username: string;
}

export type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  object,
  SocketData
>;

export type TypedServerIo = Server<ClientToServerEvents, ServerToClientEvents>;
