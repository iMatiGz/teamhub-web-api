import models from '../../../config/sequelize/associations/associations.js';
import { ServerServices } from '../services/server-services.js';

export class ServerSearchCases {
  constructor() {
    this.sql = new ServerServices();
    this.models = models;
  }

  searchServersByUserId = async userId => {
    const servers = await this.sql.searchOne({
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: [],
          where: { user_id: userId },
          through: { attributes: [] },
        },
      ],
      limit: 10,
    });
    return servers;
  };
}
