
import { createSlice } from "@reduxjs/toolkit";

const cartHandlerSlice = createSlice({
  name: "cartReducer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartHandlerSlice.actions;
export default cartHandlerSlice.reducer;
