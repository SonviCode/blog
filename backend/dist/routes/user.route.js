"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const checkEmail_1 = require("../middleware/user/checkEmail");
const checkToken_1 = require("../middleware/token/checkToken");
const multerConfig_1 = require("../middleware/multerConfig");
const checkAdmin_1 = require("../middleware/token/checkAdmin");
const checkPayload_1 = require("../middleware/checkPayload");
const router = express_1.default.Router();
router.get("/users", checkAdmin_1.checkAdmin, user_controller_1.getUsers);
router.get("/user/:id", checkToken_1.checkToken, user_controller_1.getUserById);
// TODO
// router.put("/update/:id", checkToken, multerConfig, updateUser); 
router.post("/signup", multerConfig_1.multerConfig, checkPayload_1.checkPayload, checkEmail_1.checkIfEmailAlreadyExist, user_controller_1.signUp);
router.post("/login", user_controller_1.login);
router.post("/logout", user_controller_1.logout);
router.get("/cookies", checkToken_1.checkToken, user_controller_1.checkCookies);
exports.default = router;
