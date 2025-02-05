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
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    // Accept Follow Request
    acceptFollowRequest: builder.mutation({
      query: ({ username }) => ({
        url: `follow/accept/${username}`,
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    rejectFollowRequest: builder.mutation({
      query: ({ username }) => ({
        url: `follow/reject/${username}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    // Get Follow Request (Received)
    getFollowRequest: builder.query({
      query: () => ({
        url: "follow/received-req",
        method: "GET",
      }),
    }),

    getFollowStatus: builder.query({
      query: (username) => ({
        url: `follow/status/${username}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    getFollowers: builder.query({
      query: () => ({
        url: "/follow/followers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    getFollowing: builder.query({
      query: () => ({
        url: "/follow/following",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useSendFollowRequestMutation,
  useAcceptFollowRequestMutation,
  useRejectFollowRequestMutation,
  useGetFollowRequestQuery,
  useGetFollowStatusQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = followApi;

export { followApi };
