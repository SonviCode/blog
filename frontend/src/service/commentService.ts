import { API_ADD_COMMENT } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";
import { Comment } from "../types/commentTypes";

export const addComment = (
  formData: any,
  setMsg: Dispatch<SetStateAction<string>>,
  setComments: Dispatch<SetStateAction<Comment[]>>
) => {
  fetch(API_ADD_COMMENT, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => {
      setComments(json.comments);
      setMsg(json.message);
    })
    .catch((error: any) => console.error(error));
};
