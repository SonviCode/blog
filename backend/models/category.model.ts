import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

interface CategoryInterface {
  id: number;
  name: string;
  color: string;
  imgUrl: string;
}

export const save = async (body: CategoryInterface) => {
  // const sql = process.env.SQL_ADD_CATEGORY!;
  const sql = "IF(SELECT * FROM category WHERE category.name = 'Montagne' INSERT INTO category (id, name, color, imgUrl) VALUES (?, ?, ?, ?)";
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
      if (catgeory.length === 0) return reject(err);

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

export const deleteOne = async (params: Object) => {
  const sql = process.env.SQL_DELETE_CATEGORY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, catgeory) => {
      if (err) return reject(err);
      if (catgeory.length === 0) return reject(err);

      resolve(catgeory[0]);
    });
  });
};