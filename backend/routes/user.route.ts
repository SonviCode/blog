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
import { checkIfEmailAlreadyExist } from "../middleware/user/checkEmail";
import { checkToken } from "../middleware/token/checkToken";
import { multerConfig } from "../middleware/multerConfig";
import { checkAdmin } from "../middleware/token/checkAdmin";
import { checkPayload } from "../middleware/checkPayload";

const router = express.Router();

router.get("/users", checkAdmin, getUsers);
router.get("/user/:id", checkToken, getUserById);
// TODO
// router.put("/update/:id", checkToken, multerConfig, updateUser); 
router.post(
  "/signup",
  multerConfig,
  checkPayload,
  checkIfEmailAlreadyExist,
  signUp
);
router.post("/login", login);
router.post("/logout", logout);
router.get("/cookies", checkToken, checkCookies);

export default router;
