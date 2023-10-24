import { database } from "../DB/connexion";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { UserInterface } from "./user.model";

dotenv.config();

interface CommentInterface {
  id: number;
  content: string;
  date: Date;
  user_id: number;
  article_id: number;
}

export const save = async (body: CommentInterface) => {
  const sql = process.env.SQL_ADD_COMMENT!;
  const params = [
    uuidv4(),
    body.content,
    new Date(),
    body.user_id,
    body.article_id,
  ];

  return await new Promise((resolve, reject) => {
    database.query(sql, params, async (err) => {
      if (err) return reject(err);

      const allComments = await find(body.article_id.toString());

      resolve(allComments);
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

export const find = async (articleId: string) => {
  // const sql = process.env.SQL_GET_COMMENTS_BY_ARTICLE!;
  const sql =
    "SELECT comment.id, comment.user_id, comment.content, comment.date, user.name as user_name FROM comment INNER JOIN article ON article.id = comment.article_id INNER JOIN user ON user.id = comment.user_id WHERE article_id = ?";

  return await new Promise((resolve, reject) => {
    database.query(sql, [articleId], (err, comments) => {
      if (err) reject(err);

      console.log(comments);

      resolve(comments);
    });
  });
};
