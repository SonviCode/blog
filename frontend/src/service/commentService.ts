import { API_ADD_COMMENT } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";

export const addComment = (
  formData: FormData,
  setMsg: Dispatch<SetStateAction<string>>,
) => {
  fetch(API_ADD_COMMENT, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => setMsg(json.message))
    .catch((error: any) => console.log(error));
};
