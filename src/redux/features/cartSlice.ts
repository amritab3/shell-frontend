"use client";

import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "@/utils/schema";

export interface Cart {
  cartItems: CartItem[];
  numberOfItems: number;
}

const initialState: Cart = {
  cartItems: [],
  numberOfItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      state.numberOfItems = state.cartItems.length;
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
