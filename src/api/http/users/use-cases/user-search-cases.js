import { QueryTypes } from 'sequelize';
import models from '../../../../config/sequelize/associations/associations.js';
import { connection } from '../../../../config/sequelize/connection.js';
import { FriendshipServices } from '../services/friendship-services.js';
import { UserServices } from '../services/user-services.js';

export class UserSearchCases {
  constructor() {
    this.user = new UserServices();
    this.friendship = new FriendshipServices();
    this.models = models;
  }

  userById = async userId => {
    const user = await this.user.searchOne({
      include: [
        {
          model: models.UserStatus,
          as: 'status',
          attributes: ['name'],
        },
      ],
      where: { user_id: userId },
    });
    return user;
  };

  userFriends = async userId => {
    const user = await this.friendship.searchMany({
      where: { user_id: userId },
      attributes: [],
      include: [
        {
          model: this.models.User,
          as: 'friend',
          attributes: ['user_id', 'username', 'profile_image'],
          include: [
            {
              model: this.models.UserStatus,
              as: 'status',
              attributes: ['name', 'description'],
            },
          ],
        },
      ],
    });
    return user.map(res => {
      return {
        user_id: res['friend.user_id'],
        username: res['friend.username'],
        profile_image: res['friend.profile_image'],
        status_name: res['friend.status.name'],
        status_description: res['friend.status.description'],
      };
    });
  };

  getData = async userId => {
    try {
      const data = await connection.query(`SELECT username, email, password FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.SELECT,
      });

      return data[0];
    } catch {
      return false;
    }
  };

  setData = async (field, value, userId) => {
    try {
      if (field === 'username')
        await connection.query(`UPDATE users SET username = ? WHERE user_id = ?`, {
          replacements: [value, userId],
          type: QueryTypes.UPDATE,
        });

      if (field === 'email')
        await connection.query(`UPDATE users SET email = ? WHERE user_id = ?`, {
          replacements: [value, userId],
          type: QueryTypes.UPDATE,
        });

      if (field === 'password')
        await connection.query(`UPDATE users SET password = ? WHERE user_id = ?`, {
          replacements: [atob(value), userId],
          type: QueryTypes.UPDATE,
        });

      return true;
    } catch {
      return false;
    }
  };

  friendRequest = async (username, userId) => {
    try {
      const receiver = await connection.query('SELECT user_id FROM users WHERE username = ?', {
        replacements: [username],
        type: QueryTypes.SELECT,
      });

      if (!receiver || receiver.length === 0) return false;
      const receiverId = receiver[0]['user_id'];
      await connection.query(`INSERT INTO pending_friendships (sender_id, receiver_id) VALUES (?, ?)`, {
        replacements: [userId, receiverId],
        type: QueryTypes.INSERT,
      });

      return 'Petición enviada';
    } catch {
      return false;
    }
  };
}
