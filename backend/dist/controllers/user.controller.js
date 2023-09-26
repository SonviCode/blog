"use strict";
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
const connexion_1 = require("../DB/connexion");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../constants/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
/**
 * Function to get all users
 */
const getUsers = (_req, res, _next) => {
    const sql = process.env.SQl_GET_USERS;
    connexion_1.database.query(sql, (err, users) => {
        if (err)
            res.status(400).json(err);
        res.status(200).json(users);
    });
};
exports.getUsers = getUsers;
/**
 * Function to get one user
 */
const getUserById = (req, res, _next) => {
    const sql = process.env.SQl_GET_USER_BY_ID;
    connexion_1.database.query(sql, [req.params.id], (err, user) => {
        if (err)
            res.status(400).json(err);
        res.status(200).json(user);
    });
};
exports.getUserById = getUserById;
/**
 * Function to sign up = create an user
 * @param req.body : name, firstname, email, password
 */
const signUp = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(req.body.password, 10);
    req.body.password = hash;
    const parameter = Object.values(req.body);
    const sql = process.env.SQl_SIGNUP;
    // ADD DATE IN THE GOOD INDEX
    parameter.splice(3, 0, new Date());
    // ADD THE ROLE (customer by default)
    parameter.push("customer");
    connexion_1.database.query(sql, parameter, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.status(200).json(data);
    });
});
exports.signUp = signUp;
/**
 * Function to login and get the token
 * @param req.body : email, password
 */
const login = (req, res, _next) => {
    const sql = process.env.SQl_LOGIN;
    connexion_1.database.query(sql, [req.body.email], (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            res.status(500).json(err);
        // COMPARE PASSWORD FROM PARAMETER WITH PASSWORD IN DB
        const isValid = yield bcrypt_1.default.compare(req.body.password, data[0].password);
        if (!isValid)
            return res.status(401).json({ message: constants_1.incorrectCredential });
        // CREATE THE TOKEN WITH JWT
        const id = data[0].id;
        const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_RANDOM_TOKEN, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: constants_1.authSuccess, token });
    }));
};
exports.login = login;
