import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { connectionDB, database } from "./DB/connexion";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectionDB();

app.get("/", (req: Request, res: Response) => {
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
