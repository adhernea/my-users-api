import { AppError } from "./AppError.js";
import { ErrorMessages } from "../utils/messages/ErrorMessages.js";

export class ConflictError extends AppError {
  constructor(message: string = ErrorMessages.DEFAULT_CONFLICT) {
    super(message, 409);
  }
}