import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { Endpoints, HttpStatus } from '@repo/shared/api';
import userRouter, { deleteUserById, getUserById } from '../../api/user.ts';
import { prisma } from '../../lib/prisma.ts';

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
app.use(Endpoints.USER, userRouter);

describe('userRouter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should create user', async () => {
    (prisma.user.create as Mock).mockResolvedValue({
      id: 'uuid',
      ...userData,
    });

    const res = await request(app).post(Endpoints.USER).send(userData);

    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@mail.ru',
      username: 'John Doe',
    });
  });

  it('should return 400 status if body is incorrect when creating user', async () => {
    const invalidBody = { email: userData.email };

    const res = await request(app).post(Endpoints.USER).send(invalidBody);

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should return 409 status if email is already taken when creating user', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue(expect.any(Object));

    const res = await request(app).post(Endpoints.USER).send(userData);

    expect(res.status).toBe(HttpStatus.CONFLICT);
  });

  it('should return 500 status if there is internal error when creating user', async () => {
    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).post(Endpoints.USER).send(userData);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should return all users without password', async () => {
    (prisma.user.findMany as Mock).mockResolvedValue([
      { id: 'uuid', ...userData },
    ]);

    const res = await request(app).get(Endpoints.USER);

    expect(res.body).toEqual([
      { id: 'uuid', email: userData.email, username: userData.username },
    ]);
  });

  it('should return 500 status if there is internal error when getting all users', async () => {
    (prisma.user.findMany as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).get(Endpoints.USER);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should return user by id', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue({
      id: 'uuid',
      ...userData,
    });

    const res = await request(app).get(`${Endpoints.USER}/uuid`);

    expect(res.body).toEqual({
      id: 'uuid',
      email: userData.email,
      username: userData.username,
    });
  });

  it('should return 400 status if id is invalid when getting user by id', async () => {
    const req = { params: { id: 123 } };
    const res = { sendStatus: vi.fn() };
    const next = vi.fn();

    await getUserById(req as any, res as any, next);

    expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return 404 status if user is not found when getting user', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue(null);

    const res = await request(app).get(`${Endpoints.USER}/id`);

    expect(res.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should return 500 status if there is internal error when getting user', async () => {
    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).get(`${Endpoints.USER}/id`);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should return 204 status when deleting user', async () => {
    const userDataFull = { id: 'uuid', ...userData };

    (prisma.user.findUnique as Mock).mockResolvedValue(userDataFull);
    (prisma.user.delete as Mock).mockResolvedValue(userDataFull);

    const res = await request(app).delete(`${Endpoints.USER}/id`);

    expect(res.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should return 400 status if id is invalid when getting user by id', async () => {
    const req = { params: { id: 123 } };
    const res = { sendStatus: vi.fn() };
    const next = vi.fn();

    await deleteUserById(req as any, res as any, next);

    expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return 404 status if user is not found when getting user', async () => {
    (prisma.user.findUnique as Mock).mockResolvedValue(null);

    const res = await request(app).delete(`${Endpoints.USER}/id`);

    expect(res.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should return 500 status if there is internal error when getting user', async () => {
    (prisma.user.findUnique as Mock).mockRejectedValue(new Error('error'));

    const res = await request(app).delete(`${Endpoints.USER}/id`);

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
