import dotenv from "dotenv";
import { Request, Response } from "express";
import { articleCreated, articleNotFound } from "../constants/constants";
import * as ArticleModel from "../models/article.model";

dotenv.config();

/**
 * Function to get all articles
 */
export const getArticles = (_req: Request, res: Response) => {
  ArticleModel.find()
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to get one article
 * @param req.param : number corresponding to the id to retrieve
 */
export const getArticleById = (req: Request, res: Response) => {
  console.log(req.params);

  ArticleModel.findOne({ id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({ message: articleNotFound }));
};

// /**
//  * Function to sign up = create an user
//  * @param req.body : name, firstname, email, password
//  */
// export const deleteCategory = (req: Request, res: Response) => {
//   CategoryModel.findOne({ id: parseInt(req.params.id) })
//     .then(() => res.status(201).json({ message: categoryDeleted }))
//     .catch((error) => res.status(400).json({ error }));
// };

/**
 * Function to add an article
 * @param req.body : title, author and content
 */
export const addArticle = (req: Request, res: Response) => {
  console.log(req.body);

  ArticleModel.save({
    ...req.body,
    imagePresentation: `${req.protocol}://${req.get("host")}/public/${
      req.file!.filename
    }`,
  })
    .then(() => res.status(201).json({ message: articleCreated }))
    .catch((error) => res.status(400).json({ error }));
};
