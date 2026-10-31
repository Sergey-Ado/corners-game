import { defaultEnv, Endpoints, HttpStatus } from '@repo/shared/api';
import { RegisterInputSchema } from '@repo/shared/user-schema';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.ts';
import * as argon from 'argon2';
import { v4 as uuid } from 'uuid';
import getUserWithoutPassword from '../utils/getUserWithoutPassword.ts';
import jwt from 'jsonwebtoken';
import process from 'node:process';

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

    const secretKey = process.env.JWT_SECRET_KEY || defaultEnv.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user.id }, secretKey);
    const output = getUserWithoutPassword(user);

    res.setHeader('auth-token', token);
    res.setHeader('Access-Control-Expose-Headers', 'auth-token');
    res.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    next(error);
  }
};

const authRouter = express.Router();

authRouter.post(Endpoints.REGISTER, register);

export default authRouter;
