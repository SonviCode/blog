import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsByArticle,
} from "../controllers/comment.controller";
import { checkToken } from "../middleware/checkToken";
import { multerConfig } from "../middleware/multerConfig";

const router = express.Router();

router.get("/:articleId", getCommentsByArticle);
router.post("/", checkToken, multerConfig, addComment);
router.delete("/:id", checkToken, deleteComment);

export default router;
