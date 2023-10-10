import express from "express";
import { checkToken } from "../middleware/checkToken";
import { addArticle, getArticles } from "../controllers/article.controller";

const router = express.Router();

router.get("/", getArticles);
// router.get("/:id", getArticleById);
// router.put("/:id", checkToken, updateArticle);
router.post("/", checkToken, addArticle);
// router.delete("/", checkToken, deleteArticle);

export default router;
