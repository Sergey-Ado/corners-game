import { HandlerData } from '../../types/types.ts';
import getSender from '../../utils/sender.ts';

export function sendLobbyState(handlerData: HandlerData) {
  const { socket, socketManager } = handlerData;

  return (): void => {
    const { userId } = socket.data;

    const roomState = socketManager.getRoomState(userId);

    const sender = getSender(handlerData);

    sender([userId], 'lobby:send-state', { roomState });
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
    const response = socketManager.createRoom({ id: userId, username });

    if (!response) return;

    const { room, lobbyPlayerIds } = response;

    const sender = getSender(handleData);

    sender(lobbyPlayerIds, 'lobby:created-room', { room });
  };
}

export function waitJoining(handleData: HandlerData) {
  const { socket, socketManager } = handleData;
  const { userId, username } = socket.data;

  return ({ roomId }: { roomId: string }): void => {
    const guest = { id: userId, username };

    const response = socketManager.waitJoining(roomId, guest);

    if (!response) return;

    const { room, lobbyPlayerIds } = response;

    if (!room.guest) return;

    const sender = getSender(handleData);

    sender(lobbyPlayerIds, 'lobby:wait-joining', { room });
  };
}

export function cancelJoining(handleData: HandlerData) {
  const { socket, socketManager } = handleData;
  const { userId, username } = socket.data;

  return (): void => {
    const response = socketManager.cancelJoining(userId);

    if (!response) return;

    const { room, lobbyPlayerIds } = response;

    const sender = getSender(handleData);

    sender(lobbyPlayerIds, 'lobby:canceled-joining', {
      room,
      initiator: { id: userId, username },
    });
  };
}

export function okJoining(handleData: HandlerData) {
  const { socket, socketManager } = handleData;
  const { userId } = socket.data;

  return (): void => {
    const response = socketManager.okJoining(userId);

    if (!response) return;

    const { roomIds, gamePlayerIds, lobbyPlayerIds } = response;

    const sender = getSender(handleData);

    sender(gamePlayerIds, 'game:started-game');
    for (const roomId of roomIds)
      sender(lobbyPlayerIds, 'lobby:removed-room', { roomId });
  };
}
