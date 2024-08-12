import { UserSearchCases } from '../use-cases/user-search-cases.js';

export class UserGetController {
  constructor() {
    this.search = new UserSearchCases();
  }

  test = async (req, res) => {
    const result = await this.search.userById(10);
    return res.json(result);
  };

  getUserFriends = async (req, res, next) => {
    const user = res.locals.user || null;

    const friends = await this.search.userFriends(user.userId);
    if (friends === false) {
      res.status(500);
      next();
    }
    if (friends.length === 0) {
      res.status(204);
      next();
    }

    res.locals.response = { data: friends };
    res.status(200);
    next();
  };

  getData = async (req, res, next) => {
    const user = res.locals.user || null;

    const data = await this.search.getData(user.userId);
    if (data === false) {
      res.status(500);
      next();
    }

    res.locals.response = { data: data };
    res.status(200);
    next();
  };

  setData = async (req, res, next) => {
    const user = res.locals.user || null;
    const { field, value } = req.body;

    const changes = await this.search.setData(field, value, user.userId);
    if (changes === false) {
      res.status(500);
      next();
    }

    res.status(200);
    next();
  };

  friendRequest = async (req, res, next) => {
    const user = res.locals.user || null;
    const { username } = req.query;
    if (!username) return res.status(500).send('Error: Query params required.');

    const query = await this.search.friendRequest(username, user.userId);
    if (query === false) {
      res.status(500);
      next();
    }

    res.locals.response = { data: query };
    res.status(200);
    next();
  };
}
