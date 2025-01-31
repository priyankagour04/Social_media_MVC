import { apiSlice } from "../../redux/slices/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `auth/verify-email/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyEmailQuery } = authApi;
