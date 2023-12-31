import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  AUTH_SUCCESS,
  INCORRECT_CREDENTIAL,
  SIGNUP_BAD_REQUEST,
  USER_NOT_FOUND,
  USER_LOGOUT,
} from "../constants/constants";
import * as UserModel from "../models/user.model";
import { checkUserPayload } from "../service/checkPayload.service";

dotenv.config();

/**
 * Function to get all users
 */
export const getUsers = (_req: Request, res: Response) => {
  UserModel.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to get one user
 * @param req.param : number corresponding to the id to retrieve
 */
export const getUserById = (req: Request, res: Response) => {
  UserModel.findOne({ id: req.params.id })
    .then((user: any) => res.status(200).json(user[0]))
    .catch(() => res.status(404).json({ message: USER_NOT_FOUND }));
};

/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
export const signUp = (req: Request, res: Response) => {
  // if an image is provided, set this, else set an empty string
  const imgUser = req.file
    ? `${req.protocol}://${req.get("host")}/public/${req.file!.filename}`
    : "";

  UserModel.save({
    ...req.body,
    imgUser,
  })
    .then(() => login(req, res))
    .catch(() => res.status(400).json({ message: SIGNUP_BAD_REQUEST }));
};

/**
 * Function to login and get the token
 * @param req.body : email, password
 */
export const login = (req: Request, res: Response) => {
  UserModel.findOne({ email: req.body.email })
    .then(async (user: any) => {
      if (user[0].length === 0) throw new Error();

      const isValid = await bcrypt.compare(req.body.password, user[0].password);

      if (!isValid)
        return res.status(403).json({ message: INCORRECT_CREDENTIAL });

      // CREATE THE TOKEN WITH JWT
      const id = user[0].id;
      const role = user[0].role;
      const token = jwt.sign({ id, role }, process.env.JWT_RANDOM_TOKEN!, {
        expiresIn: "1h",
      });

      res
        .cookie("jwt_token", token, {
          httpOnly: true, // Impossible to get in the frontend
          secure: false, // SSL certificate
          maxAge: 3600000, // validity period of the token ( in seconds )
        })
        .status(200)
        .json({ message: AUTH_SUCCESS, token, id });
    })
    .catch(() => res.status(403).json({ message: INCORRECT_CREDENTIAL }));
};

/**
 * Function to update data of user
 * @param req.body : content of user to update
 */
export const updateUser = (req: Request, res: Response) => {
  const imgUser = req.file
    ? `${req.protocol}://${req.get("host")}/public/${req.file!.filename}`
    : "";

  try {
    checkUserPayload(req.body);
  } catch (error) {
    res.status(400).json({ error });
    return;
  }

  UserModel.findOneAndUpdate([{ ...req.body, imgUser }, { id: req.params.id }])
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * Function to logout, it clear the cookies
 */
export const logout = (_req: Request, res: Response) => {
  res
    .cookie("jwt_token", "", {
      httpOnly: true,
      secure: false,
      maxAge: -1,
    })
    .status(200)
    .json({ message: USER_LOGOUT });
};

/**
 * Function call the first time on the page to know if your session is currently good
 * before that, we call the middleware checkToken, so the error (if the user is not connected)
 * is catch before this controller
 */
export const checkCookies = (req: Request, res: Response) => {
  res.status(200).json({ id: req.auth });
};
