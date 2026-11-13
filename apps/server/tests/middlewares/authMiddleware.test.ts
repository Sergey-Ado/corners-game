import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import authMiddleware from '../../src/socket/middlewares/authMiddleware.ts';
import { TypedSocket } from '../../src/types/types.ts';

const mockNext = vi.fn();

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

vi.mock('../../src/lib/prisma.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('authMiddleware', () => {
  it('should write userId and username to socket object and call next', async () => {
    const handshake: any = {
      auth: {
        authToken: 'fakeToken',
      },
    };

    const socket: Partial<TypedSocket> = {
      handshake,
      data: {
        userId: '',
        username: '',
      },
    };

    const jwt = await import('jsonwebtoken');
    (jwt.default.verify as Mock).mockReturnValue({
      userId: 'userId',
    });

    const { prisma } = await import('../../src/lib/prisma.ts');
    (prisma.user.findUnique as Mock).mockResolvedValue({
      username: 'username',
    });

    await authMiddleware(socket as TypedSocket, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(socket.data?.userId).toBe('userId');
    expect(socket.data?.username).toBe('username');
  });

  it('should write empty string to socket.data.userId if jwt.verify return string', async () => {
    const handshake: any = {
      auth: {
        authToken: 'fakeToken',
      },
    };

    const socket: Partial<TypedSocket> = {
      handshake,
      data: {
        userId: '',
        username: '',
      },
    };

    const jwt = await import('jsonwebtoken');
    (jwt.default.verify as Mock).mockReturnValue('payload');

    const { prisma } = await import('../../src/lib/prisma.ts');
    (prisma.user.findUnique as Mock).mockResolvedValue({
      username: 'username',
    });

    await authMiddleware(socket as TypedSocket, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(socket.data?.userId).toBe('');
    expect(socket.data?.username).toBe('username');
  });

  it('should throw error if token is not string', async () => {
    const handshake: any = {
      auth: {
        authToken: 1,
      },
    };

    const socket: Partial<TypedSocket> = {
      handshake,
      data: {
        userId: '',
        username: '',
      },
    };

    await authMiddleware(socket as TypedSocket, mockNext);

    expect(mockNext).toHaveBeenCalledOnce();
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'AUTH_REQUIRED' })
    );
  });

  it('should throw error if user is not found', async () => {
    const handshake: any = {
      auth: {
        authToken: 'fakeToken',
      },
    };

    const socket: Partial<TypedSocket> = {
      handshake,
      data: {
        userId: '',
        username: '',
      },
    };

    const jwt = await import('jsonwebtoken');
    (jwt.default.verify as Mock).mockReturnValue({
      userId: 'userId',
    });

    const { prisma } = await import('../../src/lib/prisma.ts');
    (prisma.user.findUnique as Mock).mockResolvedValue(null);

    await authMiddleware(socket as TypedSocket, mockNext);

    expect(mockNext).toHaveBeenCalledOnce();
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'AUTH_REQUIRED' })
    );
  });
});
