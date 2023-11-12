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
exports.databaseQuery = exports.connectionDB = exports.database = void 0;
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
const databaseQuery = (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve, reject) => {
        exports.database.query(sql, [params], (err, data) => {
            if (err)
                return reject(err);
            if (data.length === 0)
                return reject(new Error());
            resolve(data);
        });
    });
});
exports.databaseQuery = databaseQuery;
