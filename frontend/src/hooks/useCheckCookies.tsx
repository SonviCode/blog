import { API_CHECK_COOKIES } from "@/constants/constants";
import { fetchUser } from "@/service/userService";
import { useEffect } from "react";

const useCheckCookies = (): void => {
  useEffect(() => {
    try {
      const fetchCookies = async () => {
        const res = await fetch(API_CHECK_COOKIES, {
          credentials: "include",
        });
        const { id } = await res.json();

        fetchUser(id);
      };

      fetchCookies();
    } catch (e) {
      console.log(e);
    }
  }, []);
};

export default useCheckCookies;
