import express from "express";
import { getUserById, getUsers, login, signUp } from "../controllers/user.controller";
import { checkIfEmailAlreadyExist } from "../middleware/checkEmail";
import { checkToken } from "../middleware/checkToken";

const router = express.Router();

router.get("/users", checkToken, getUsers);
router.get("/user/:id", checkToken, getUserById);
router.post("/signup", checkIfEmailAlreadyExist, signUp);
router.post("/login", login);

export default router;
