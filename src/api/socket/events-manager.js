import { userConnectionEvents } from './users/user-connection.js';

const users = new Map();

export const eventsManager = socket => {
  userConnectionEvents(socket, users);
};
