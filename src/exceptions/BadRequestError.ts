import { AppError } from "./AppError.js";
import { ErrorMessages } from "../utils/messages/ErrorMessages.js";

export class BadRequestError extends AppError {
  constructor(message: string = ErrorMessages.DEFAULT_BAD_REQUEST) {
    super(message, 400);
  }
}