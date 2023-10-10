import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// interface ArticleInterface {
//   id: number;
//   name: string;
//   color: string;
//   imgUrl: string;
// }

export const save = async (body: any) => {
  const sql = process.env.SQL_ADD_ARTICLE!;
  const parameter = Object.values(body);

  // ADD UUID
  parameter.unshift(uuidv4());
    // ADD DATE IN THE GOOD INDEX
    parameter.splice(3, 0, new Date());

  console.log(parameter);
  

  return await new Promise((resolve, reject) => {
    database.query(sql, parameter, (err, catgeory) => {
      if (err) return reject(err);

      resolve(catgeory[0]);
    });
  });
};

// export const findOne = async (params: Object) => {
//   const sql = process.env.SQL_GET_CATEGORY_BY!;

//   return await new Promise((resolve, reject) => {
//     database.query(sql, [params], (err, catgeory) => {
//       if (err) return reject(err);
//       if (catgeory.length === 0) return reject(new Error());

//       resolve(catgeory[0]);
//     });
//   });
// };

export const find = async () => {
  const sql = process.env.SQL_GET_ARTICLES!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, categorys) => {
      if (err) reject(err);

      resolve(categorys);
    });
  });
};
