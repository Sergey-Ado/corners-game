import Avatar from '@/app/components/avatar/Avatar';
import { RootState } from '@/app/store/store';
import { TypedSocket } from '@/types/general.types';
import { RoomData } from '@repo/shared/room';
import { Player } from '@repo/shared/user';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface props {
  room: RoomData;
  socket: TypedSocket;
}

export default function RoomCard({ room, socket }: props) {
  const [waiting, setWaiting] = useState(Boolean(room.guest));

  const { id: roomId, owner } = room;

  useEffect(() => {
    const onSetWaiting = ({
      roomId: id,
    }: {
      roomId: string;
      guest: Player;
    }) => {
      if (roomId !== id) return;

      setWaiting(true);
    };

    socket.on('lobby:wait-joining', onSetWaiting);

    return () => {
      socket.off('lobby:wait-joining', onSetWaiting);
    };
  });

  const { t } = useTranslation();

  const join = t('lobby.join');
  const del = t('lobby.delete');
  const freeStatus = t('lobby.free');
  const occupiedStatus = t('lobby.occupied');

  const userId = useSelector((state: RootState) => state.general.userdata.id);

  const onClickDelete = () => {
    socket.emit('lobby:remove-room', { roomId });
  };

  const onClickJoin = () => {
    socket.emit('lobby:ask-joining', { roomId });
  };

  const joinButton = (
    <button
      type="button"
      className="button px-2 py-1"
      onClick={onClickJoin}
      role="room-join"
      disabled={waiting}>
      {join}
    </button>
  );

  const deleteButton = (
    <button
      type="button"
      className="button px-2 py-1"
      onClick={onClickDelete}
      role="room-delete"
      disabled={waiting}>
      {del}
    </button>
  );

  return (
    <div
      className={clsx(
        'bg-white dark:bg-secondary-dark',
        'rounded-lg border px-2 py-2 w-48 max-w-2xs',
        'flex flex-col items-center gap-2'
      )}>
      <div className="flex items-center">
        <Avatar seed={owner.id} />
        <h2 className="truncate max-w-34">{owner.username}</h2>
      </div>
      <p>{waiting ? occupiedStatus : freeStatus}</p>
      {userId === owner.id && deleteButton}
      {userId !== owner.id && joinButton}
    </div>
  );
}
