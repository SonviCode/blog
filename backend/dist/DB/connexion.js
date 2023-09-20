"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = exports.database = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Create a connection with our database
 */
exports.database = mysql_1.default.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PSWD_DB,
    database: process.env.NAME_DB,
});
const connectionDB = () => {
    exports.database.connect((err) => {
        if (err) {
            console.error("Erreur de connexion" + err.stack);
            return;
        }
        console.log("⚡️[database]: Database connection is successful");
    });
};
exports.connectionDB = connectionDB;
