import { Dispatch, SetStateAction, useEffect } from "react";

/**
 * Custom hooks to fetch data
 *
 * @param setData the react setter, it works with any type
 * @param api_url the api url from the constants
 */
const useFetchData = (
  setData: Dispatch<SetStateAction<any>>,
  api_url: string
): void => {
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(api_url, {
          credentials: "include",
        });

        if (!res.ok) throw res;

        const data = await res.json();
        setData(data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
};

export default useFetchData;
