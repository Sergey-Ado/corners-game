import { Endpoints } from '@repo/shared/api';
import express from 'express';
import { Request, Response } from 'express';

import { createServer } from 'node:http';
import { errorHandler } from './api/errorHandler.ts';
import userRouter from './api/user.ts';
import authRouter from './api/auth.ts';

const app = express();
const server = createServer(app);

app.use(express.json());

app.get(Endpoints.BASE, (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use(Endpoints.USER, userRouter);
app.use('', authRouter);

app.use(errorHandler);

export default server;
