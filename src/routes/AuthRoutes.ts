import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { tokenUtils } from '../utils/tokenUtils';

const router = Router();

// Rutas públicas
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rutas protegidas
router.get('/check-token', tokenUtils.authenticateToken, UserController.checkToken);
router.get('/welcome', tokenUtils.authenticateToken, UserController.welcome);

export default router;