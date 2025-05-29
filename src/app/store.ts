import { authApiQuery } from "@/screens/auth/authApiQuery";
import { configureStore } from "@reduxjs/toolkit";
import { commonApiQuery } from "./commonApiQuery";
import authReducer from "../screens/auth/authSlice";
export const store = configureStore({
  reducer: {
    [authApiQuery.reducerPath]: authApiQuery.reducer,
    [commonApiQuery.reducerPath]: commonApiQuery.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiQuery.middleware)
      .concat(commonApiQuery.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
