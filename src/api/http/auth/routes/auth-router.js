import { Router } from 'express';
import { AuthGetController } from '../controllers/auth-get-controller.js';
import { cookieSender } from '../../middlewares/cookies.js';
import { hasSignedToken } from '../../middlewares/token-auth.js';

const authGetController = new AuthGetController();

const authRouter = Router();

authRouter.get('/login', authGetController.loginUser, cookieSender);
authRouter.get('/check-token', hasSignedToken, authGetController.checkToken, cookieSender);
authRouter.post('/register', authGetController.registerUser);

export default authRouter;
