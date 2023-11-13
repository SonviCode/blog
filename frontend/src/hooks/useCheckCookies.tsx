import { API_CHECK_COOKIES } from "@/constants/constants";
import { setUser } from "@/redux/features/slice/userSlice";
import { store } from "@/redux/store";
import { fetchUser } from "@/service/userService";
import { useEffect, useRef } from "react";

const useCheckCookies = (): void => {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    try {
      const fetchCookies = async () => {
        const res = await fetch(API_CHECK_COOKIES, {
          credentials: "include",
        });
        const { id } = await res.json();

        if (!id) return;

        fetchUser(id);
      };

      fetchCookies();
    } catch (e) {
      store.dispatch(setUser(null));
    }

    calledOnce.current = true;
  }, []);
};

export default useCheckCookies;
