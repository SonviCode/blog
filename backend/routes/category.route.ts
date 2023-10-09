import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategoryById,
  getCategorys,
} from "../controllers/category.controllers";
import { checkToken } from "../middleware/checkToken";
import { multerConfig } from "../middleware/multerConfig";

const router = express.Router();

router.get("/", getCategorys);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);
router.post("/", multerConfig, addCategory);

export default router;
