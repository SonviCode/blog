import cors from "cors";
import express, { Express } from "express";
import { connectionDB } from "./DB/connexion";
import articleRoutes from "./routes/article.route";
import userRoutes from "./routes/user.route";

const app: Express = express();

/**
 * CONFIG
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

/**
 * DB connection
 */
connectionDB();

/**
 * ROUTER
 */
app.use("/api/auth", userRoutes);
app.use("/api/article", articleRoutes);

export default app;