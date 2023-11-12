import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create a connection with our database
 */
export const database = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PSWD_DB,
  database: process.env.NAME_DB,
});

export const connectionDB = () => {
  database.connect((err) => {
    if (err) {
      console.error("Erreur de connexion" + err.stack);
      return;
    }

    console.log("⚡️[database]: Database connection is successful");
  });
};

export const databaseQuery = async (sql: string, params: string[] | Object) => {
  return await new Promise((resolve, reject) => {
    database.query(sql, params, (err, data) => {
      if (err) return reject(err);
      if (data.length === 0) return reject(new Error());

      resolve(data);
    });
  });
};
