"use client";

import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  email: string;
  roles: Array<String>;
}

export interface UserDetails {
  access_token: string;
  refresh_token: string;
  loggedIn: boolean;

  userID: string;
  userEmail: string;
  isAdmin: boolean;
  isShopAdmin: boolean;
  isCustomer: boolean;
  userAvatarUrl: string;

  forgotPasswordEmail: string;
}

const initialState: UserDetails = {
  access_token: "",
  refresh_token: "",
  loggedIn: false,

  userID: "",
  userEmail: "",
  isAdmin: false,
  isShopAdmin: false,
  isCustomer: false,
  userAvatarUrl: "",

  forgotPasswordEmail: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;

      const userData: UserData = JSON.parse(action.payload.user);
      if (userData) {
        state.userID = userData.id;
        state.userEmail = userData.email;

        state.isAdmin = userData.roles.includes("Admin".toLowerCase());
        state.isShopAdmin = userData.roles.includes("ShopAdmin".toLowerCase());
        state.isCustomer = userData.roles.includes("Customer".toLowerCase());
      }
    },
    setAvatarUrl: (state, action) => {
      state.userAvatarUrl = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
    setForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload.email;
    },
    removeForgotPasswordEmail: (state) => {
      state.forgotPasswordEmail = "";
    },
    setTokensAfterRefresh: (state, action) => {
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;
    },
  },
});

export const {
  login,
  logout,
  setForgotPasswordEmail,
  removeForgotPasswordEmail,
  setAvatarUrl,
  setTokensAfterRefresh,
} = userSlice.actions;

export default userSlice.reducer;
