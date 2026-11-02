import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import { Socket } from 'socket.io-client';

export enum Pages {
  WELCOME = '',
  LOGIN = 'login',
  REGISTER = 'register',
  LOBBY = 'lobby',
}

export enum StorageKeys {
  PREFIX = 'corners-game-',
  LANGUAGE = StorageKeys.PREFIX + 'language',
  THEME = StorageKeys.PREFIX + 'theme',
  TOKEN = StorageKeys.PREFIX + 'token',
}

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
