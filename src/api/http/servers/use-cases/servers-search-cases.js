import { QueryTypes } from 'sequelize';
import models from '../../../../config/sequelize/associations/associations.js';
import { connection } from '../../../../config/sequelize/connection.js';
import { ServerServices } from '../services/server-services.js';

export class ServerSearchCases {
  constructor() {
    this.sql = new ServerServices();
    this.models = models;
  }

  searchServersByUserId = async userId => {
    const servers = await connection.query(
      `SELECT server.server_id, SERVER.name, SERVER.icon 
      FROM server_onboarding
      INNER JOIN servers AS SERVER 
      ON server_onboarding.server_id = SERVER.server_id
      AND server_onboarding.user_id = ?;
    `,
      { replacements: [userId], type: QueryTypes.SELECT }
    );
    return servers;
  };

  getChannels = async serverId => {
    try {
      const channels = await connection.query(`SELECT channel_id, name FROM channels WHERE server_id = ?`, {
        replacements: [serverId],
        type: QueryTypes.SELECT,
      });
      return channels;
    } catch {
      return false;
    }
  };

  getMessages = async channelId => {
    try {
      const messages = await connection.query(
        `SELECT message_id, messages.user_id, content, creation_date, users.username, users.profile_image AS avatar FROM messages 
        INNER JOIN users
        ON messages.user_id = users.user_id
        WHERE messages.channel_id = ?
        ORDER BY creation_date ASC`,
        {
          replacements: [channelId],
          type: QueryTypes.SELECT,
        }
      );

      return messages;
    } catch {
      return false;
    }
  };

  newServer = async (serverName, userId) => {
    try {
      await connection.query('INSERT INTO servers (name, creator_id) VALUES (?, ?)', {
        replacements: [serverName, userId],
        type: QueryTypes.INSERT,
      });

      const server = await connection.query('SELECT server_id FROM servers ORDER BY server_id DESC LIMIT 1', {
        type: QueryTypes.SELECT,
      });
      const serverId = server[0]['server_id'];

      await connection.query('INSERT INTO server_onboarding (user_id, server_id) VALUES (?, ?)', {
        replacements: [userId, serverId],
        type: QueryTypes.INSERT,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}
