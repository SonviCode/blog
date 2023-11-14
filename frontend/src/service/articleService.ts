import { API_ARTICLE } from "@/constants/constants";
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
  setCategorys: Dispatch<SetStateAction<Article[]>>
) => {
  try {
    const res = await fetch(API_ARTICLE, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();



    if (!res.ok) {
      setError(data.message);
      return;
    }

    setCategorys(data);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to delete an article
 *
 * @param formData
 */
export const deleteArticle = async (
  id: number,
  setArticles: Dispatch<SetStateAction<Article[]>>
) => {
  try {
    const res = await fetch(`${API_ARTICLE}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw res;

    setArticles(data);
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
  setArticles: Dispatch<SetStateAction<Article[]>>
) => {
  try {
    const res = await fetch(`${API_ARTICLE}/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setArticles(data);
  } catch (e) {
    console.log(e);
  }
};
