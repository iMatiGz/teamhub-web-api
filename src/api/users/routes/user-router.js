import { Router } from 'express';
import { UserGetController } from '../controllers/user-get-controller.js';

const userGetController = new UserGetController();

const userRouter = Router();
userRouter.get('/test', userGetController.test);

export default userRouter;
