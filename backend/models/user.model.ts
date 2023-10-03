import bcrypt from "bcrypt";
import { database } from "../DB/connexion";
import { userNotFound } from "../constants/constants";

const promisify = require("util").promisify;

export interface UserInterface {
  id: number;
  name: string;
  firstname: string;
  date: Date;
  password?: string;
  role: string;
}

export const save = async (body: UserInterface) => {
  const hash = await bcrypt.hash(body.password!, 10);
  body.password = hash;
  const parameter = Object.values(body);
  const sql = process.env.SQL_SIGNUP!;

  // ADD DATE IN THE GOOD INDEX
  parameter.splice(3, 0, new Date());

  // ADD THE ROLE (customer by default)
  parameter.push("customer");

  database.query(sql, parameter);
};

export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_USER_BY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, users) => {
      if (err) return reject(new Error(err.message));
      if (users.length === 0) return reject(new Error());

      resolve(users[0]);
    });
  });
};

export const find = async () => {
  const sql = process.env.SQL_GET_USERS!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, users) => {
      if (err) reject(err);

      resolve(users);
    });
  });
};
