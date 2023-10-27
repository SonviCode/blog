import { database } from "../DB/connexion";
import { hashPassword } from "../service/hash.service";
import { v4 as uuidv4 } from "uuid";

export interface UserInterface {
  id: number;
  name: string;
  firstname: string;
  email: string;
  date: Date;
  password?: string;
  role: string;
  imgUser?: string;
}

export const save = async (body: UserInterface) => {
  await hashPassword(body);
  const sql = process.env.SQL_SIGNUP!;

  const params = [
    uuidv4(), // user id
    body.name,
    body.firstname,
    body.email,
    new Date(),
    body.password,
    "user",
    body.imgUser,
  ];

  return await new Promise((resolve, reject) => {
    database.query(sql, params, (err, user) => {
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
