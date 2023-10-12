import express from "express";
import { checkToken } from "../middleware/checkToken";
import {
  addArticle,
  getArticles,
  getArticleById,
} from "../controllers/article.controller";
import { multerConfig } from "../middleware/multerConfig";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
// router.put("/:id", checkToken, updateArticle);
router.post("/", checkToken, multerConfig, addArticle);
// router.delete("/", checkToken, deleteArticle);

export default router;
