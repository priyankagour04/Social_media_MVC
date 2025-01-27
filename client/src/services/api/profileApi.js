import { apiSlice } from "../../redux/slices/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "profile/edit",
        method: "PUT",
        body: profileData,
      }),
    }),
    getProfile: builder.query({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
