import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { tokenUtils } from '../utils/tokenUtils';
import { UserRepository } from '../repository/UserRepository';
import { UserEntity } from '../models/entities/UserEntity';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequest';
import { UserResponse } from '../models/responses/UserResponse';
import { UserService } from '../services/UserService';

export class UserController {

  static async register(req: Request, res: Response) {
    const { name, email, pwd } = req.body;

    if (!name || !email || !pwd) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
      await UserService.registerNewUser(name, email, pwd);
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

    if (!email || !pwd) {
      return res.status(400).json({ message: 'Email y contraseña requeridos.' });
    }

    try {
      const { token } = await UserService.logUser(email, pwd);
      return res.status(201).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }

  static checkToken(req: AuthenticatedRequest, res: Response) {
    return res.json({ message: `Token válido del usuario ${req.userId}.` });
  }

  static welcome(req: AuthenticatedRequest, res: Response) {

    try {
      const user = UserService.getUserById(req.userId!);

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
