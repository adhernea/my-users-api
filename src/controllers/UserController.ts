import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequest';
import { UserService } from '../services/UserService';
import { logMessage } from '../utils/logger';

export class UserController {

  static async register(req: Request, res: Response) {
    const { fullName, email, pwd } = req.body;

    logMessage('Register', `Intento de registro para ${fullName} (${email})`);

    if (!fullName || !email || !pwd) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
      await UserService.registerNewUser(fullName, email, pwd);
      return res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error: any) {
      if (error.message === 'EMAIL_EXISTS') {
        return res.status(409).json({ message: 'Este correo electrónico ya está registrado.' });
      }
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, pwd } = req.body;

    logMessage('Register', `Intento de login para ${email}`);

    if (!email || !pwd) {
      return res.status(400).json({ message: 'Email y contraseña requeridos.' });
    }

    try {
      const { token, user } = await UserService.logUser(email, pwd);
      return res.status(201).json({ message: 'Inicio de sesión exitoso', token, user });
    } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }

  static checkToken(req: AuthenticatedRequest, res: Response) {
    logMessage('Check Token', `Intento de usuario`);
    return res.json({ message: `Token válido del usuario ${req.userId}.` });
  }

  static welcome(req: AuthenticatedRequest, res: Response) {

    try {
      const user = UserService.getUserById(req.userId!);
      logMessage('Welcome', `Mensaje para ${user!.name}`);

      return res.json({
        message: `¡Bienvenido a la aplicación, ${user!.name}!`
      });
    } catch (error: any) {
      if (error.message === 'NO_USER') {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(500).json({
        message: 'Error interno del servidor.'
      });

    }
  }
}
