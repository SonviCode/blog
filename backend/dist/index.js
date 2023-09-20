"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connexion_1 = require("./DB/connexion");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, connexion_1.connectionDB)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// database.query(
//   "INSERT INTO USER (id, name, firstname, email,date, password, role) VALUES (NULL,'test', 'test2', 'test@tets.fr', '2023-09-19 15:05:14.000000', '123', 'admin')",
//   (err, rows, fiedls) => {
//     if (err) throw err;
//     console.log("Les données sont : ", rows);
//   }
// );
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at : http://localhost:${port}`);
});
