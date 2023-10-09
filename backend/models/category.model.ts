import { database } from "../DB/connexion";
import dotenv from "dotenv";

dotenv.config();

interface CategoryInterface {
  id: number;
  name: string;
  color: string;
  imgUrl: string;
}

export const save = async (body: CategoryInterface) => {
  const sql = process.env.SQL_ADD_CATEGORY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, Object.values(body), (err, catgeory) => {
      if (err) return reject(new Error(err.message));

      resolve(catgeory[0]);
    });
  });
};

export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_CATEGORY_BY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, catgeory) => {
      if (err) return reject(new Error(err.message));
      if (catgeory.length === 0) return reject(new Error());

      resolve(catgeory[0]);
    });
  });
};

export const find = async () => {
  const sql = process.env.SQL_GET_CATEGORYS!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, categorys) => {
      if (err) reject(err);

      resolve(categorys);
    });
  });
};
