import { apiSlice } from "../../redux/slices/apiSlice";
import { getAccessToken } from "../../utility/auth/auth";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (postData) => ({
        url: "post/create",
        method: "POST",
        body: postData,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
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
      query: () => "post/allPosts",
    }),

    // Get User's Posts
    getUserPosts: builder.query({
      query: () => ({
        url: "post/getPost",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    // Endpoint: Like Post
    likePost: builder.mutation({
      query: (postId) => ({
      url: `/post/${postId}/like`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),

    // Endpoint: Unlike Post
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}/unlike`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),
    // Get Posts of a Specific User by Username
    getUserPostsByUsername: builder.query({
      query: (username) => ({
        url: `post/getUserPost/${username}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetUserPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetUserPostsByUsernameQuery
} = postApi;
