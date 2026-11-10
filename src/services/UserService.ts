import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository.js";
import { UserResponse } from "../models/responses/UserResponse.js";
import { tokenUtils } from "../utils/tokenUtils.js";

export class UserService {

    static async registerNewUser(name: string, email: string, password: string): Promise<number> {
        const existingUser = UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('EMAIL_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return UserRepository.createUser(name, email, hashedPassword);
    }

    static async logUser(email: string, password: string): Promise<{ token: string; user: UserResponse }> {
        const user = UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const token = tokenUtils.generateToken(user.id);

        const userResponse = { ...user };
        delete (userResponse as any).password;

        return { token, user: userResponse };
    }

    static getUserById(id: number): UserResponse | null {
        const user = UserRepository.findById(id);
        if (!user) throw new Error('NO_USER');

        const { ...userResponse } = user;
        return userResponse;
    }
}