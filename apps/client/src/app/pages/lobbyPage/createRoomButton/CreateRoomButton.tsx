import { TypedSocket } from '@/types/general.types';
import { useTranslation } from 'react-i18next';

interface props {
  disabled: boolean;
  socket: TypedSocket;
}

export default function CreateRoomButton({ disabled, socket }: props) {
  const { t } = useTranslation();

  const createButton = t('lobby.create');

  const clickButton = () => {
    socket.emit('lobby:create-room');
  };

  return (
    <button
      type="button"
      className="button px-2 py-1 normal-case"
      disabled={disabled}
      onClick={clickButton}
      role="room-create">
      {createButton}
    </button>
  );
}
