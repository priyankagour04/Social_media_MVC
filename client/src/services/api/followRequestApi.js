import { apiSlice } from "../../redux/slices/apiSlice";

const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint: Send Follow Request
    sendFollowRequest: builder.mutation({
      query: (userId) => ({
        url: `follow/send/${userId}`,
        method: "POST",
      }),
    }),

    // Endpoint: Accept Follow Request
    acceptFollowRequest: builder.mutation({
      query: (requestId) => ({
        url: `follow/accept/${requestId}`,
        method: "POST",
      }),
    }),

    // Endpoint: Reject Follow Request
    rejectFollowRequest: builder.mutation({
      query: (requestId) => ({
        url: `follow/reject/${requestId}`,
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
