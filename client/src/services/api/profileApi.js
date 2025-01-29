import { apiSlice } from "../../redux/slices/apiSlice";
import { getAccessToken } from "../../utility/auth/auth"; 

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: `profile/edit/${profileData.userId}`,
        method: "PUT",
        body: profileData,
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
        },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`, // Using Authorization header for authentication
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
