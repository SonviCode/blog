import { database, databaseQuery } from "../DB/database";
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

/**
 * Method to create one comment
 * 
 * @param params the body of the comment
 * @returns Promises corresponding to the data API
 */
export const save = async (body: CommentInterface) => {
  const sql = process.env.SQL_ADD_COMMENT!;
  const params = [
    uuidv4(),
    body.content,
    new Date(),
    body.user_id,
    body.article_id,
  ];

  return databaseQuery(sql, params);
};

export const find = async (articleId: string) => {
  // const sql = process.env.SQL_GET_COMMENTS_BY_ARTICLE!;
  const sql =
    "SELECT comment.id, comment.user_id, comment.content, comment.date,  CONCAT(user.name,' ', user.firstname) AS user_name, imgUser AS user_img FROM comment INNER JOIN article ON article.id = comment.article_id INNER JOIN user ON user.id = comment.user_id WHERE article_id = ?";

  return await new Promise((resolve, reject) => {
    database.query(sql, [articleId], (err, comments) => {
      if (err) reject(err);

      resolve(comments);
    });
  });
};

export const deleteOne = async (params: { id: string }, articleId: string) => {
  const sql = process.env.SQL_DELETE_COMMENT!;

  return await new Promise((resolve, reject) => {
    database.query(sql, [params], async (err, comment) => {
      if (err) return reject(err);
      if (comment.length === 0) return reject(err);

      const result = await find(articleId);

      resolve(result);
    });
  });
};
