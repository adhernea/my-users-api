import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { tokenUtils } from '../utils/tokenUtils.js';

const authRouter = Router();

// Rutas públicas
authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);

// Rutas protegidas
authRouter.get('/check-token', tokenUtils.authenticateToken, UserController.checkToken);
authRouter.get('/welcome', tokenUtils.authenticateToken, UserController.welcome);

export default authRouter;