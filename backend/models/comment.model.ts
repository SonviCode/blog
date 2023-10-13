import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { UserInterface } from "./user.model";

dotenv.config();

interface CommentInterface {
  id: number;
  content: string;
  date: Date;
  user: UserInterface;
  article_id: number;
}

export const save = async (body: CommentInterface) => {
  const sql = process.env.SQL_ADD_CATEGORY!;
  const parameter = Object.values(body);

  // ADD UUID
  parameter.unshift(uuidv4());

  return await new Promise((resolve, reject) => {
    database.query(sql, parameter, (err, catgeory) => {
      if (err) return reject(err);

      resolve(catgeory[0]);
    });
  });
};

export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_CATEGORY_BY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, catgeory) => {
      if (err) return reject(err);
      if (catgeory.length === 0) return reject(new Error());

      resolve(catgeory[0]);
    });
  });
};

export const find = async () => {
  const sql = process.env.SQL_GET_COMMENTS_BY_ARTICLE!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, categorys) => {
      if (err) reject(err);

      resolve(categorys);
    });
  });
};
