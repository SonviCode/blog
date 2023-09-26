import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/slice/userSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // preloadedState: localStorageGetItem(),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageSetItem),
});
