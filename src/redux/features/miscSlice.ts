"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface MiscStateType {
  adminProductsCollapse: boolean;
  adminUserManagementCollapse: boolean;
}

const initialState: MiscStateType = {
  adminProductsCollapse: false,
  adminUserManagementCollapse: false,
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    toggleAdminProductsCollapse: (state) => {
      state.adminProductsCollapse = !state.adminProductsCollapse;
    },
    toggleUserManagementCollapse: (state) => {
      state.adminUserManagementCollapse = !state.adminUserManagementCollapse;
    },
  },
});

export const { toggleAdminProductsCollapse, toggleUserManagementCollapse } =
  miscSlice.actions;

export default miscSlice.reducer;
