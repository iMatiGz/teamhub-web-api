import models from '../../../../config/sequelize/associations/associations.js';

export class FriendshipServices {
  constructor() {
    this.models = models;
  }

  searchOne = async (options = {}) => {
    try {
      return await this.models.UserFriendship.findOne({ ...options, raw: true });
    } catch (error) {
      return false;
    }
  };

  searchMany = async (options = {}) => {
    try {
      return await this.models.UserFriendship.findAll({ ...options, raw: true });
    } catch (error) {
      return false;
    }
  };
}
