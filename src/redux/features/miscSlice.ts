"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface MiscStateType {
  adminProductsCollapse: boolean;
  adminUserManagementCollapse: boolean;
  prevRoute: string;
}

const initialState: MiscStateType = {
  adminProductsCollapse: false,
  adminUserManagementCollapse: false,
  prevRoute: "",
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
    setPreviousRoute: (state, action) => {
      state.prevRoute = action.payload;
    },
    removePreviousRoute: (state) => {
      state.prevRoute = "";
    },
  },
});

export const {
  toggleAdminProductsCollapse,
  toggleUserManagementCollapse,
  setPreviousRoute,
  removePreviousRoute,
} = miscSlice.actions;

export default miscSlice.reducer;
