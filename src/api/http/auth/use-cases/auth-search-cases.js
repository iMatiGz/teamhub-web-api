import { QueryTypes } from 'sequelize';
import models from '../../../../config/sequelize/associations/associations.js';
import { connection } from '../../../../config/sequelize/connection.js';
import { AuthServices } from '../services/auth-services.js';

export class AuthSearchCases {
  constructor() {
    this.sql = new AuthServices();
    this.models = models;
  }

  searchUserByCredentials = async (email, password) => {
    const user = await this.sql.searchOne({
      include: [
        {
          model: this.models.UserStatus,
          as: 'status',
          attributes: ['name'],
        },
      ],
      attributes: ['user_id', 'username', 'email', 'profile_image'],
      where: {
        email: email,
        password: password,
      },
    });
    return user;
  };

  registerUser = async (username, email, password) => {
    try {
      const user = await connection.query('SELECT user_id FROM users WHERE username = ? OR email = ?', {
        replacements: [username, email],
        type: QueryTypes.SELECT,
      });

      if (user.length > 0) return true;

      await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', {
        replacements: [username, email, btoa(password)],
        type: QueryTypes.INSERT,
      });

      return null;
    } catch {
      return false;
    }
  };
}
