import Room from './roomCard/RoomCard';
import { useLoaderData } from 'react-router';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';
import { useEffect, useState } from 'react';
import CreateRoomButton from './createRoomButton/CreateRoomButton';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

export default function LobbyPage() {
  const { roomData, socket } = useLoaderData<{
    roomData: RoomData[];
    socket: TypedSocket;
  }>();

  const userId = useSelector((state: RootState) => state.general.userdata.id);

  const [cardData, setCardData] = useState<RoomData[]>(roomData);
  const [disabledCreateButton, setDisabledCreateButton] = useState(
    roomData.some(room => room.owner.id === userId)
  );

  useEffect(() => {
    const removedRoom = ({ roomId }: { roomId: string }) => {
      const newCardData = cardData.filter(card => card.id !== roomId);

      setCardData(newCardData);
      setDisabledCreateButton(
        newCardData.some(room => room.owner.id === userId)
      );
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
    <main className="grow flex flex-col gap-2">
      <div className="visual-panel p-2">
        <CreateRoomButton disabled={disabledCreateButton} socket={socket} />
      </div>
      <div className="visual-panel p-2 grow flex items-start justify-center">
        <div className="flex flex-wrap justify-center gap-2">{rooms}</div>
      </div>
    </main>
  );
}
