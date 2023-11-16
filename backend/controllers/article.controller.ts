import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  ARTICLE_BAD_REQUEST,
  ARTICLE_CREATED,
  ARTICLE_NOT_FOUND,
} from "../constants/constants";
import * as ArticleModel from "../models/article.model";

dotenv.config();

/**
 * Function to get all articles
 */
export const getArticles = (_req: Request, res: Response) => {
  ArticleModel.find()
    .then((articles) => res.status(200).json(articles))
    .catch(() => res.status(400).json({ message: ARTICLE_BAD_REQUEST }));
};

/**
 * Function to get one article
 * @param req.param : number corresponding to the id to retrieve
 */
export const getArticleById = (req: Request, res: Response) => {
  ArticleModel.findBy({ "article.id": req.params.id })
    .then((article: any) => {
      if (article.length === 0) throw new Error();

      res.status(200).json(article[0]);
    })
    .catch(() => res.status(404).json({ message: ARTICLE_NOT_FOUND }));
};

/**
 * Function to get all article according the category name
 * @param req.param : number corresponding to the category name to retrieve
 */
export const getArticlesByCategoryName = (req: Request, res: Response) => {
  ArticleModel.findBy({ "category.name": req.params.name })
    .then((article: any) => res.status(200).json(article))
    .catch((e) => res.status(404).json({ message: ARTICLE_NOT_FOUND, e }));
};

/**
 * Function to sign up = create an user
 * @param req.param : number corresponding to the id to delete
 */
export const deleteArticle = (req: Request, res: Response) => {
  ArticleModel.deleteOne({ id: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(() => res.status(400).json({ message: ARTICLE_BAD_REQUEST }));
};

/**
 * Function to add an article
 * @param req.body the data for the new article
 */
export const addArticle = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: ARTICLE_BAD_REQUEST });
    return;
  }

  ArticleModel.save({
    ...req.body,
    imagePresentation: `${req.protocol}://${req.get("host")}/public/${
      req.file!.filename
    }`,
  })
    .then(() => res.status(201).json({ message: ARTICLE_CREATED }))
    .catch(() => res.status(400).json({ message: ARTICLE_BAD_REQUEST }));
};

/**
 * Function to update one catgeory
 * @param req.body the data to update the article
 */
export const updateArticle = async (req: Request, res: Response) => {
  if (req.file)
    req.body.imagePresentation = `${req.protocol}://${req.get("host")}/public/${
      req.file.filename
    }`;

  ArticleModel.findOneAndUpdate([{ ...req.body }, { id: req.params.id }])
    .then(() => res.sendStatus(204))
    .catch(() => res.status(400).json({ message: ARTICLE_BAD_REQUEST }));
};
