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
          "productId",
          action.payload.productId,
          "size",
          action.payload.size,
        )
      ) {
        state.cartItems = state.cartItems.map((cartItem: CartItem) => {
          if (
            cartItem["productId"] === action.payload.productId &&
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
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
