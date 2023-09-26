import { NextFunction, Request, Response } from "express";
import { database } from "../DB/connexion";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { authSuccess, incorrectCredential } from "../constants/constants";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { MysqlError } from "mysql";

dotenv.config();

/**
 * Function to get all users
 */
export const getUsers = (_req: Request, res: Response, _next: NextFunction) => {
  const sql = process.env.SQl_GET_USERS!;

  database.query(sql, (err: MysqlError | null, users: User[]) => {
    if (err) res.status(400).json(err);

    res.status(200).json(users);
  });
};

/**
 * Function to get one user
 */
export const getUserById = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const sql = process.env.SQl_GET_USER_BY_ID!;

  database.query(sql, [req.params.id], (err, user: User) => {
    if (err) res.status(400).json(err);

    res.status(200).json(user);
  });
};

/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
export const signUp = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  const parameter = Object.values(req.body);
  const sql = process.env.SQl_SIGNUP!;

  // ADD DATE IN THE GOOD INDEX
  parameter.splice(3, 0, new Date());

  // ADD THE ROLE (customer by default)
  parameter.push("customer");

  database.query(sql, parameter, (err, data) => {
    if (err) res.status(500).json(err);

    res.status(200).json(data);
  });
};

/**
 * Function to login and get the token
 * @param req.body : email, password
 */
export const login = (req: Request, res: Response, _next: NextFunction) => {
  const sql = process.env.SQl_LOGIN!;

  database.query(sql, [req.body.email], async (err, data) => {
    if (err) res.status(500).json(err);

    // COMPARE PASSWORD FROM PARAMETER WITH PASSWORD IN DB
    const isValid = await bcrypt.compare(req.body.password, data[0].password);

    if (!isValid) return res.status(401).json({ message: incorrectCredential });

    // CREATE THE TOKEN WITH JWT
    const id = data[0].id;
    const token = jwt.sign({ id }, process.env.JWT_RANDOM_TOKEN!, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: authSuccess, token });
  });
};
