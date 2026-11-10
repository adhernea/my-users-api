import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../models/requests/AuthenticatedRequest.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_fallback';

const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    req.userId = decoded.userId;
    next();
  });
};

export const tokenUtils = {
  generateToken,
  authenticateToken
};

/* We include the userId in the token and set the expiration to 1 hour.
Then we set a cookie as jwt with the generated token value.
This will set the cookie in the client and for all the subsequent requests,
the cookie will be sent automatically in the header. */