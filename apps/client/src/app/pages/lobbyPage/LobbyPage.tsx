import mockRooms from '@/app/mockData/mockRooms';
import Room from './roomCard/RoomCard';

export default function LobbyPage() {
  const rooms = mockRooms.map(room => {
    return <Room room={room} key={room.id} />;
  });

  return (
    <main className="visual-panel p-2 grow flex items-start justify-center">
      <div className="flex flex-wrap justify-center gap-2">{rooms}</div>
    </main>
  );
}
