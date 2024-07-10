import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login');
authRouter.get('/check-token');
authRouter.post('/register');

export default authRouter;
