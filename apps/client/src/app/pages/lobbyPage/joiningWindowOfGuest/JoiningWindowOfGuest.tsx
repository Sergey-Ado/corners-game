import ModalWrapper from '@/app/components/modalWrapper/ModalWrapper';
import { RoomData } from '@repo/shared/room';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface props {
  room: RoomData;
}

export default function JoiningWindowOfGuest({ room }: props) {
  const { t } = useTranslation();

  const wait = t('lobby.wait');
  const cancel = t('lobby.cancel');

  const ownerName = room.owner.username;

  return (
    <ModalWrapper>
      <div
        className={clsx(
          'flex flex-col items-center gap-0.5',
          'bg-primary-light dark:bg-primary-dark',
          'p-5 w-60 border rounded-lg'
        )}>
        <span className="text-center">{wait}</span>
        <span className="underline mb-3">{ownerName}</span>
        <div
          className={clsx(
            'inline-block h-8 w-8 mb-4 animate-spin rounded-full border-3 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
            'text-primary-dark dark:text-white'
          )}
          role="status"></div>
        <button className="button px-2 py-1">{cancel}</button>
      </div>
    </ModalWrapper>
  );
}
