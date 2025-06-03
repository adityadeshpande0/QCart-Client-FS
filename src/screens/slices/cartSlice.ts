// cartSlice.ts
import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  units?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  adminNavmenuIsOpen?: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  adminNavmenuIsOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    incrementQuantity: (state, action: PayloadAction<Number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<Number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleAdminNavmenu: (state) => {
      state.adminNavmenuIsOpen = !state.adminNavmenuIsOpen;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  closeCart,
  openCart,
  clearCart,
  toggleAdminNavmenu,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cartReducer.items;
export const selectIsCartOpen = (state: RootState) => state.cartReducer.isOpen;
export const selectAdminNavmenuIsOpen = (state: RootState) =>
  state.cartReducer.adminNavmenuIsOpen;
export const selectCartTotalCount = (state: RootState) =>
  state.cartReducer.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
