import { apiSlice } from "../../redux/slices/apiSlice";
import { getAccessToken } from "../../utility/auth/auth";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: `profile/edit-profile`, // Ensure your endpoint matches this
        method: "PUT",
        body: profileData,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    getUserProfile: builder.query({
      query: ({ username }) => ({
        url: `profile/user/${username}`, // Ensure this matches your backend route
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation, useGetUserProfileQuery } = profileApi;
