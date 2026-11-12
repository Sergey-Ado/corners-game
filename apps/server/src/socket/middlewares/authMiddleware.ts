import { ExtendedError } from 'socket.io';
import { TypedSocket } from '../../types/types.ts';
import getSecretKey from '../../utils/getSecretKey.ts';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.ts';
import getLogger from '../../utils/logger.ts';

const authMiddleware = async (
  socket: TypedSocket,
  next: (error?: ExtendedError | undefined) => void
): Promise<void> => {
  try {
    const token: unknown = socket.handshake.auth.authToken;
    if (!token || typeof token !== 'string')
      throw new Error('Token is not string');

    const secretKey = getSecretKey();

    const payload = jwt.verify(token, secretKey);
    const userId = typeof payload === 'string' ? '' : payload.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User is not found');

    socket.data.userId = userId;
    socket.data.username = user.username;

    next();
  } catch {
    const logger = getLogger();
    logger.info('AUTH_REQUIRED');
    next(new Error('AUTH_REQUIRED'));
  }
};

export default authMiddleware;
