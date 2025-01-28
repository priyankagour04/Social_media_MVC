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
      query: (us) => ({
        url: "profile",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
