import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: number) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export const tokenUtils = { generateToken, clearToken };

/* We include the userId in the token and set the expiration to 1 hour.
Then we set a cookie as jwt with the generated token value.
This will set the cookie in the client and for all the subsequent requests,
the cookie will be sent automatically in the header. */