import { Router } from 'express';
import { ServerGetController } from '../controllers/server-get-controller.js';

const serverGetController = new ServerGetController();

const serverRouter = Router();
serverRouter.get('/', serverGetController.getByUserId.bind(serverGetController));

export default serverRouter;
