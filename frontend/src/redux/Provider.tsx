"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import useCheckCookies from "@/hooks/useCheckCookies";
import Loading from "@/app/loading";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const isLoading = useCheckCookies();

  if (isLoading) {
    return <Loading />;
  }

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
