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

const origin = getFrontendUrl();

const app = express();
const server = createServer(app);

const io = new Server(server, {
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

app.get(Endpoints.BASE, (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use(Endpoints.USER, userRouter);
app.use('', authRouter);

app.use(errorHandler);

io.on('connection', socket => {
  socket.emit('message', 'connection...');
});

export default server;
