import {
  API_GET_USER,
  API_LOGIN,
  API_LOGOUT,
  API_SIGNUP,
  authSuccess,
} from "@/constants/constants";
import { setUser } from "@/redux/features/slice/userSlice";
import { store } from "@/redux/store";
import { Dispatch, SetStateAction } from "react";

/**
 * Service to fetch data for login and call the fetch user function
 *
 * @param email
 * @param password
 * @param setMsg
 * @returns
 */
export const fetchLogin = async (
  email: string,
  password: string,
  setMsg: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message);
      return;
    }

    fetchUser(data.id);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Function to logout ( delete the cookie and dispatch user to null)
 */
export const fetchLogout = async () => {
  fetch(API_LOGOUT, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(() => store.dispatch(setUser(null)))
    .catch((e) => console.error(e));
};

/**
 * Service to create user info and call the fetch user function
 *
 * @param formData
 * @param setMsg
 * @returns
 */
export const signUp = async (
  formData: FormData,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(API_SIGNUP, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    fetchUser(data.id);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Service to fetch user by id and dispatch the user in the store
 *
 * @param id
 */
export const fetchUser = async (id: number) => {
  try {
    const res = await fetch(API_GET_USER + id, { credentials: "include" });
    const user = await res.json();

    if (!res.ok) {
      return;
    }

    store.dispatch(setUser(user));
  } catch (e) {
    console.log(e);
  }
};
