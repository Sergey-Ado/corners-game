import { Endpoints } from '@repo/shared/api';
import express from 'express';
import { Request, Response } from 'express';
import { createServer } from 'node:http';
import { errorHandler } from './api/errorHandler.ts';
import userRouter from './api/user.ts';
import authRouter from './api/auth.ts';
import cors from 'cors';
import getFrontendUrl from './utils/getFrontendUrl.ts';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import authMiddleware from './socket/middlewares/authMiddleware.ts';
import initialConnected from './socket/handlers/initialConnected.ts';
import apiRequestMiddleware from './socket/middlewares/apiRequestMiddleware.ts';
import apiResponseMiddleware from './socket/middlewares/apiResponseMiddleware.ts';

const origin = getFrontendUrl();

const app = express();
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin,
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use(express.json());

app.use(apiRequestMiddleware);
app.use(apiResponseMiddleware);

app.get(Endpoints.BASE, (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use(Endpoints.USER, userRouter);
app.use('', authRouter);

app.use(errorHandler);

io.use(authMiddleware);

const onConnection = initialConnected(io);

io.on('connection', onConnection);

export default server;
