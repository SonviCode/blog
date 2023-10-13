import dotenv from "dotenv";
import { Request, Response } from "express";
import * as CommentModel from "../models/comment.model";
import {
  commentCreated,
  commentDeleted,
} from "../constants/constants";

dotenv.config();

/**
 * Function to get all comments according article
 */
export const getCommentsByArticle = (_req: Request, res: Response) => {
  CommentModel.find()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to delete one comment
 * @param req.body : name, firstname, email, password
 */
export const deleteComment = (req: Request, res: Response) => {
  CommentModel.findOne({ id: parseInt(req.params.id) })
    .then(() => res.status(201).json({ message: commentDeleted }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Function to add one catgeory
 * @param req.body : email, password
 */
export const addComment = (req: Request, res: Response) => {
  CommentModel.save({
    ...req.body,
    imgUrl: `${req.protocol}://${req.get("host")}/public/${req.file!.filename}`,
  })
    .then(() => res.status(201).json({ message: commentCreated }))
    .catch((error) => res.status(400).json({ error }));
};
