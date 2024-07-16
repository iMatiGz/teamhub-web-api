import { Router } from 'express';
import { ServerGetController } from '../controllers/server-get-controller.js';
import { hasSignedToken } from '../../middlewares/token-auth.js';
import { cookieSender } from '../../middlewares/cookies.js';

const serverGetController = new ServerGetController();

const serverRouter = Router();
serverRouter.get('/', hasSignedToken, serverGetController.getByUserId, cookieSender);

export default serverRouter;
