import express, { json } from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/api/http/users/routes/user-router.js';
import serverRouter from './src/api/http/servers/routes/server-router.js';
import authRouter from './src/api/http/auth/routes/auth-router.js';
import { eventsManager } from './src/api/socket/events-manager.js';

const app = express();
const server = http.createServer(app);
const socket = new SocketServer(server);
const PORT = process.env.PORT || process.env.PORT_AUX;

app.disable('x-powered-by');
app.use(cors({ credentials: true, origin: (origin, callback) => callback(null, origin) }));
app.use(json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/servers', serverRouter);

socket.on('connection', socket => {
  eventsManager(socket);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
