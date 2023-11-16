import Loading from "@/app/loading";
import { API_CHECK_COOKIES } from "@/constants/constants";
import { setUser } from "@/redux/features/slice/userSlice";
import { store } from "@/redux/store";
import { fetchLogout, fetchUser } from "@/service/userService";
import { useEffect, useRef, useState } from "react";

const useCheckCookies = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

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
      fetchLogout();
      store.dispatch(setUser(null));
    } finally {
      setLoading(false);
    }

    calledOnce.current = true;
  }, []);

  if (isLoading) {
    return <Loading />;
  }
};

export default useCheckCookies;
