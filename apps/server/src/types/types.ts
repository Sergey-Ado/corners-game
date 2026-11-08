import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import { Server, Socket } from 'socket.io';
import { SocketManager } from '../socket/socketManager/socketManager.ts';

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

export type HandlerData = {
  io: TypedServerIo;
  socket: TypedSocket;
  socketManager: SocketManager;
};
