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
  ArticleModel.findOne(req.params.id)
    .then((article: any) => res.status(200).json(article[0]))
    .catch((e) => res.status(404).json({ message: articleNotFound, e}));
};

/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
export const deleteArticle = (req: Request, res: Response) => {
  ArticleModel.deleteOne({ id: req.params.id })
    .then(() => getArticles(req, res))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to add an article
 * @param req.body : title, author and content
 */
export const addArticle = (req: Request, res: Response) => {
  ArticleModel.save({
    ...req.body,
    imagePresentation: `${req.protocol}://${req.get("host")}/public/${
      req.file!.filename
    }`,
  })
    .then(() => getArticles(req, res))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to update one catgeory
 * @param req.body : email, password
 */
export const updateArticle = async (req: Request, res: Response) => {
  console.log(req.file);

  if (req.file)
    req.body.imagePresentation = `${req.protocol}://${req.get("host")}/public/${
      req.file.filename
    }`;

  try {
    await ArticleModel.findOneAndUpdate([
      { ...req.body },
      { id: req.params.id },
    ]);

    getArticles(req, res);
  } catch (error) {
    res.status(400).json({ error });
  }
};
