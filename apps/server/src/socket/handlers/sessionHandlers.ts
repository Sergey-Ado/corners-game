import { HandlerData } from '../../types/types.ts';

export function sendStatus(handlerData: HandlerData) {
  const { io, socket, socketIdsMap, socketManager } = handlerData;

  return (): void => {
    const { userId, username } = socket.data;
    const status = socketManager.getUserStatus();

    const socketIds = socketIdsMap.get(userId);

    if (socketIds) {
      for (const socketId of socketIds) {
        io.to(socketId).emit('session:send-status', {
          userId,
          username,
          status,
        });
      }
    }
  };
}
