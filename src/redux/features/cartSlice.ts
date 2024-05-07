"use client";

import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "@/utils/schema";
import { objectExistsWithTwoSameKeyValues } from "@/utils/Utils";

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
      const payload = action.payload;
      const existingCart = state.cartItems;

      const index = existingCart.findIndex((obj) => obj.id === payload.id);

      if (index !== -1) {
        // Cart item with matching ID found, replace it
        existingCart[index] = payload;
      } else {
        // Cart item with matching ID not found, append the new cart item
        existingCart.push(payload);
      }

      state.cartItems = [...existingCart];
      state.numberOfItems = state.cartItems.length;
    },
    clearCart: () => {
      return initialState;
    },
    setCartOnLogin: (state, action) => {
      state.cartItems = [...action.payload["cart_items"]];
      state.numberOfItems = state.cartItems.length;
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload,
      );
      state.numberOfItems = state.cartItems.length;
    },
  },
});

export const { addToCart, clearCart, setCartOnLogin, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
