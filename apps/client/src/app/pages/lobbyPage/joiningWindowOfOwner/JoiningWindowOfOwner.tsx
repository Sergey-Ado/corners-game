import ModalWrapper from '@/app/components/modalWrapper/ModalWrapper';
import { TypedSocket } from '@/types/general.types';
import { RoomData } from '@repo/shared/room';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface props {
  room: RoomData;
  socket: TypedSocket;
}

export default function JoiningWindowOfOwner({ room, socket }: props) {
  const { t } = useTranslation();

  const waitPlay = t('lobby.wait-to-play');
  const question = t('lobby.question');
  const yes = t('lobby.yes');
  const no = t('lobby.no');

  const guestName = room.guest?.username || 'anonymous';

  const onClickCancel = () => {
    socket.emit('lobby:cancel-joining');
  };

  return (
    <ModalWrapper>
      <div
        className={clsx(
          'flex flex-col items-center gap-0.5',
          'bg-primary-light dark:bg-primary-dark',
          'p-5 w-60 border rounded-lg'
        )}>
        <span className="underline">{guestName}</span>
        <span className="mb-2">{waitPlay}</span>
        <span className="mb-3">{question}</span>
        <div className="flex gap-4">
          <button className="button px-2 py-1">{yes}</button>
          <button className="button px-2 py-1" onClick={onClickCancel}>
            {no}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
