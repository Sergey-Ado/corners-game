import { ServerToClientEvents } from '@repo/shared/socketEvents';
import { HandlerData } from '../types/types.ts';
import getLogger from './logger.ts';

export default function getSender(handleData: HandlerData) {
  const { io, socketIdsMap } = handleData;

  return <T extends keyof ServerToClientEvents>(
    userIds: string[],
    event: T,
    payload?: ServerToClientEvents[T] extends (args: infer P) => void
      ? P
      : never
  ): void => {
    const logger = getLogger();

    for (const userId of userIds) {
      const socketIds = socketIdsMap.get(userId);

      if (!socketIds) continue;

      for (const socketId of socketIds) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (io.to(socketId) as any).emit(event, payload);
      }

      logger.emit([userId], event, payload);
    }
  };
}
