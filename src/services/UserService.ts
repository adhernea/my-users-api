import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository.js";
import { UserResponse } from "../models/responses/UserResponse.js";
import { tokenUtils } from "../utils/tokenUtils.js";
import { ErrorMessages } from "../utils/messages/ErrorMessages.js";
import { ConflictError } from "../exceptions/ConflictError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js";

export class UserService {

    static async registerNewUser(name: string, email: string, password: string): Promise<number> {
        const existingUser = UserRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictError(ErrorMessages.EMAIL_CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return UserRepository.createUser(name, email, hashedPassword);
    }

    static async logUser(email: string, password: string): Promise<{ token: string; user: UserResponse }> {
        const user = UserRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError(ErrorMessages.CREDENTIALS_CONFLICT);
        }

        const token = tokenUtils.generateToken(user.id);

        const userResponse = { ...user };
        delete (userResponse as any).password;

        return { token, user: userResponse };
    }

    static getUserById(id: number): UserResponse | null {
        const user = UserRepository.findById(id);
        if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);

        const { ...userResponse } = user;
        return userResponse;
    }
}