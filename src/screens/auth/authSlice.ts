// src/store/slices/authSlice.ts
import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  name: string;
  email: string;
  phone: string;
  addresses: [];
  freeCashBalance: number;
  isActive: boolean;
  isAdmin: boolean;
  profilePicture: string;
}
interface Address {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  address: Address | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  address: null,
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
    setUserAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectAddress = (state: RootState) => state.auth.address;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);

export const { login, logout, setUserData, setUserAddress } = authSlice.actions;

export default authSlice.reducer;
