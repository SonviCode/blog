"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connexion_1 = require("./DB/connexion");
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
/**
 * CONFIG
 */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/**
 * DB connection
 */
(0, connexion_1.connectionDB)();
/**
 * ROUTER
 */
app.use("/api/auth", user_route_1.default);
exports.default = app;
