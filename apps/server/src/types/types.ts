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

export type SocketIdsMap = Map<string, Set<string>>;

export type HandlerData = {
  io: TypedServerIo;
  socket: TypedSocket;
  socketIdsMap: SocketIdsMap;
  socketManager: SocketManager;
};

export const KEY_FOR_SHOW_KEY = 'yes';
