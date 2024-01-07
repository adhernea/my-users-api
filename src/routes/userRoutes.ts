import express from "express";
import { userController } from "../controllers/userController";

const userRoutes = express.Router();

const ENDPOINT_PREFIX = '/users'

userRoutes.get(`${ENDPOINT_PREFIX}/all`, userController.getAllUsers);
userRoutes.post(`${ENDPOINT_PREFIX}/register`, userController.registerUser);
userRoutes.post(`${ENDPOINT_PREFIX}/login`, userController.authenticateUser);
userRoutes.post(`${ENDPOINT_PREFIX}/logout`, userController.logoutUser);

export default userRoutes;