import express from "express";
import { checkToken } from "../middleware/checkToken";
import { getCategorys } from "../controllers/category.controllers";

const router = express.Router();

router.get("/", getCategorys);
// router.get("/:id", getUserById);
router.put("/:id", checkToken, updateCategory);
router.post("/", checkToken, addCategory);

export default router;
