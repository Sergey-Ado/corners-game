import { HandlerData } from '../../types/types.ts';

export function sendStatus(handlerData: HandlerData) {
  const { io, socket, socketManager } = handlerData;

  return (): void => {
    const { userId, username } = socket.data;
    const status = socketManager.getUserStatus();

    io.emit('session:send-status', { userId, username, status });
  };
}
