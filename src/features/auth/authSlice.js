import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loggedIn: false, userEmail: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    loginState: (state, action) => {
      const { email } = action.payload;
      state.userEmail = email;
      state.loggedIn = true;
    },
    logOut: (state, action) => {
      state.token = null;
      state.userEmail = "";
      state.loggedIn = false;
    },
  },
});

export const { setCredentials, loginState, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
