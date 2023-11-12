import dotenv from "dotenv";
import { Request, Response } from "express";
import * as CommentModel from "../models/comment.model";
import { commentCreated, commentDeleted } from "../constants/constants";

dotenv.config();

/**
 * Function to get all comments according article
 */
export const getCommentsByArticle = (req: Request, res: Response) => {
  CommentModel.find(req.params.articleId)
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to delete one comment
 * @param req.body : name, firstname, email, password
 */
export const deleteComment = (req: Request, res: Response) => {
  CommentModel.deleteOne({ id: req.params.id }, req.body.articleId)
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to add one comment
 * @param req.body : user_id, content, article_id
 */
export const addComment = (req: Request, res: Response) => {
  CommentModel.save({
    ...req.body,
  })
    .then(() => getCommentsByArticle(req, res))
    .catch((error) => res.status(400).json({ error }));
};
