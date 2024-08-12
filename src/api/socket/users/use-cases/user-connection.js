import models from '../../../../config/sequelize/associations/associations.js';

const userStatus = {
  Online: 1,
  Idle: 2,
  'Do Not Disturb': 3,
  Invisible: 4,
};

export class UserConnectionUseCases {
  constructor() {
    this.models = models;
  }

  updateUserStatus = async (userId, status) => {
    try {
      await this.models.User.update({ status_id: userStatus[status] }, { where: { user_id: userId } });
      return status;
    } catch {
      return false;
    }
  };
}
