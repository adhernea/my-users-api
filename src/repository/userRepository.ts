import bcrypt from "bcryptjs"
import { User } from "../models/User"

const _usersData: User[] = [
  { id: 0, name: 'Teacher', email: 'teacher@salesianos-lacuesta.net', hashedPwd: '$2a$10$QybD3oge88KNvzBWe3sU1ux0Kq23OpGeNk6poSZRQTFP.vHPnRx5O' }, // contra123
  { id: 1, name: 'Tester', email: 'tester@salesianos-lacuesta.net', hashedPwd: '$2a$10$8J039FHL0fYojZ0fUaEft.99jb9U3rwdH0/GCkEKAvLUU0Iq54Emu' } // tester
]

const getAllUsers = (): User[] => _usersData

const findUserByName = (username: string): User | undefined => _usersData.find((user: User) => (user.name === username))

const userExists = (username: string, email: string): boolean => {
  return _usersData.some((user: User) => (user.name === username || user.email === email))
}

const saveNewUser = async (username: string, email: string, pwd: string): Promise<User> => {
  const newUser: User = {
    id: _usersData.length,
    name: username,
    email,
    hashedPwd: await _hashPassword(pwd)
  }
  _usersData.push(newUser)

  console.log(newUser) // Intentional
  return newUser
}

const _hashPassword = async (pwd: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(pwd, salt)
}


const checkPassword = async (pwd: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(pwd, hash)
}

export const userRepository = {
  getAllUsers,
  findUserByName,
  userExists,
  saveNewUser,
  checkPassword
}