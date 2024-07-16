import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRouter from '../api/users/routes/user-router.js';
import authRouter from '../api/auth/routes/auth-router.js';
import serverRouter from '../api/servers/routes/server-router.js';
import cookieParser from 'cookie-parser';

export class Server {
  constructor() {
    this.server = express();
    this.PORT = process.env.PORT || process.env.PORT_AUX;
    this.middlewares();
  }

  middlewares = () => {
    this.server.disable('x-powered-by');
    this.server.use(cors({ credentials: true, origin: (origin, callback) => callback(null, origin) }));
    this.server.use(json({ limit: '10mb' }));
    this.server.use(cookieParser());

    this.server.use('/api', authRouter);
    this.server.use('/api/users', userRouter);
    this.server.use('/api/servers', serverRouter);
  };

  run = () => {
    this.server.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}`);
    });
  };
}
