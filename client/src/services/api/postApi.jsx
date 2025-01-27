import { apiSlice } from "../../redux/slices/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (postData) => ({
        url: "post/create",
        method: "POST",
        body: postData,
      }),
    }),

    // Endpoint: Edit Post
    editPost: builder.mutation({
      query: ({ id, postData }) => ({
        url: `post/edit/${id}`,
        method: "PUT",
        body: postData,
      }),
    }),

    // Endpoint: Delete Post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // Endpoint: Get All Posts
    getPosts: builder.query({
      query: () => "post/all",
    }),

    // Endpoint: Like Post
    likePost: builder.mutation({
      query: (postId) => ({
        url: `post/like/${postId}`,
        method: "PATCH",
      }),
    }),

    // Endpoint: Unlike Post
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `post/unlike/${postId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
