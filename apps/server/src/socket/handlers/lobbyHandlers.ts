import getLogger from '../../utils/logger.ts';
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

export function removeRoom(handleData: HandlerData) {
  const { io, socketIdsMap, socketManager } = handleData;

  return ({ roomId }: { roomId: string }): void => {
    console.log('remove room', roomId);
    const response = socketManager.removeRoom(roomId);

    if (!response) return;

    const { lobbyPlayerIds } = response;

    for (const playerId of lobbyPlayerIds) {
      const socketIds = socketIdsMap.get(playerId);

      if (!socketIds) return;

      const logger = getLogger();

      for (const socketId of socketIds) {
        io.to(socketId).emit('lobby:removed-room', { roomId });
      }

      logger.emit(lobbyPlayerIds, 'lobby:removed-room', { roomId });
    }
    console.log(lobbyPlayerIds);
  };
}
