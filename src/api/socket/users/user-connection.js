import { UserConnectionUseCases } from './use-cases/user-connection.js';
import { connection } from '../../../config/sequelize/connection.js';
import { QueryTypes } from 'sequelize';

const query = new UserConnectionUseCases();

export const userConnectionEvents = (socket, users) => {
  socket.on('userLogged', async userId => {
    users.set(socket.id, userId);

    const status = await query.updateUserStatus(userId, 'Online');
    if (status !== false) socket.emit('connectedSuccesfully', status);
    socket.broadcast.emit('userGotConnected', { id: userId, status: status });
  });

  socket.on('disconnect', async () => {
    const userId = users.get(socket.id);
    if (userId) {
      users.delete(socket.id);
      const status = await query.updateUserStatus(userId, 'Invisible');
      if (status !== false) socket.broadcast.emit('userGotDisconnected', { id: userId, status: status });
    }
  });

  //CHATS
  socket.on('channelMessageSent', async messageData => {
    try {
      await connection.query(
        `
        INSERT INTO messages (user_id, channel_id, content) 
        VALUES (?, ?, ?)
        `,
        {
          replacements: [messageData.user_id, messageData.channelId, messageData.content],
          type: QueryTypes.INSERT,
        }
      );

      const lastMessage = await connection.query(
        `
        SELECT message_id, messages.user_id, content, creation_date, users.username, users.profile_image AS avatar FROM messages 
        INNER JOIN users
        ON messages.user_id = users.user_id
        WHERE messages.channel_id = ?
        ORDER BY creation_date DESC
        LIMIT 1`,
        {
          replacements: [messageData.channelId],
          type: QueryTypes.SELECT,
        }
      );
      socket.emit('channelMessageReceived', lastMessage[0]);
      socket.broadcast.emit('channelMessageReceived', lastMessage[0]);
    } catch {
      return false;
    }
  });
};
