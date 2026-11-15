import Room from './roomCard/RoomCard';
import { useLoaderData } from 'react-router';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';
import { useEffect, useState } from 'react';

export default function LobbyPage() {
  const { roomData, socket } = useLoaderData<{
    roomData: RoomData[];
    socket: TypedSocket;
  }>();

  const [cardData, setCardData] = useState<RoomData[]>(roomData);

  useEffect(() => {
    const removedRoom = ({ roomId }: { roomId: string }) => {
      setCardData(cardData.filter(item => item.id !== roomId));
    };

    socket.on('lobby:removed-room', removedRoom);

    return () => {
      socket.off('lobby:removed-room', removedRoom);
    };
  });

  const rooms = cardData.map(room => {
    return <Room room={room} key={room.id} socket={socket} />;
  });

  return (
    <main className="visual-panel p-2 grow flex items-start justify-center">
      <div className="flex flex-wrap justify-center gap-2">{rooms}</div>
    </main>
  );
}
