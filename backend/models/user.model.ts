import { database } from "../DB/connexion";
import { hashPassword } from "../service/hash.service";
import { v4 as uuidv4 } from "uuid";

export interface UserInterface {
  id: number;
  name: string;
  firstname: string;
  date: Date;
  password?: string;
  role: string;
  imgUser?: string;
}

export const save = async (body: UserInterface) => {
  await hashPassword(body);
  const parameter = Object.values(body);
  const sql = process.env.SQL_SIGNUP!;

  console.log(body);
  

  const params = [];

  // ADD UUID
  parameter.unshift(uuidv4());
  // ADD DATE IN THE GOOD INDEX
  parameter.splice(4, 0, new Date());
  // ADD THE ROLE (customer by default)
  parameter.push("customer");

  return await new Promise((resolve, reject) => {
    database.query(sql, parameter, (err, user) => {
      if (err) return reject(err);

      resolve(user[0]);
    });
  });
};

export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_USER_BY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, user) => {
      if (err) return reject(err);
      if (user.length === 0) return reject(new Error());

      resolve(user[0]);
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

export const findOneAndUpdate = async (
  params: [UserInterface, { id: number }]
) => {
  const sql = process.env.SQL_UPDATE_USER!;
  const body = params[0];

  if (body.password) await hashPassword(body);

  return await new Promise((resolve, reject) => {
    database.query(sql, params, (err, users) => {
      if (err) reject(err);

      resolve(users);
    });
  });
};
