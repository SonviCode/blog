import { API_ARTICLE, ARTICLE_BAD_REQUEST } from "@/constants/constants";
import { Article } from "@/types/articleTypes";
import { Dispatch, SetStateAction } from "react";

/**
 * service to add an article
 *
 * @param formData
 * @param setError
 * @param setCategorys
 */
export const addArticle = async (
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>,
): Promise<boolean> => {
  try {
    const res = await fetch(API_ARTICLE, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return false;
    }
    return true;
  } catch (e) {
    setError(ARTICLE_BAD_REQUEST);
    return false;
  }
};

/**
 * Service to delete an article
 *
 * @param formData
 */
export const deleteArticle = async (
  id: number
) => {
  try {
    const res = await fetch(`${API_ARTICLE}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw res;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to update an article
 *
 * @param formData
 */
export const updateArticle = async (
  id: number,
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>,
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_ARTICLE}/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return false;
    }
    return true;
  } catch (e) {
    setError(ARTICLE_BAD_REQUEST);
    return false;
  }
};

/**
 * Service to get all articles
 *
 * @param setArticles to set the data directly after a add, delete or update
 */
export const getArticles = async (
  setArticles: Dispatch<SetStateAction<Article[]>>
) => {
  try {
    const res = await fetch(API_ARTICLE, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    setArticles(data);
  } catch (e) {
    console.log(e);
  }
};
