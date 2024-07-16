import { ServerSearchCases } from '../use-cases/servers-search-cases.js';

export class ServerGetController {
  constructor() {
    this.search = new ServerSearchCases();
  }

  getByUserId = async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(500).send('Error: Query params required.');

    const servers = await this.search.searchServersByUserId(userId);
    if (servers === false) return res.status(500).send('Error: SQL Query failed.');

    return res.status(200).json(servers);
  };
}
