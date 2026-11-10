import { AppError } from "./AppError.js";
import { ErrorMessages } from "../utils/messages/ErrorMessages.js";

export class UnauthorizedError extends AppError {
  constructor(message: string = ErrorMessages.DEFAULT_UNAUTHORIZED) {
    super(message, 401);
  }
}