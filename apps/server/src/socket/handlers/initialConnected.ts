import { TypedServerIo, TypedSocket } from '../../types/types.ts';
import getSocketMiddleware from '../middlewares/socketMiddleware.ts';
import initialSocketStores from './initialSocketStores.ts';
import { sendLobbyState } from './lobbyHandlers.ts';
import { sendStatus } from './sessionHandlers.ts';

const initialConnected = (io: TypedServerIo) => {
  return (socket: TypedSocket): void => {
    const { userId } = socket.data;

    const middleware = getSocketMiddleware(userId);
    socket.use(middleware);

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

    socket.on('lobby:ask-state', sendLobbyState(handlerData));
  };
};

export default initialConnected;
