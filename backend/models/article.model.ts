import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

interface ArticleInterface {
  id: number;
  title: string;
  user_id: number;
  date: Date;
  content: string;
  description: string;
  imagePresentation: string;
  category_id: number;
}

export const save = async (body: ArticleInterface) => {
  const sql = process.env.SQL_ADD_ARTICLE!;
  const params = [
    uuidv4(),
    body.title,
    body.user_id,
    new Date(),
    body.content,
    body.description,
    body.imagePresentation,
    body.category_id,
  ];

  return await new Promise((resolve, reject) => {
    database.query(sql, params, (err, article) => {
      if (err) return reject(err);

      resolve(article[0]);
    });
  });
};

export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_ARTICLE_BY!;

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
    "SELECT article.id, title, article.date, content, description, imagePresentation, category_id, category.color AS category_color, category.imgUrl AS category_image, category.name AS category_name, CONCAT(user.name,' ', user.firstname) AS user_name, user_id FROM article INNER JOIN user ON article.user_id = user.id INNER JOIN category ON article.category_id = category.id";
  // const sql = process.env.SQL_GET_ARTICLES!;

  return await new Promise((resolve, reject) => {
    database.query(sql, (err, articles) => {
      if (err) reject(err);

      resolve(articles);
    });
  });
};
