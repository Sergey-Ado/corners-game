import express from 'express';
import { Request, Response } from 'express';

import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

export default server;
