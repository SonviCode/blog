import { API_ADD_COMMENT, API_DELETE_COMMENT } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";
import { Comment } from "@/types/commentTypes";

/**
 * Service to add a comment
 *
 * @param formData
 * @param setError
 * @param setComments
 */
export const addComment = async (
  formData: any,
  setError: Dispatch<SetStateAction<string>>,
  setComments: Dispatch<SetStateAction<Comment[]>>
) => {
  try {
    const res = await fetch(API_ADD_COMMENT, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setComments(data);
  } catch (e) {
    console.log(e);
  }
};

export const deleteComment = async (
  id: number,
  articleId: string,
  setComments: Dispatch<SetStateAction<Comment[]>>
) => {
  try {
    const res = await fetch(`${API_DELETE_COMMENT}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw res;

    setComments(data);
  } catch (e) {
    console.log(e);
  }
};
