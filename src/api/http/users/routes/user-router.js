import { Router } from 'express';
import { UserGetController } from '../controllers/user-get-controller.js';
import { hasSignedToken } from '../../middlewares/token-auth.js';
import { cookieSender } from '../../middlewares/cookies.js';

const userGetController = new UserGetController();

const userRouter = Router();
userRouter.get('/me/friends', hasSignedToken, userGetController.getUserFriends, cookieSender);
userRouter.get('/me/data', hasSignedToken, userGetController.getData, cookieSender);
userRouter.put('/me/edit', hasSignedToken, userGetController.setData, cookieSender);
userRouter.get('/friend-request', hasSignedToken, userGetController.friendRequest, cookieSender);

export default userRouter;
