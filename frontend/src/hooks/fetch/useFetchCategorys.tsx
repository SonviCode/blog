import { API_GET_CATEGORYS } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

/**
 * Custom hooks to fetch data
 *
 * @param api_url the api url from the constants
 */
const useFetchCategorys = (): Category[] => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  let calledOnce = false;

  useEffect(() => {
    if (calledOnce) return;

    try {
      const fetchData = async () => {
        const res = await fetch(API_GET_CATEGORYS, {
          credentials: "include",
        });

        if (!res.ok) throw res;

        const data: Category[] = await res.json();
        setCategorys(data);
      };

      fetchData();
    } catch (e) {
      console.error(e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    calledOnce = true;
  }, []);

  return categorys;
};

export default useFetchCategorys;
