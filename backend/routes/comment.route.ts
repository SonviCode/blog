import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsByArticle,
} from "../controllers/comment.controller";
import { checkAdmin } from "../middleware/checkAdmin";
import { checkToken } from "../middleware/checkToken";
import { multerConfig } from "../middleware/multerConfig";

const router = express.Router();

router.get("/:articleId", getCommentsByArticle);
router.post("/", checkToken, multerConfig, addComment);
router.delete("/", checkAdmin, deleteComment);

export default router;
