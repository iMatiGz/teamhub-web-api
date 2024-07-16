import { AuthServices } from '../services/auth-services.js';

export class AuthSearchCases {
  constructor() {
    this.sql = new AuthServices();
  }

  searchUserByCredentials = async (email, password) => {
    const user = await this.sql.searchOne({
      where: {
        email: email,
        password: password,
      },
    });
    return user;
  };
}
