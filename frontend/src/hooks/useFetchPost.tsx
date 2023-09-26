"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

function useFetchPost(
  url: string,
  data: object,
  setMsg: Dispatch<SetStateAction<string>>
) {
  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => setMsg(json.message))
      .catch((error: any) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useFetchPost;
