import { getLogger } from '../../logger/logger.ts';
import { HandlerData } from '../../types/types.ts';

export function sendLobbyState(handlerData: HandlerData) {
  const { io, socket, socketIdsMap, socketManager } = handlerData;

  return (): void => {
    const roomData = socketManager.getRoomData();

    const { userId } = socket.data;

    const socketIds = socketIdsMap.get(userId);

    if (!socketIds) return;

    const logger = getLogger();

    for (const socketId of socketIds) {
      io.to(socketId).emit('lobby:send-state', { roomData });
    }

    logger.emit([userId], 'lobby:send-state', { roomData });
  };
}
