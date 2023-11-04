import {
  API_ADD_CATEGORY,
  API_DELETE_CATEGORY,
  API_UPDATE_CATEGORY,
} from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Dispatch, SetStateAction } from "react";

/**
 * Service to add a category
 *
 * @param formData
 * @param setMsg
 * @param setSucces
 */
export const addCategory = async (
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>,
  setCategorys: Dispatch<SetStateAction<Category[]>>
) => {
  try {
    const res = await fetch(API_ADD_CATEGORY, {
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

    setCategorys(data);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to delete a category
 *
 * @param formData
 */
export const deleteCategory = async (
  id: number,
  setCategorys: Dispatch<SetStateAction<Category[]>>
) => {
  try {
    const res = await fetch(`${API_DELETE_CATEGORY}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw res;

    setCategorys(data);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to update a category
 *
 * @param formData
 */
export const updateCategory = async (
  id: number,
  setError: Dispatch<SetStateAction<string>>,
  setCategorys: Dispatch<SetStateAction<Category[]>>
) => {
  try {
    const res = await fetch(`${API_UPDATE_CATEGORY}/${id}`, {
      method: "UPDATE",
      credentials: "include",
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
