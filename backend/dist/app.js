"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const connexion_1 = require("./DB/connexion");
const article_route_1 = __importDefault(require("./routes/article.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
/**
 * CONFIG
 */
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
/**
 * DB connection
 */
(0, connexion_1.connectionDB)();
/**
 * ROUTER
 */
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api/auth", user_route_1.default);
app.use("/api/article", article_route_1.default);
app.use("/api/category", category_route_1.default);
app.use("/api/comment", comment_route_1.default);
exports.default = app;
