import Room from './roomCard/RoomCard';
import { useLoaderData } from 'react-router';
import { RoomData } from '@repo/shared/room';

export default function LobbyPage() {
  const { roomData } = useLoaderData<{ roomData: RoomData[] }>();

  const rooms = roomData.map(room => {
    return <Room room={room} key={room.id} />;
  });

  return (
    <main className="visual-panel p-2 grow flex items-start justify-center">
      <div className="flex flex-wrap justify-center gap-2">{rooms}</div>
    </main>
  );
}
