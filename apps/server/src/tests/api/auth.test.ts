import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { Endpoints, HttpStatus } from '@repo/shared/api';
import authRouter from '../../api/auth.ts';

const loginData = { email: 'test@mail.ru', password: 'password' };
const registerData = {
  username: 'John Doe',
  ...loginData,
};

vi.mock('../../lib/prisma.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('argon2', () => ({
  verify: vi.fn(),
  hash: vi.fn(),
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(() => 'jwt-token'),
  },
}));

const app = express();
app.use(express.json());
app.use('', authRouter);

describe('authRouter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should login user', async () => {
    const { prisma } = await import('../../lib/prisma.ts');
    const argon = await import('argon2');

    (prisma.user.findUnique as Mock).mockResolvedValue({
      id: 'uuid',
      ...registerData,
    });
    (argon.verify as Mock).mockResolvedValue(true);

    const res = await request(app).post(Endpoints.LOGIN).send(loginData);

    expect(res.status).toBe(HttpStatus.OK);
    expect(res.header['auth-token']).toBe('jwt-token');
    expect(res.body).toEqual({
      id: 'uuid',
      username: 'John Doe',
    });
  });

  it('should return 400 status if body is invalid when login', async () => {
    const res = await request(app)
      .post(Endpoints.LOGIN)
      .send({ email: 'test@mail.ru' });

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should return 403 status if user is not found when login', async () => {
    const { prisma } = await import('../../lib/prisma.ts');
    (prisma.user.findUnique as Mock).mockResolvedValue(null);

    const res = await request(app).post(Endpoints.LOGIN).send(loginData);

    expect(res.status).toBe(HttpStatus.FORBIDDEN);
  });

  it('should return 500 status if there is error when login', async () => {
    const { prisma } = await import('../../lib/prisma.ts');
    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).post(Endpoints.LOGIN).send(loginData);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should register user', async () => {
    const { prisma } = await import('../../lib/prisma.ts');

    (prisma.user.create as Mock).mockResolvedValue({
      id: 'uuid',
      ...registerData,
    });

    const res = await request(app).post(Endpoints.REGISTER).send(registerData);

    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.header['auth-token']).toBe('jwt-token');
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'John Doe',
    });
  });

  it('should return 400 status if body is incorrect when register', async () => {
    const invalidBody = { email: registerData.email };

    const res = await request(app).post(Endpoints.REGISTER).send(invalidBody);

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should return 409 status if email is already taken when register', async () => {
    const { prisma } = await import('../../lib/prisma.ts');

    (prisma.user.findUnique as Mock).mockResolvedValue(expect.any(Object));

    const res = await request(app).post(Endpoints.REGISTER).send(registerData);

    expect(res.status).toBe(HttpStatus.CONFLICT);
  });

  it('should return 500 status if there is internal error when creating user', async () => {
    const { prisma } = await import('../../lib/prisma.ts');

    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).post(Endpoints.REGISTER).send(registerData);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
