import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { RegisterInputSchema } from '@repo/shared/user-schema';
import { HttpStatus } from '@repo/shared/api';
import { v4 as uuid } from 'uuid';
import users from '../data/data.ts';
import getUserWithoutPassword from '../utils/getUserWithoutPassword.ts';

const createUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const body = RegisterInputSchema.safeParse(req.body);

    if (!body.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, username, password } = body.data;

    let user = users.find(s => s.email === email);
    if (user) {
      res.sendStatus(HttpStatus.CONFLICT);
    }

    user = { id: uuid(), email, username, password };

    users.push(user);

    const output = getUserWithoutPassword(user);

    res.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const output = users.map(user => getUserWithoutPassword(user));
    res.status(HttpStatus.OK).json(output);
  } catch (error) {
    next(error);
  }
};

const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string') {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const user = users.find(s => s.id === id);

    if (user) {
      res.json(getUserWithoutPassword(user));
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUserById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string') {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const userIndex = users.findIndex(s => s.id === id);
    if (userIndex === -1) {
      res.sendStatus(HttpStatus.NOT_FOUND);
      return;
    }
    users.splice(userIndex, 1);
    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

export default userRouter;
