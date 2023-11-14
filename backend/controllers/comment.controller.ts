import dotenv from "dotenv";
import { Request, Response } from "express";
import * as CommentModel from "../models/comment.model";
import {
  COMMENT_NOT_FOUND,
  COMMENT_BAD_REQUEST,
  COMMENT_CREATED,
} from "../constants/constants";

dotenv.config();

/**
 * Function to get all comments according article
 */
export const getCommentsByArticle = (req: Request, res: Response) => {
  CommentModel.find(req.params.articleId)
    .then((comments) => res.status(200).json(comments))
    .catch(() => res.status(404).json({ message: COMMENT_NOT_FOUND }));
};

/**
 * Function to delete one comment
 * @param req.body : name, firstname, email, password
 */
export const deleteComment = (req: Request, res: Response) => {
  CommentModel.deleteOne({ id: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(() => res.status(400).json({ message: COMMENT_BAD_REQUEST }));
};

/**
 * Function to add one comment
 * @param req.body : user_id, content, article_id
 */
export const addComment = (req: Request, res: Response) => {
  CommentModel.save({
    ...req.body,
  })
    .then(() => res.status(201).json({ message: COMMENT_CREATED }))
    .catch(() => res.status(400).json({ message: COMMENT_BAD_REQUEST }));
};
