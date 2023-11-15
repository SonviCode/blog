import express from "express";
import { checkToken } from "../middleware/checkToken";
import {
  addArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
  getArticleByCategoryName,
} from "../controllers/article.controller";
import { multerConfig } from "../middleware/multerConfig";
import { checkAdmin } from "../middleware/checkAdmin";
import { checkPayload } from "../middleware/user/checkPayload";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.get("/category/:name", getArticleByCategoryName);
router.put("/:id", checkToken, multerConfig, updateArticle);
router.post("/", checkToken, multerConfig, checkPayload, addArticle);
router.delete("/:id", checkAdmin, deleteArticle);

export default router;
