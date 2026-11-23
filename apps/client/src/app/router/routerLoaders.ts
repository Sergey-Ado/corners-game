import { RoomState } from '@repo/shared/room';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import { Socket } from 'socket.io-client';

export default function getPageLoaders(
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) {
  const lobbyLoader = async () => {
    const roomState = await new Promise<RoomState>(res => {
      const handler = ({ roomState }: { roomState: RoomState }) => {
        res(roomState);
      };

      socket.on('lobby:send-state', handler);

      socket.emit('lobby:ask-state');
    });

    return { roomState, socket };
  };

  return { lobbyLoader };
}
