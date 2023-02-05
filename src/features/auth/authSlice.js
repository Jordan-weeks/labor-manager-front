import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loggedIn: false, userData: {}, userId: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setUserId: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
      state.loggedIn = true;
    },
    setUserData: (state, action) => {
      const userData = action.payload;
      state.loggedIn = true;
      state.userData = userData;
    },

    logout: (state, action) => {
      state.token = null;
      state.userData = {};
      state.loggedIn = false;
      state.userId = "";
    },
  },
});

export const { setCredentials, setUserData, setUserId, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectUserData = (state) => state.auth.userData;
export const selectUserId = (state) => state.auth.userId;
