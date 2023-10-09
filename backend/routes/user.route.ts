import express from "express";
import {
  checkCookies,
  getUserById,
  getUsers,
  login,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { checkIfEmailAlreadyExist } from "../middleware/checkEmail";
import { checkToken } from "../middleware/checkToken";

const router = express.Router();

router.get("/users", checkToken, getUsers);
router.get("/user/:id", checkToken, getUserById);
router.put("/user/:id", updateUser);
router.post("/signup", checkIfEmailAlreadyExist, signUp);
router.post("/login", login);
router.get("/cookies", checkToken, checkCookies);

export default router;
