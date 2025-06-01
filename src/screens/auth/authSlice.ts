// src/store/slices/authSlice.ts
import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  phone: string;
  addresses: [];
  freeCashBalance: number;
  isActive: boolean;
  isAdmin: boolean;
  profilePicture: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  addressId?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  addressId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectAddressId = (state: RootState) => state.auth.addressId;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);

export const { login, logout, setUserData,setUserAddressId } = authSlice.actions;

export default authSlice.reducer;
