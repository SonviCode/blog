import { NextFunction, Request, Response } from "express";
import { database } from "../DB/database";
import { emailAlreadyUse, emailNotFound } from "../constants/constants";

/**
 * Middleware to check if the email already exist - when the user want to sign up
 */
export const checkIfEmailAlreadyExist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sql = process.env.SQL_CHECK_EMAIL!;

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: emailNotFound });

  database.query(sql, email, (err, rows) => {
    if (err) return res.status(500).json(err);

    if (rows.length > 0)
      return res.status(401).json({ message: emailAlreadyUse });

    next();
  });
};
