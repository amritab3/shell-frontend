"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface MiscStateType {
  adminProductsCollapse: boolean;
}

const initialState: MiscStateType = {
  adminProductsCollapse: false,
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    toggleAdminProductsCollapse: (state) => {
      state.adminProductsCollapse = !state.adminProductsCollapse;
    },
  },
});

export const { toggleAdminProductsCollapse } = miscSlice.actions;

export default miscSlice.reducer;
