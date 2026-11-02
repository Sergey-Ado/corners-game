import { TypedServerIo, TypedSocket } from '../../types/types.ts';
import { SocketManager } from '../socketManager/socketManager.ts';

const initialConnected = (io: TypedServerIo) => {
  console.log('call initialConnected');
  const manager = new SocketManager();

  return (socket: TypedSocket): void => {
    socket.on('session:ask-status', () => {
      const { userId, username } = socket.data;

      const status = manager.getUserStatus();

      io.emit('session:send-status', { userId, username, status });
    });
  };
};

export default initialConnected;
