import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { database } from "../DB/connexion";
import {
  authSuccess,
  incorrectCredential,
  userCreated,
  userNotFound,
} from "../constants/constants";
import * as UserModel from "../models/user.model";
import { UserInterface } from "../models/user.model";

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
    .catch((error) => res.status(500).json({ error }));
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
        return res.status(401).json({ message: incorrectCredential });

      // CREATE THE TOKEN WITH JWT
      const id = user.id;
      const token = jwt.sign({ id }, process.env.JWT_RANDOM_TOKEN!, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: authSuccess, token });
    })
    .catch(() => res.status(404).json({ message: userNotFound }));
};
