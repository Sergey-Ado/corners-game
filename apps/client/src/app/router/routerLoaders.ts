import { RoomData } from '@repo/shared/room';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import { Socket } from 'socket.io-client';

export default function getPageLoaders(
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) {
  const lobbyLoader = async () => {
    const roomData = await new Promise<RoomData[]>(res => {
      const handler = ({ roomData }: { roomData: RoomData[] }) => {
        res(roomData);
      };

      socket.on('lobby:send-state', handler);

      socket.emit('lobby:ask-state');
    });

    return { roomData };
  };

  return { lobbyLoader };
}
