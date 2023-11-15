import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { databaseQuery } from "../DB/database";

dotenv.config();

interface CommentInterface {
  id: number;
  content: string;
  date: Date;
  user_id: number;
  article_id: string;
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

/**
 * Method to find all comments according the article
 *
 * @param articleId the id of the comment
 * @returns Promises corresponding to the data API
 */
export const find = async (articleId: string) => {
  const sql = process.env.SQL_GET_COMMENTS_BY_ARTICLE!;

  return databaseQuery(sql, [articleId]);
};

/**
 * Method to delete one comment
 *
 * @param id the id of the comment
 * @param params the body of the comment
 * @returns Promises corresponding to the data API
 */
export const deleteOne = async (params: { id: string }) => {
  const sql = process.env.SQL_DELETE_COMMENT!;

  return databaseQuery(sql, [params])
};
