import models from '../../../../config/sequelize/associations/associations.js';

export class ServerServices {
  constructor() {
    this.models = models;
  }

  searchOne = async (options = {}) => {
    try {
      return await this.models.Server.findAll({ ...options, raw: true });
    } catch (err) {
      return false;
    }
  };
}
