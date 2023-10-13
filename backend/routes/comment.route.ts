import express from "express";
import { addComment, deleteComment, getCommentsByArticle } from "../controllers/comment.controller";
import { checkAdmin } from "../middleware/checkAdmin";
import { checkToken } from "../middleware/checkToken";

const router = express.Router();

router.get("/", getCommentsByArticle);
router.post("/", checkToken, addComment);
router.delete("/", checkAdmin, deleteComment);

export default router;
