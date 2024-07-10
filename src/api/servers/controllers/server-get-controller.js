import { ServerServices } from '../services/server-services.js';

export class ServerGetController {
  constructor() {
    this.sqlQuery = new ServerServices();
  }

  getByUserId = async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(500).send('Error: Query params required.');

    const servers = await this.sqlQuery.searchByUserId(userId);
    if (servers === false) return res.status(500).send('Error: SQL Query failed.');

    return res.status(200).json(servers);
  };
}
