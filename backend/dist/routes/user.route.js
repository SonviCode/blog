"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const checkEmail_1 = require("../middleware/checkEmail");
const router = express_1.default.Router();
router.get("/users", user_controller_1.getUsers);
router.get("/user/:id", user_controller_1.getUserById);
// router.get("/users", checkToken, getUsers);
// router.get("/user/:id", checkToken, getUserById);
router.post("/signup", checkEmail_1.checkIfEmailAlreadyExist, user_controller_1.signUp);
router.post("/login", user_controller_1.login);
exports.default = router;
