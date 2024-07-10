import models from '../../../config/sequelize/associations/associations.js';
import { connection } from '../../../config/sequelize/connection.js';

export class ServerServices {
  constructor() {
    this.sql = connection;
  }

  searchByUserId = async userId => {
    try {
      return await models.Server.findAll({
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: [],
            where: { user_id: userId },
            through: { attributes: [] },
          },
        ],
      });
    } catch (err) {
      return false;
    }
  };
}
