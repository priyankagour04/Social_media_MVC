// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import authReducer from "../slices/authSlice";
import { profileApi } from "../../services/api/profileApi";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, profileApi.middleware), // Add the profile API middleware as well
});

export default store;
