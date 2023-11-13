import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { INCORRECT_TOKEN } from "../constants/constants";

interface JwtPayload {
  id: string;
  role: string;
}

/**
 * Middleware to check if the token is corresponding to admin
 */
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt_token;

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_RANDOM_TOKEN!
    ) as JwtPayload;
    const id = decodedToken.id;
    Object.assign(req, { auth: id });

    const role = decodedToken.role;

    if (role !== "admin") throw new Error();

    next();
  } catch (error) {
    res.status(401).json({ message: INCORRECT_TOKEN });
  }
};
