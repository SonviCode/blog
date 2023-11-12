import { database, databaseQuery } from "../DB/database";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

interface CategoryInterface {
  id: number;
  name: string;
  color: string;
  imgUrl: string;
}

/**
 * Method to create a category
 *
 * @param params the body of the category
 * @returns Promises corresponding to the data API
 */
export const save = async (body: CategoryInterface) => {
  const sql = process.env.SQL_ADD_CATEGORY!;

  const params = Object.values(body);
  // ADD UUID
  params.unshift(uuidv4());

  return databaseQuery(sql, params);
};

/**
 * Method to find one category
 *
 * @param params the name of the category
 * @returns Promises corresponding to the data API
 */
export const findOne = async (params: Object) => {
  const sql = process.env.SQL_GET_CATEGORY_BY!;

  return databaseQuery(sql, [params]);
};

/**
 * Method to find all category
 *
 * @returns Promises corresponding to the data API
 */
export const find = async () => {
  const sql = process.env.SQL_GET_CATEGORYS!;

  return databaseQuery(sql, "");
};

/**
 * Method to delete one category
 *
 * @param params id of the category
 * @returns Promises corresponding to the data API
 */
export const deleteOne = async (params: Object) => {
  const sql = process.env.SQL_DELETE_CATEGORY!;

  return databaseQuery(sql, [params]);
};

/**
 * Method to update one category
 *
 * @param params body to update, id of the category
 * @returns Promises corresponding to the data API
 */
export const findOneAndUpdate = async (
  params: [CategoryInterface, { id: string }]
) => {
  const sql = process.env.SQL_UPDATE_CATEGORY!;

  return databaseQuery(sql, params);
};
