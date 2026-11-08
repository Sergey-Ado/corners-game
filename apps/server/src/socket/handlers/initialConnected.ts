import { TypedServerIo, TypedSocket } from '../../types/types.ts';
import { SocketManager } from '../socketManager/socketManager.ts';
import { sendStatus } from './sessionHandlers.ts';

const initialConnected = (io: TypedServerIo) => {
  console.log('call initialConnected');
  const socketManager = new SocketManager();

  return (socket: TypedSocket): void => {
    const handlerData = { io, socket, socketManager };

    socket.on('session:ask-status', sendStatus(handlerData));
  };
};

export default initialConnected;
