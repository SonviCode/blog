import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategoryByName,
  getCategorys,
  updateCategory,
} from "../controllers/category.controllers";
import { checkAdmin } from "../middleware/token/checkAdmin";
import { multerConfig } from "../middleware/multerConfig";
// const multerConfig = require("../middleware/multerConfig");

const router = express.Router();

router.get("/", getCategorys);
router.get("/:name", getCategoryByName);
router.delete("/:id", checkAdmin, deleteCategory);
router.post("/", checkAdmin, multerConfig, addCategory);
router.put("/:id", checkAdmin, multerConfig, updateCategory);

export default router;
