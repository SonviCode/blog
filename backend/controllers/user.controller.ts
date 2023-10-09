import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  authSuccess,
  incorrectCredential,
  userCreated,
  userNotFound,
} from "../constants/constants";
import * as UserModel from "../models/user.model";

dotenv.config();

/**
 * Function to get all users
 */
export const getUsers = (_req: Request, res: Response) => {
  UserModel.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to get one user
 * @param req.param : number corresponding to the id to retrieve
 */
export const getUserById = (req: Request, res: Response) => {
  UserModel.findOne({ id: parseInt(req.params.id) })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({ message: userNotFound }));
};

/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
export const signUp = (req: Request, res: Response) => {
  UserModel.save({ ...req.body })
    .then(() => res.status(201).json({ message: userCreated }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to login and get the token
 * @param req.body : email, password
 */
export const login = (req: Request, res: Response) => {
  UserModel.findOne({ email: req.body.email })
    .then(async (user: any) => {
      const isValid = await bcrypt.compare(req.body.password, user.password);

      if (!isValid)
        return res.status(403).json({ message: incorrectCredential });

      // CREATE THE TOKEN WITH JWT
      const id = user.id;
      const role = user.role;
      const token = jwt.sign({ id, role }, process.env.JWT_RANDOM_TOKEN!, {
        expiresIn: "1h",
      });

      res
        .cookie("jwt_token", token, {
          httpOnly: true, // Impossible de le recupérer en JS avec document.cookie
          secure: false, // certificat SSL
          maxAge: 3600000, // durée de validité du token, en secondes
        })
        .status(200)
        .json({ message: authSuccess, token, id });
    })
    .catch(() => res.status(403).json({ message: incorrectCredential }));
};

/**
 * Function to login and get the token
 * @param req.body
 */
export const updateUser = (req: Request, res: Response) => {
  UserModel.findOneAndUpdate([{ ...req.body }, { id: parseInt(req.params.id) }])
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

export const checkCookies = (req: Request, res: Response) => {
  console.log(req.auth);

  res.status(200).json({ id: req.auth });
};
