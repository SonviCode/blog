import { database, databaseQuery } from "../DB/database";
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

/**
 * Method to create an user
 * 
 * @param body the body of the user
 * @returns Promises corresponding to the data API
 */
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

  return databaseQuery(sql, params);
};

/**
 * Method to find an user by the id or the email
 * 
 * @param params id or email of the user
 * @returns Promises corresponding to the data API
 */
export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_USER_BY!;

  return databaseQuery(sql, [params]);
};

/**
 * Method to get all users
 * 
 * @returns Promises corresponding to the data API
 */
export const find = async () => {
  const sql = process.env.SQL_GET_USERS!;

  return databaseQuery(sql, "");
};

/**
 * Method to update an user
 * 
 * @param params body to update, id of the user
 * @returns Promises corresponding to the data API
 */
export const findOneAndUpdate = async (
  params: [UserInterface, { id: string }]
) => {
  const sql = process.env.SQL_UPDATE_USER!;
  const body = params[0];

  if (body.password) await hashPassword(body);

  return databaseQuery(sql, params);
};
