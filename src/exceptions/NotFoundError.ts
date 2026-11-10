import { AppError } from "./AppError.js";
import { ErrorMessages } from "../utils/messages/ErrorMessages.js";

export class NotFoundError extends AppError {
  constructor(message: string = ErrorMessages.DEFAULT_NOT_FOUND) {
    super(message, 404);
  }
}