// src/store/slices/authSlice.ts
import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    
}

interface AuthState {
  //   user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  //   user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      //   state.user = action.payload.user;
      state.token = action.payload.token;
    //   localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      //   state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
