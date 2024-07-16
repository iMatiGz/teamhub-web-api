import models from '../../../config/sequelize/associations/associations.js';

export class AuthServices {
  constructor() {
    this.models = models;
  }

  searchOne = async (options = {}) => {
    try {
      return await this.models.User.findOne({ ...options, raw: true });
    } catch (error) {
      return false;
    }
  };
}
