import cors from "cors";
import express, { Express } from "express";
import { connectionDB } from "./DB/connexion";
import articleRoutes from "./routes/article.route";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import path from "path";
import cookieParser from "cookie-parser";

const app: Express = express();

/**
 * CONFIG
 */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));

/**
 * DB connection
 */
connectionDB();

/**
 * ROUTER
 */
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api/auth", userRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/category", categoryRoutes);

export default app;
