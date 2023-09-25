import http from "http";
import app from "./app";
import dotenv from "dotenv";

// if (process.env.NODE_ENV === "development") {
dotenv.config();
// }

const port = process.env.PORT;

app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at : http://localhost:${port}`);
});
