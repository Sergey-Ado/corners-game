import { HandlerData } from '../../types/types.ts';
import getSender from '../../utils/sender.ts';

export function sendLobbyState(handlerData: HandlerData) {
  const { socket, socketManager } = handlerData;

  return (): void => {
    const roomData = socketManager.getRoomData();

    const { userId } = socket.data;

    const sender = getSender(handlerData);

    sender([userId], 'lobby:send-state', { roomData });
  };
}

export function removeRoom(handleData: HandlerData) {
  const { socketManager } = handleData;

  return ({ roomId }: { roomId: string }): void => {
    const response = socketManager.removeRoom(roomId);

    if (!response) return;

    const { lobbyPlayerIds } = response;

    const sender = getSender(handleData);

    sender(lobbyPlayerIds, 'lobby:removed-room', { roomId });
  };
}

export function createRoom(handleData: HandlerData) {
  const { socket, socketManager } = handleData;
  const { userId, username } = socket.data;

  return (): void => {
    const response = socketManager.createRoom(userId, username);

    if (!response) return;

    const { room, lobbyPlayerIds } = response;

    const sender = getSender(handleData);

    sender(lobbyPlayerIds, 'lobby:created-room', { room });
  };
}
