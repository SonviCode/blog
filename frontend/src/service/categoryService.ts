import { API_ADD_CATEGORY, API_DELETE_CATEGORY } from "@/constants/constants";
import { Dispatch, SetStateAction } from "react";

/**
 * Service to add a category
 *
 * @param formData
 * @param setMsg
 * @param setSucces
 */
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

/**
 * Service to delete a category
 *
 * @param formData
 */
export const deleteCategory = (
  id: number
) => {
  fetch(`${API_DELETE_CATEGORY}/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => console.log(json.message))
    .catch((error: any) => console.log(error));
};
