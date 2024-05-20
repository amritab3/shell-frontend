"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface MiscStateType {
  adminProductsCollapse: boolean;
  adminUserManagementCollapse: boolean;
  prevRoute: string;

  chatUniqueId: string;
  chatFromId: string;
  chatToId: string;
}

const initialState: MiscStateType = {
  adminProductsCollapse: false,
  adminUserManagementCollapse: false,
  prevRoute: "",

  chatUniqueId: "",
  chatFromId: "",
  chatToId: "",
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
    setChatFromId: (state, action) => {
      state.chatFromId = action.payload;
    },
    setChatToId: (state, action) => {
      state.chatToId = action.payload;
    },
  },
});

export const {
  toggleAdminProductsCollapse,
  toggleUserManagementCollapse,
  setPreviousRoute,
  removePreviousRoute,

  setChatFromId,
  setChatToId,
} = miscSlice.actions;

export default miscSlice.reducer;
