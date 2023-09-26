import express from "express";
import { getUserById, getUsers, login, signUp } from "../controllers/user.controller";
import { checkIfEmailAlreadyExist } from "../middleware/checkEmail";
import { checkToken } from "../middleware/checkToken";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id",checkToken, signUp);
router.post("/", login);

export default router;
