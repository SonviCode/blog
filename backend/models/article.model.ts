import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

interface ArticleInterface {
  id: number;
  title: string;
  author: string;
  data: Date;
  content: string;
}

export const save = async (body: ArticleInterface) => {
  const sql = process.env.SQL_ADD_ARTICLE!;
  const parameter = Object.values(body);

  // ADD UUID
  parameter.unshift(uuidv4());
  // ADD DATE IN THE GOOD INDEX
  parameter.splice(3, 0, new Date());

  return await new Promise((resolve, reject) => {
    database.query(sql, parameter, (err, article) => {
      if (err) return reject(err);

      resolve(article[0]);
    });
  });
};

export const findOne = async (params: Object) => {
  const sql =
    "SELECT * FROM article LEFT JOIN user ON article.user_id = user.id";
  // const sql = process.env.SQL_GET_ARTICLE_BY!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], (err, article) => {
      if (err) return reject(err);
      if (article.length === 0) return reject(new Error());

      resolve(article[0]);
    });
  });
};

export const find = async () => {
  const sql =
    "SELECT article.id, title, article.date, content, description, imagePresentation, category.name AS category, CONCAT(user.name,' ', user.firstname) AS user, CONCAT(user.*) AS user FROM article INNER JOIN user ON article.user_id = user.id INNER JOIN category ON article.category_id = category.id";
  // const sql = process.env.SQL_GET_ARTICLES!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, articles) => {
      if (err) reject(err);

      resolve(articles);
    });
  });
};
