import Avatar from '@/app/components/avatar/Avatar';
import { RootState } from '@/app/store/store';
import { RoomData } from '@repo/shared/roomData';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface props {
  room: RoomData;
}

const onClickDelete = () => console.log('delete');

const onClickJoin = () => console.log('join');

export default function Room({ room }: props) {
  const { ownerId, ownerName } = room;

  const { t } = useTranslation();

  const join = t('lobby.join');
  const del = t('lobby.delete');

  const userId = useSelector((state: RootState) => state.general.userdata.id);

  const joinButton = (
    <button type="button" className="button px-2 py-1" onClick={onClickJoin}>
      {join}
    </button>
  );

  const deleteButton = (
    <button type="button" className="button px-2 py-1" onClick={onClickDelete}>
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
        <Avatar seed={ownerId} />
        <h2 className="truncate max-w-34">{ownerName}</h2>
      </div>
      {userId === ownerId && deleteButton}
      {userId !== ownerId && joinButton}
    </div>
  );
}
