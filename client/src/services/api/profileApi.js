import { apiSlice } from "../../redux/slices/apiSlice";
import { getAccessToken } from "../../utility/auth/auth"; 

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "profile/edit", // your profile edit route
        method: "PUT",
        body: profileData,
        // Adding the Authorization header with JWT
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`, // Get the JWT token dynamically
        },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "profile", // no need for username here anymore, backend fetches it based on the JWT token
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`, // Using Authorization header for authentication
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
