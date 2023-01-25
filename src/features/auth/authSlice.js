import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loggedIn: false, userData: {} },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setUserData: (state, action) => {
      const { userData } = action.payload;
      console.log(userData);
      state.loggedIn = true;
      state.userData = userData;
    },

    logOut: (state, action) => {
      state.token = null;
      state.userEmail = "";
      state.loggedIn = false;
    },
  },
});

export const { setCredentials, setUserData, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectUserData = (state) => state.auth.userData;
