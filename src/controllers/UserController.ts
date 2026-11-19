import { Request, Response } from 'express';
import { logMessage } from '../utils/logger.js';
import { UserService } from '../services/UserService.js';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequest.js';
import { ErrorMessages } from '../utils/messages/ErrorMessages.js';
import { BadRequestError } from '../exceptions/BadRequestError.js';
import { SuccessfulMessages } from '../utils/messages/SuccessfulMessages.js';
import { Validations } from '../utils/messages/Validations.js';

export class UserController {

  // POST /users/register
  static async register(req: Request, res: Response) {
    const { fullName, email, pwd } = req.body;
    logMessage('Register', `Intento de registro para ${fullName} (${email})`);

    if (!fullName || !email || !pwd) {
      throw new BadRequestError(ErrorMessages.DEFAULT_BAD_REQUEST);
    }

    if (!Validations.EMAIL_REGEX.test(email.trim())) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_EMAIL);
    }

    await UserService.registerNewUser(fullName.trim(), email.trim(), pwd);
    return res.status(201).json({ message: SuccessfulMessages.USER_REGISTERED });
  }

  // POST /users/login
  static async login(req: Request, res: Response) {
    const { email, pwd } = req.body;
    logMessage('Login', `Intento de login para ${email}`);

    if (!email || !pwd) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_LOGIN);
    }

    if (!Validations.EMAIL_REGEX.test(email.trim())) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_EMAIL);
    }

    const { token, user } = await UserService.logUser(email.trim(), pwd);
    return res.json({ message: SuccessfulMessages.USER_LOGGED, token, user });
  }

  // GET /users/check-token
  static checkToken(req: AuthenticatedRequest, res: Response) {
    logMessage('Check Token', `Intento de usuario`);
    return res.json({ message: SuccessfulMessages.buildValidToken(req.userId!) });
  }

  // Get /users/welcome
  static welcome(req: AuthenticatedRequest, res: Response) {
    const user = UserService.getUserById(req.userId!);
    logMessage('Welcome', `Bienvenida para ${user!.name}`);

    return res.json({
      message: SuccessfulMessages.buildWelcome(user!.name)
    });
  }
}
