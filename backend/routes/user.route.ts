import express from "express";
import {
  checkCookies,
  getUserById,
  getUsers,
  login,
  logout,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { checkIfEmailAlreadyExist } from "../middleware/checkEmail";
import { checkToken } from "../middleware/checkToken";
import { multerConfig } from "../middleware/multerConfig";

const router = express.Router();

router.get("/users", checkToken, getUsers);
router.get("/user/:id", checkToken, getUserById);
router.put("/user/:id", checkToken, updateUser);
router.post("/signup", multerConfig, checkIfEmailAlreadyExist, signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/cookies", checkToken, checkCookies);

export default router;
