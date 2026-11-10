import { Request, Response } from 'express';
import { logMessage } from '../utils/logger.js';
import { UserService } from '../services/UserService.js';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequest.js';
import { ErrorMessages } from '../utils/messages/ErrorMessages.js';
import { BadRequestError } from '../exceptions/BadRequestError.js';
import { SuccessfulMessages } from '../utils/messages/SuccessfulMessages.js';

export class UserController {

  // POST /register
  static async register(req: Request, res: Response) {
    const { fullName, email, pwd } = req.body;
    logMessage('Register', `Intento de registro para ${fullName} (${email})`);

    if (!fullName || !email || !pwd) {
      throw new BadRequestError(ErrorMessages.DEFAULT_BAD_REQUEST);
    }

    await UserService.registerNewUser(fullName, email, pwd);
    return res.status(201).json({ message: SuccessfulMessages.USER_REGISTERED });
  }

  //POST Login
  static async login(req: Request, res: Response) {
    const { email, pwd } = req.body;
    logMessage('Register', `Intento de login para ${email}`);

    if (!email || !pwd) {
      throw new BadRequestError(ErrorMessages.BAD_REQUEST_LOGIN);
    }

    const { token, user } = await UserService.logUser(email, pwd);
    return res.status(201).json({ message: SuccessfulMessages.USER_LOGGED, token, user });
  }

  // GET /check-token
  static checkToken(req: AuthenticatedRequest, res: Response) {
    logMessage('Check Token', `Intento de usuario`);
    return res.json({ message: SuccessfulMessages.buildValidToken(req.userId!) });
  }

  // Get /welcome
  static welcome(req: AuthenticatedRequest, res: Response) {
    const user = UserService.getUserById(req.userId!);
    logMessage('Welcome', `Bienvenida para ${user!.name}`);

    return res.json({
      message: SuccessfulMessages.buildWelcome(user!.name)
    });
  }
}
