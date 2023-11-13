import dotenv from "dotenv";
import { Request, Response } from "express";
import { categoryCreated, CATEGORY_NOT_FOUND } from "../constants/constants";
import * as CategoryModel from "../models/category.model";

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
    .then((user: any) => res.status(200).json(user[0]))
    .catch(() => res.status(404).json({ message: CATEGORY_NOT_FOUND }));
};

/**
 * Function to delete one category
 * @param req.body : name, firstname, email, password
 */
export const deleteCategory = (req: Request, res: Response) => {
  CategoryModel.deleteOne(req.params)
    .then(() => getCategorys(req, res))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to add one catgeory
 * @param req.body : email, password
 */
export const addCategory = (req: Request, res: Response) => {
  console.log(req.body);

  CategoryModel.save({
    ...req.body,
    imgUrl: `${req.protocol}://${req.get("host")}/public/${req.file!.filename}`,
  })
    .then(() => getCategorys(req, res))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to update one catgeory
 * @param req.body : email, password
 */
export const updateCategory = async (req: Request, res: Response) => {
  if (req.file)
    req.body.imgUrl = `${req.protocol}://${req.get("host")}/public/${
      req.file!.filename
    }`;

  try {
    await CategoryModel.findOneAndUpdate([
      { ...req.body },
      { id: req.params.id },
    ]);

    getCategorys(req, res);
  } catch (error) {
    res.status(400).json({ error });
  }
};
