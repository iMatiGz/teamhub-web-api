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

  socket.on('channelCreated', async channelData => {
    try {
      await connection.query(`INSERT INTO channels (server_id, name) VALUES (?, ?)`, {
        replacements: [channelData.serverId, channelData.channelName],
        type: QueryTypes.INSERT,
      });

      const newChannel = await connection.query(
        `SELECT channel_id, server_id, name FROM channels ORDER BY channel_id DESC LIMIT 1`,
        { type: QueryTypes.SELECT }
      );

      socket.emit('newChannelCreated', newChannel[0]);
      socket.broadcast.emit('newChannelCreated', newChannel[0]);
    } catch {
      return false;
    }
  });

  socket.on('channelDeleted', async channel => {
    try {
      await connection.query(`DELETE FROM channels WHERE channel_id = ?`, {
        replacements: [channel.id],
        type: QueryTypes.DELETE,
      });

      socket.emit('channelGotDeleted', channel);
      socket.broadcast.emit('channelGotDeleted', channel);
    } catch {
      console.log('Error');
      return false;
    }
  });

  socket.on('messageDeleted', async message => {
    try {
      await connection.query(`DELETE FROM messages WHERE message_id = ?`, {
        replacements: [message.id],
        type: QueryTypes.DELETE,
      });

      socket.emit('messageGotDeleted', message);
      socket.broadcast.emit('messageGotDeleted', message);
    } catch {
      console.log('Error');
      return false;
    }
  });
};
