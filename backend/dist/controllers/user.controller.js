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
exports.login = exports.signUp = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
const UserModel = __importStar(require("../models/user.model"));
dotenv_1.default.config();
/**
 * Function to get all users
 */
const getUsers = (_req, res) => {
    UserModel.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(400).json({ error }));
};
exports.getUsers = getUsers;
/**
 * Function to get one user
 * @param req.param : number corresponding to the id to retrieve
 */
const getUserById = (req, res) => {
    UserModel.findOne({ id: parseInt(req.params.id) })
        .then((user) => res.status(200).json(user))
        .catch(() => res.status(404).json({ message: constants_1.userNotFound }));
};
exports.getUserById = getUserById;
/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
const signUp = (req, res) => {
    UserModel.save(Object.assign({}, req.body))
        .then(() => res.status(201).json({ message: constants_1.userCreated }))
        .catch((error) => res.status(500).json({ error }));
};
exports.signUp = signUp;
/**
 * Function to login and get the token
 * @param req.body : email, password
 */
const login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        const isValid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isValid)
            return res.status(401).json({ message: constants_1.incorrectCredential });
        // CREATE THE TOKEN WITH JWT
        const id = user.id;
        const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_RANDOM_TOKEN, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: constants_1.authSuccess, token });
    }))
        .catch(() => res.status(404).json({ message: constants_1.userNotFound }));
};
exports.login = login;
