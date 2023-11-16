import { API_CATEGORY } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Dispatch, SetStateAction } from "react";

/**
 * service to add a category
 *
 * @param formData content of article to add
 * @param setError to display error message if needed
 */
export const addCategory = async (
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(API_CATEGORY, {
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
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to delete an article
 *
 * @param id id to delete
 */
export const deleteCategory = async (
  id: number,
) => {
  try {
    const res = await fetch(`${API_CATEGORY}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw res;
  } catch (e) {
    console.log(e);
  }
};

/**
 * service to update a category
 *
 * @param id id to update
 * @param formData content of category to update
 * @param setError to display error message if needed
 */
export const updateCategory = async (
  id: number,
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(`${API_CATEGORY}/${id}`, {
      method: "PUT",
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
 * Service to get all categorys
 *
 * @param setCategorys to set the data directly after a add, delete or update
 */
export const getCategorys = async (
  setCategorys: Dispatch<SetStateAction<Category[]>>
) => {
  try {
    const res = await fetch(API_CATEGORY, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    setCategorys(data);
  } catch (e) {
    console.log(e);
  }
};
