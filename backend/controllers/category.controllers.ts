import dotenv from "dotenv";
import { Request, Response } from "express";
import * as CategoryModel from "../models/category.model";
import {
  categoryCreated,
  categoryDeleted,
  categoryNotFound,
} from "../constants/constants";

dotenv.config();

/**
 * Function to get all categorys
 */
export const getCategorys = (_req: Request, res: Response) => {
  CategoryModel.find()
    .then((categorys) => res.status(200).json({ categorys }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to get one user
 * @param req.param : number corresponding to the id to retrieve
 */
export const getCategoryById = (req: Request, res: Response) => {
  CategoryModel.findOne({ id: parseInt(req.params.id) })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({ message: categoryNotFound }));
};

/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
export const deleteCategory = (req: Request, res: Response) => {
  CategoryModel.findOne({ id: parseInt(req.params.id) })
    .then(() => res.status(201).json({ message: categoryDeleted }))
    .catch((error) => res.status(500).json({ error }));
};

/**
 * Function to login and get the token
 * @param req.body : email, password
 */
export const addCategory = (req: Request, res: Response) => {
  console.log(req.body);

  CategoryModel.save({ ...req.body })
    .then(() => res.status(201).json({ message: categoryCreated }))
    .catch((error) => res.status(500).json({ error }));
};
