import models from '../../../config/sequelize/associations/associations.js';
import { connection } from '../../../config/sequelize/connection.js';

export class UserService {
  constructor() {
    this.sql = connection;
  }

  searchAll = async () => {
    const users = this.sql.transaction(async t => {
      const result = await models.User.findAll({ include: 'server' });

      return result;
    });
    return users;
  };
}
