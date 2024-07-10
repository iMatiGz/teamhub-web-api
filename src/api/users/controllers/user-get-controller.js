import { UserService } from '../services/user-services.js';

export class UserGetController {
  userService = new UserService();

  test = async (req, res) => {
    const result = await this.userService.searchAll();

    return res.json(result);
  };
}
