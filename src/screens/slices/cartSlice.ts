import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  units?: string;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
}

const initialState: CartState = {
  isOpen: false,
  items: [],
};

const cartHandlerSlice = createSlice({
  name: "cartReducer",
  initialState,
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
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: { cartReducer: CartState }) =>
  state.cartReducer.items;

export const {
  openCart,
  closeCart,
  toggleCart,
  addToCart,
  removeFromCart,
  clearCart,
} = cartHandlerSlice.actions;

export default cartHandlerSlice.reducer;
