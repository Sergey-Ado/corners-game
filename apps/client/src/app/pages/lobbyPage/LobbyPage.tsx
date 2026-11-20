import Room from './roomCard/RoomCard';
import { useLoaderData } from 'react-router';
import { RoomData } from '@repo/shared/room';
import { TypedSocket } from '@/types/general.types';
import { useEffect, useState } from 'react';
import CreateRoomButton from './createRoomButton/CreateRoomButton';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import JoiningWindowOfOwner from './joiningWindowOfOwner/JoiningWindowOfOwner';
import JoiningWindowOfGuest from './joiningWindowOfGuest/JoiningWindowOfGuest';

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
  const [waitOfOwner, setWaitOfOwner] = useState<RoomData | null>(null);
  const [waitOfGuest, setWaitOfGuest] = useState<RoomData | null>(null);

  useEffect(() => {
    const removedRoom = ({ roomId }: { roomId: string }) => {
      const newCardData = cardData.filter(card => card.id !== roomId);

      setCardData(newCardData);
      setDisabledCreateButton(
        newCardData.some(room => room.owner.id === userId)
      );
    };

    const createdRoom = ({ room }: { room: RoomData }) => {
      const newCardData = [...cardData, room];

      setCardData(newCardData);
      setDisabledCreateButton(
        newCardData.some(room => room.owner.id === userId)
      );
    };

    const showWaitJoining = ({ room }: { room: RoomData }) => {
      if (room.owner.id === userId) setWaitOfOwner(room);
      if (room.guest && room.guest.id === userId) setWaitOfGuest(room);
    };

    socket.on('lobby:removed-room', removedRoom);
    socket.on('lobby:created-room', createdRoom);
    socket.on('lobby:wait-joining', showWaitJoining);

    return () => {
      socket.off('lobby:removed-room', removedRoom);
      socket.off('lobby:created-room', createdRoom);
      socket.off('lobby:wait-joining', showWaitJoining);
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
      {waitOfOwner && <JoiningWindowOfOwner room={waitOfOwner} />}
      {waitOfGuest && <JoiningWindowOfGuest room={waitOfGuest} />}
    </main>
  );
}
