"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCookies = exports.logout = exports.updateUser = exports.login = exports.signUp = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
const UserModel = __importStar(require("../models/user.model"));
const checkPayload_service_1 = require("../service/checkPayload.service");
dotenv_1.default.config();
/**
 * Function to get all users
 */
const getUsers = (_req, res) => {
    UserModel.find()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({ error }));
};
exports.getUsers = getUsers;
/**
 * Function to get one user
 * @param req.param : number corresponding to the id to retrieve
 */
const getUserById = (req, res) => {
    UserModel.findOne({ id: req.params.id })
        .then((user) => res.status(200).json(user[0]))
        .catch(() => res.status(404).json({ message: constants_1.USER_NOT_FOUND }));
};
exports.getUserById = getUserById;
/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
const signUp = (req, res) => {
    // if an image is provided, set this, else set an empty string
    const imgUser = req.file
        ? `${req.protocol}://${req.get("host")}/public/${req.file.filename}`
        : "";
    UserModel.save(Object.assign(Object.assign({}, req.body), { imgUser }))
        .then(() => (0, exports.login)(req, res))
        .catch(() => res.status(400).json({ message: constants_1.SIGNUP_BAD_REQUEST }));
};
exports.signUp = signUp;
/**
 * Function to login and get the token
 * @param req.body : email, password
 */
const login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user[0].length === 0)
            throw new Error();
        const isValid = yield bcrypt_1.default.compare(req.body.password, user[0].password);
        if (!isValid)
            return res.status(403).json({ message: constants_1.INCORRECT_CREDENTIAL });
        // CREATE THE TOKEN WITH JWT
        const id = user[0].id;
        const role = user[0].role;
        const token = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_RANDOM_TOKEN, {
            expiresIn: "1h",
        });
        res
            .cookie("jwt_token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000, // validity period of the token ( in seconds )
        })
            .status(200)
            .json({ message: constants_1.AUTH_SUCCESS, token, id });
    }))
        .catch(() => res.status(403).json({ message: constants_1.INCORRECT_CREDENTIAL }));
};
exports.login = login;
/**
 * Function to update data of user
 * @param req.body : content of user to update
 */
const updateUser = (req, res) => {
    const imgUser = req.file
        ? `${req.protocol}://${req.get("host")}/public/${req.file.filename}`
        : "";
    try {
        (0, checkPayload_service_1.checkUserPayload)(req.body);
    }
    catch (error) {
        res.status(400).json({ error });
        return;
    }
    UserModel.findOneAndUpdate([Object.assign(Object.assign({}, req.body), { imgUser }), { id: req.params.id }])
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }));
};
exports.updateUser = updateUser;
/**
 * Function to logout, it clear the cookies
 */
const logout = (_req, res) => {
    res
        .cookie("jwt_token", "", {
        httpOnly: true,
        secure: false,
        maxAge: -1,
    })
        .status(200)
        .json({ message: constants_1.USER_LOGOUT });
};
exports.logout = logout;
/**
 * Function call the first time on the page to know if your session is currently good
 * before that, we call the middleware checkToken, so the error (if the user is not connected)
 * is catch before this controller
 */
const checkCookies = (req, res) => {
    res.status(200).json({ id: req.auth });
};
exports.checkCookies = checkCookies;
