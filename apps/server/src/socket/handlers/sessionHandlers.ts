import getLogger from '../../utils/logger.ts';
import { HandlerData } from '../../types/types.ts';

export function sendStatus(handlerData: HandlerData) {
  const { io, socket, socketIdsMap, socketManager } = handlerData;

  return (): void => {
    const { userId, username } = socket.data;
    const status = socketManager.getUserStatus();

    const socketIds = socketIdsMap.get(userId);

    if (!socketIds) return;

    const logger = getLogger();

    for (const socketId of socketIds) {
      io.to(socketId).emit('session:send-status', {
        userId,
        username,
        status,
      });
    }

    logger.emit([userId], 'session:send-status', { userId, username, status });
  };
}
