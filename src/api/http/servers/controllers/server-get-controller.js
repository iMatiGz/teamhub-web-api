import { ServerSearchCases } from '../use-cases/servers-search-cases.js';

export class ServerGetController {
  constructor() {
    this.search = new ServerSearchCases();
  }

  getByUserId = async (req, res, next) => {
    const { userId } = req.query;
    if (!userId) return res.status(500).send('Error: Query params required.');

    const servers = await this.search.searchServersByUserId(userId);
    if (servers === false) return res.status(500).send('Error: SQL Query failed.');

    if (servers.length === 0) {
      res.status(204);
      next();
    }

    res.locals.response = { data: servers };
    res.status(200);
    next();
  };

  getChannels = async (req, res, next) => {
    const { serverId } = req.query;
    if (!serverId) return res.status(500).send('Error: Query params required.');

    const channels = await this.search.getChannels(serverId);
    if (channels === false) return res.status(500).send('Error: SQL Query failed.');

    if (channels.length === 0) {
      res.status(204);
      next();
    }

    res.locals.response = { data: channels };
    res.status(200);
    next();
  };

  getMessages = async (req, res, next) => {
    const { channelId } = req.query;
    if (!channelId) return res.status(500).send('Error: Query params required.');

    const messages = await this.search.getMessages(channelId);
    if (messages === false) return res.status(500).send('Error: SQL Query failed.');

    if (messages.length === 0) {
      res.status(204);
      next();
    }

    res.locals.response = { data: messages };
    res.status(200);
    next();
  };

  newServer = async (req, res, next) => {
    const user = res.locals.user || null;
    const { serverName } = req.body;

    const query = await this.search.newServer(serverName, user.userId);
    if (query === false) return res.status(500).send('Error: SQL Query failed.');

    res.locals.response = { data: query };
    res.status(200);
    next();
  };
}
