// services/api/followRequestApi.js
import { apiSlice } from "../../redux/slices/apiSlice";
import { getAccessToken } from "../../utility/auth/auth";

const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Send Follow Request
    sendFollowRequest: builder.mutation({
      query: ({ username }) => ({
        url: `follow/send/${username}`,
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Include auth token
        },
      }),
    }),

    // Accept Follow Request
    acceptFollowRequest: builder.mutation({
      query: ({ username }) => ({
        url: "follow/accept",
        method: "POST",
        body: { username },
      }),
    }),

    // Reject Follow Request
    rejectFollowRequest: builder.mutation({
      query: ({ username }) => ({
        url: "follow/reject",
        method: "POST",
        body: { username },
      }),
    }),

    // Get Follow Request (Received)
    getFollowRequest: builder.query({
      query: () => ({
        url: "follow/received-req",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendFollowRequestMutation,
  useAcceptFollowRequestMutation,
  useRejectFollowRequestMutation,
  useGetFollowRequestQuery,
} = followApi;

export { followApi };
