import { Router } from 'express';
import { ServerGetController } from '../controllers/server-get-controller.js';
import { hasSignedToken } from '../../middlewares/token-auth.js';
import { cookieSender } from '../../middlewares/cookies.js';

const serverGetController = new ServerGetController();

const serverRouter = Router();
serverRouter.get('/', hasSignedToken, serverGetController.getByUserId, cookieSender);
serverRouter.get('/channels', hasSignedToken, serverGetController.getChannels, cookieSender);
serverRouter.get('/channels/messages', hasSignedToken, serverGetController.getMessages, cookieSender);
serverRouter.post('/new', hasSignedToken, serverGetController.newServer, cookieSender);

export default serverRouter;
