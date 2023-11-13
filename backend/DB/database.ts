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

/**
 * a function call in the init to check if the database connexion is ok
 */
export const connectionDB = () => {
  database.connect((err) => {
    if (err) {
      console.error("Erreur de connexion" + err.stack);
      return;
    }

    console.log("⚡️[database]: Database connection is successful");
  });
};

/**
 * function to call the database and make a query
 *
 * @param sql the sql query (whitout parameter)
 * @param params the parameter to put in the sql query
 * @returns Promise pending
 */
export const databaseQuery = async (
  sql: string,
  params: string[] | Object
): Promise<unknown> => {
  return await new Promise((resolve, reject) => {
    database.query(sql, params, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  });
};
