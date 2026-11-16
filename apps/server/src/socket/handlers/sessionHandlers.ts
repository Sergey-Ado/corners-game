import { HandlerData } from '../../types/types.ts';
import getSender from '../../utils/sender.ts';

export function sendStatus(handlerData: HandlerData) {
  const { socket, socketIdsMap, socketManager } = handlerData;

  return (): void => {
    const { userId, username } = socket.data;
    const status = socketManager.getUserStatus();

    const socketIds = socketIdsMap.get(userId);

    if (!socketIds) return;

    const sender = getSender(handlerData);

    sender([userId], 'session:send-status', { userId, username, status });
  };
}
