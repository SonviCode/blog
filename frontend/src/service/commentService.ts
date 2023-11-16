import { API_COMMENT } from "@/constants/constants";
import { Comment } from "@/types/commentTypes";
import { Dispatch, SetStateAction } from "react";

/**
 * service to add a comment
 *
 * @param formData content of article to add
 * @param setError to display error message if needed
 */
export const addComment = async (
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(API_COMMENT, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to delete an article
 *
 * @param id id to delete
 * @param setError to display error message if needed
 */
export const deleteComment = async (
  id: number,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(`${API_COMMENT}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to get all comments according an article
 *
 * @param article_id id of the article
 * @param setComments to set the data directly after a add or a delete
 */
export const getComments = async (
  article_id: string,
  setComments: Dispatch<SetStateAction<Comment[]>>
) => {
  try {
    const res = await fetch(`${API_COMMENT}/${article_id}`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) throw res;

    setComments(data);
  } catch (e) {
    console.log(e);
  }
};
