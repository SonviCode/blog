"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import useCheckCookies from "@/hooks/useCheckCookies";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  useCheckCookies();

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
