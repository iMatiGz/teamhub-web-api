import { UserSearchCases } from '../use-cases/user-search-cases.js';

export class UserGetController {
  constructor() {
    this.search = new UserSearchCases();
  }

  test = async (req, res) => {
    const result = await this.search.searchUserById(10);
    return res.json(result);
  };
}
