import express from "express";
import { checkToken } from "../middleware/token/checkToken";
import {
  addArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
  getArticlesByCategoryName,
} from "../controllers/article.controller";
import { multerConfig } from "../middleware/multerConfig";
import { checkAdmin } from "../middleware/token/checkAdmin";
import { checkPayload } from "../middleware/checkPayload";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.get("/category/:name", getArticlesByCategoryName);
router.put("/:id", checkToken, multerConfig, updateArticle);
router.post("/", checkToken, multerConfig, checkPayload, addArticle);
router.delete("/:id", checkAdmin, deleteArticle);

export default router;
