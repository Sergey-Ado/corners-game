import { Endpoints, HttpStatus } from '@repo/shared/api';
import {
  LoginInputSchema,
  RegisterInputSchema,
} from '@repo/shared/user-schema';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.ts';
import * as argon from 'argon2';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { UserOutput } from '@repo/shared/user';
import getSecretKey from '../utils/getSecretKey.ts';

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = LoginInputSchema.safeParse(req.body);

    if (!body.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, password } = body.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await argon.verify(user.password, password))) {
      res.sendStatus(HttpStatus.FORBIDDEN);
      return;
    }

    const secretKey = getSecretKey();
    const token = jwt.sign({ userId: user.id }, secretKey);
    const output: UserOutput = { id: user.id, username: user.username };

    res.setHeader('auth-token', token);
    res.setHeader('Access-Control-Expose-Headers', 'auth-token');
    res.status(HttpStatus.OK).json(output);
  } catch (error) {
    next(error);
  }
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = RegisterInputSchema.safeParse(req.body);

    if (!body.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, username, password } = body.data;

    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      res.sendStatus(HttpStatus.CONFLICT);
    }

    const hash = await argon.hash(password);
    user = { id: uuid(), email, username, password: hash };

    user = await prisma.user.create({ data: user });

    const secretKey = getSecretKey();
    const token = jwt.sign({ userId: user.id }, secretKey);
    const output: UserOutput = { id: user.id, username: user.username };

    res.setHeader('auth-token', token);
    res.setHeader('Access-Control-Expose-Headers', 'auth-token');
    res.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    next(error);
  }
};

const authRouter = express.Router();

authRouter.post(Endpoints.LOGIN, login);
authRouter.post(Endpoints.REGISTER, register);

export default authRouter;
