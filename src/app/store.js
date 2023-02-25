import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/jobs/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // needed for rtk query to cache results
  devTools: true, // swap to false with protection
});

setupListeners(store.dispatch);
