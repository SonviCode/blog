import { API_ADD_CATEGORY } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";

export const addCategory = (
  formData: FormData,
  setMsg: Dispatch<SetStateAction<string>>,
  setSucces: Dispatch<SetStateAction<boolean>>
) => {
  fetch(API_ADD_CATEGORY, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => {
      setSucces(res.ok);

      return res.json();
    })
    .then((json) => setMsg(json.message))
    .catch((error: any) => console.log(error));
};
