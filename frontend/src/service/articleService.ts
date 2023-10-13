import { API_ADD_ARTICLE } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";

export const addArticle = (
  formData: FormData,
  setMsg: Dispatch<SetStateAction<string>>
) => {
  fetch(API_ADD_ARTICLE, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => setMsg(json.message))
    .catch((error: any) => console.log(error));
};
