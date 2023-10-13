import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategoryByName,
  getCategorys
} from "../controllers/category.controllers";
import { checkAdmin } from "../middleware/checkAdmin";
import { multerConfig } from "../middleware/multerConfig";
// const multerConfig = require("../middleware/multerConfig");

const router = express.Router();

router.get("/", getCategorys);
router.get("/:name", getCategoryByName);
router.delete("/:id", checkAdmin, deleteCategory);
router.post("/", checkAdmin, multerConfig, addCategory);

export default router;