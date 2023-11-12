import { database, databaseQuery } from "../DB/database";
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

/**
 * Method to create an article
 * 
 * @param params the body of the article
 * @returns Promises corresponding to the data API
 */
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
  
  return databaseQuery(sql, params);
};

/**
 * Method to find an article by the id
 * 
 * @param params id of the article
 * @returns Promises corresponding to the data API
 */
export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_ARTICLE_BY!;

  return databaseQuery(sql, params);
};

/**
 * Method to get all articles
 * 
 * @returns Promises corresponding to the data API
 */
export const find = async () => {
  const sql = process.env.SQL_GET_ARTICLES!;

  return databaseQuery(sql, "");
};

/**
 * Method to delete an article
 * 
 * @param params id of the article
 * @returns Promises corresponding to the data API
 */
export const deleteOne = async (params: { id: string }) => {
  const sql = process.env.SQL_DELETE_ARTICLE!;

  return databaseQuery(sql, [params]);
};

/**
 * Method to update an article
 * 
 * @param params body to update, id of the article
 * @returns Promises corresponding to the data API
 */
export const findOneAndUpdate = async (
  params: [ArticleInterface, { id: string }]
) => {
  const sql = process.env.SQL_UPDATE_ARTICLE!;

  return databaseQuery(sql, params);
};
