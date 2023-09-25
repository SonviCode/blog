import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { incorrectToken } from "../constants/constants";

interface JwtPayload {
  id: string;
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_RANDOM_TOKEN!
    ) as JwtPayload;
    const id = decodedToken.id;
    Object.assign(req, { auth: id });

    next();
  } catch (error) {
    res.status(401).json({ message: incorrectToken });
  }
};