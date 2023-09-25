import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { connectionDB, database } from "./DB/connexion";
import userRoutes from "./routes/user.route";

const app: Express = express();

/**
 * CONFIG
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * DB connection
 */
connectionDB();

/**
 * ROUTER
 */
app.use("/api/auth", userRoutes);

export default app;