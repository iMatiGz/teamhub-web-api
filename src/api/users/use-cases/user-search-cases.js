import models from '../../../config/sequelize/associations/associations.js';
import { UserServices } from '../services/user-services.js';

export class UserSearchCases {
  constructor() {
    this.sql = new UserServices();
    this.models = models;
  }

  searchUserById = async userId => {
    const user = await this.sql.searchOne({
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
}
