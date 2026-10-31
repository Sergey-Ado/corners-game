import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { Endpoints, HttpStatus } from '@repo/shared/api';
import { prisma } from '../../lib/prisma.ts';
import authRouter from '../../api/auth.ts';

const userData = {
  email: 'test@mail.ru',
  username: 'John Doe',
  password: 'password',
};

vi.mock('../../lib/prisma.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const app = express();
app.use(express.json());
app.use('', authRouter);

describe('userRouter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should create user', async () => {
    (prisma.user.create as Mock).mockResolvedValue({
      id: 'uuid',
      ...userData,
    });

    const res = await request(app).post(Endpoints.REGISTER).send(userData);

    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'John Doe',
    });
    expect(res.headers).toHaveProperty('auth-token');
  });

  it('should return 400 status if body is incorrect when creating user', async () => {
    const invalidBody = { email: userData.email };

    const res = await request(app).post(Endpoints.REGISTER).send(invalidBody);

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should return 409 status if email is already taken when creating user', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue(expect.any(Object));

    const res = await request(app).post(Endpoints.REGISTER).send(userData);

    expect(res.status).toBe(HttpStatus.CONFLICT);
  });

  it('should return 500 status if there is internal error when creating user', async () => {
    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).post(Endpoints.REGISTER).send(userData);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
