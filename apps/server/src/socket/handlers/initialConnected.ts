import { TypedServerIo, TypedSocket } from '../../types/types.ts';
import initialSocketStores from './initialSocketStores.ts';
import { sendStatus } from './sessionHandlers.ts';

const initialConnected = (io: TypedServerIo) => {
  console.log('call initialConnected');

  return (socket: TypedSocket): void => {
    const { userId } = socket.data;

    const { socketIdsMap, socketManager } = initialSocketStores();

    const socketIds = socketIdsMap.get(userId);

    if (socketIds) {
      socketIds.add(socket.id);
      socketIdsMap.set(userId, socketIds);
    } else {
      socketIdsMap.set(userId, new Set([socket.id]));
    }

    const handlerData = { io, socket, socketIdsMap, socketManager };

    socket.on('session:ask-status', sendStatus(handlerData));
  };
};

export default initialConnected;
