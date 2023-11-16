import { NextFunction, Request, Response } from "express";
import { INVALID_PAYLOAD } from "../constants/constants";

/**
 * Middleware to check if the payload of a request if empty
 */
export const checkPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Object.entries(req.body).forEach(([key]) => {
      const value = req.body[key];

      if (value.trim() === "") throw new Error();
    });

    next();
  } catch (e) {
    res.status(400).json({ message: INVALID_PAYLOAD });
  }
};
