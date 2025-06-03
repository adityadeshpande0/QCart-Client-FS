// src/store/slices/authSlice.ts
import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  address: null,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {},
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
