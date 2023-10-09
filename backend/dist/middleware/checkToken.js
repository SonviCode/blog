"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
/**
 * Middleware to check if the token is good
 */
const checkToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_RANDOM_TOKEN);
        const id = decodedToken.id;
        Object.assign(req, { auth: id });
        next();
    }
    catch (error) {
        res.status(401).json({ message: constants_1.incorrectToken });
    }
};
exports.checkToken = checkToken;
