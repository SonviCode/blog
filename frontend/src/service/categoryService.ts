import { API_CATEGORY } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Dispatch, SetStateAction } from "react";

/**
 * Service to add a category
 *
 * @param formData
 * @param setError
 * @param setSucces
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
 * Service to delete a category
 *
 * @param formData
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
 * Service to update a category
 *
 * @param formData
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
