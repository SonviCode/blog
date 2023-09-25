"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
// if (process.env.NODE_ENV === "development") {
dotenv_1.default.config();
// }
const port = process.env.PORT;
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at : http://localhost:${port}`);
});
