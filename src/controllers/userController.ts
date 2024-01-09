import { Request, Response } from "express"
import { User } from "../models/User"
import { tokenUtils } from "../utils/tokenUtils"
import { userRepository } from "../repository/userRepository"

const getAllUsers = (req: Request, res: Response) => res.status(200).json(userRepository.getAllUsers())

const registerUser = async (req: Request, res: Response) => {
  if (req.body == undefined) {
    res.status(400).json({ message: "Request body not found" })
    return
  }

  if (!req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email')) {
    res.status(400).json({ message: "Request body incomplete" })
    return
  }

  const { name, email, password } = req.body
  const userExists = userRepository.userExists(name, email)

  if (userExists) {
    res.status(400).json({ message: "The username or email is already registered" })
    return
  }

  const newUser: User = await userRepository.saveNewUser(name, email, password)

  if (newUser) {
    tokenUtils.generateToken(res, newUser.id)
    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email })
  } else {
    res.status(400).json({ message: "An error occurred in creating the user" })
  }
}

const authenticateUser = async (req: Request, res: Response) => {

  if (req.body == undefined) {
    res.status(400).json({ message: "Request body not found" })
    return
  }

  if (!req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('name')) {
    res.status(400).json({ message: "Request body incomplete" })
    return
  }

  const { name, password } = req.body
  const user = userRepository.findUserByName(name)
  if (user != undefined && await userRepository.checkPassword(password, user.hashedPwd)) {
    tokenUtils.generateToken(res, user.id)
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401).json({ message: "User not found / password incorrect" })
  }
}

const logoutUser = (req: Request, res: Response) => {
  tokenUtils.clearToken(res);
  res.status(200).json({ message: "User logged out" });
}

export const userController = { getAllUsers, registerUser, authenticateUser, logoutUser }