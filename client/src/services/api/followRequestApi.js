import { apiSlice } from "../../redux/slices/apiSlice";

const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint: Send Follow Request
    sendFollowRequest: builder.mutation({
      query: (username) => ({
        url: `follow/send/${username}`,
        method: "POST",
      }),
    }),

    // Endpoint: Accept Follow Request
    acceptFollowRequest: builder.mutation({
      query: (username) => ({
        url: `follow/accept/${username}`,
        method: "POST",
      }),
    }),

    // Endpoint: Reject Follow Request
    rejectFollowRequest: builder.mutation({
      query: (username) => ({
        url: `follow/reject/${username}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSendFollowRequestMutation,
  useAcceptFollowRequestMutation,
  useRejectFollowRequestMutation,
} = followApi;
