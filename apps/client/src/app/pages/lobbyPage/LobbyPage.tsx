import Room from './roomCard/RoomCard';
import { useLoaderData, useNavigate } from 'react-router';
import { RoomData, RoomState } from '@repo/shared/room';
import { Pages, TypedSocket } from '@/types/general.types';
import { useEffect, useState } from 'react';
import CreateRoomButton from './createRoomButton/CreateRoomButton';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import JoiningWindowOfOwner from './joiningWindowOfOwner/JoiningWindowOfOwner';
import JoiningWindowOfGuest from './joiningWindowOfGuest/JoiningWindowOfGuest';
import { Player } from '@repo/shared/user';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function LobbyPage() {
  const { roomState, socket } = useLoaderData<{
    roomState: RoomState;
    socket: TypedSocket;
  }>();
  const { roomData, waitRoom } = roomState;

  const userId = useSelector((state: RootState) => state.general.userdata.id);

  const navigate = useNavigate();

  const [cardData, setCardData] = useState<RoomData[]>(roomData);
  const [disabledCreateButton, setDisabledCreateButton] = useState(
    roomData.some(room => room.owner.id === userId)
  );

  const waitOwner = (function () {
    if (!waitRoom) return null;

    return waitRoom.owner.id === userId ? waitRoom : null;
  })();

  const waitGuest = (function () {
    if (!waitRoom) return null;

    return waitRoom.guest && waitRoom.guest.id === userId ? waitRoom : null;
  })();

  const [waitOfOwner, setWaitOfOwner] = useState<RoomData | null>(waitOwner);
  const [waitOfGuest, setWaitOfGuest] = useState<RoomData | null>(waitGuest);

  const { t } = useTranslation();

  const refused = t('lobby.refused');
  const changeMind = t('lobby.change-mind');

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

    const canceledJoining = ({
      room,
      initiator,
    }: {
      room: RoomData;
      initiator: Player;
    }) => {
      if (room.owner.id === userId) {
        setWaitOfOwner(null);

        if (initiator.id !== userId)
          toast(`${initiator.username} ${changeMind}`);
      }

      // eslint-disable-next-line unicorn/prefer-early-return
      if (room.guest && room.guest.id === userId) {
        setWaitOfGuest(null);

        if (initiator.id !== userId) toast(`${initiator.username} ${refused}`);
      }
    };

    const onGameStarted = () => {
      navigate(`/${Pages.GAME}`);
    };

    socket.on('lobby:removed-room', removedRoom);
    socket.on('lobby:created-room', createdRoom);
    socket.on('lobby:wait-joining', showWaitJoining);
    socket.on('lobby:canceled-joining', canceledJoining);
    socket.on('game:started-game', onGameStarted);

    return () => {
      socket.off('lobby:removed-room', removedRoom);
      socket.off('lobby:created-room', createdRoom);
      socket.off('lobby:wait-joining', showWaitJoining);
      socket.off('lobby:canceled-joining', canceledJoining);
      socket.off('game:started-game', onGameStarted);
    };
  }, [navigate, cardData, changeMind, refused, socket, userId]);

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
      {waitOfOwner && (
        <JoiningWindowOfOwner room={waitOfOwner} socket={socket} />
      )}
      {waitOfGuest && (
        <JoiningWindowOfGuest room={waitOfGuest} socket={socket} />
      )}
    </main>
  );
}
