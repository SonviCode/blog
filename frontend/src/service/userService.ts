import {
  API_GET_USER,
  API_LOGIN,
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

    if (data.message !== authSuccess) {
      setMsg(data.message);
      return;
    }
    fetchUser(data.id);
  } catch (e: any) {
    console.log(e);

    // setMsg(e);
  }
};

export const fetchSignUp = async (
  email: string,
  password: string,
  setMsg: Dispatch<SetStateAction<string>>
) => {
  fetch(API_SIGNUP, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((json) => setMsg(json.message))
    .catch((error: any) => console.log(error));
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

    store.dispatch(setUser(user));
  } catch (e) {
    console.log(e);
  }
};
