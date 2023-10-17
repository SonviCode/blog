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
    .then((categorys) => res.status(200).json(categorys))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to get one category by the name
 * @param req.param : string corresponding to the name to retrieve
 */
export const getCategoryByName = (req: Request, res: Response) => {
  CategoryModel.findOne(req.params)
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({ message: categoryNotFound }));
};

/**
 * Function to delete one category
 * @param req.body : name, firstname, email, password
 */
export const deleteCategory = (req: Request, res: Response) => {
  console.log(req.params);

  CategoryModel.deleteOne(req.params)
    .then(() => res.status(201).json({ message: categoryDeleted }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to add one catgeory
 * @param req.body : email, password
 */
export const addCategory = (req: Request, res: Response) => {
  CategoryModel.save({
    ...req.body,
    imgUrl: `${req.protocol}://${req.get("host")}/public/${req.file!.filename}`,
  })
    .then(() => res.status(201).json({ message: categoryCreated }))
    .catch((error) => res.status(400).json({ error }));
};
