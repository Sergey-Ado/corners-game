import { SocketIdsMap } from '../../types/types.ts';
import { SocketManager } from '../socketManager/socketManager.ts';

class SocketStores {
  private static instance: SocketStores | undefined;
  public socketIdsMap: SocketIdsMap = new Map();
  public socketManager: SocketManager = new SocketManager();

  public constructor() {
    if (SocketStores.instance) return SocketStores.instance;

    SocketStores.instance = this;
  }
}

const initialSocketStores = (): {
  socketIdsMap: SocketIdsMap;
  socketManager: SocketManager;
} => {
  const { socketIdsMap, socketManager } = new SocketStores();

  return { socketIdsMap, socketManager };
};

export default initialSocketStores;
