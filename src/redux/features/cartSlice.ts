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
      if (
        objectExistsWithTwoSameKeyValues(
          state.cartItems,
          "product",
          action.payload.product,
          "size",
          action.payload.size,
        )
      ) {
        state.cartItems = state.cartItems.map((cartItem: CartItem) => {
          if (
            cartItem["product"] === action.payload.product &&
            cartItem.size === action.payload.size
          ) {
            return {
              ...cartItem,
              quantity: action.payload.quantity,
            };
          }
          return cartItem;
        });
        return;
      }
      state.cartItems = [...state.cartItems, action.payload];
      state.numberOfItems = state.cartItems.length;
    },
    clearCart: () => {
      return initialState;
    },
    setCartOnLogin: (state, action) => {
      state.cartItems = [...action.payload];
      state.numberOfItems = state.cartItems.length;
    },
  },
});

export const { addToCart, clearCart, setCartOnLogin } = cartSlice.actions;

export default cartSlice.reducer;
