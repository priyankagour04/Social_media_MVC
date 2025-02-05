import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useLikePostMutation, useUnlikePostMutation, useGetPostsQuery } from "../../services/api/postApi";

const PostCard = ({ posts }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]); 
  const [likePost] = useLikePostMutation(); 
  const [unlikePost] = useUnlikePostMutation(); 

  const { data: postsData, refetch } = useGetPostsQuery(); // Fetch posts from server to sync like state

  useEffect(() => {
    // Sync liked posts from the server when the component is mounted
    if (postsData) {
      setLikedPosts(postsData.filter(post => post.likes.includes("currentUserId")).map(post => post._id));
    }
  }, [postsData]);

  const handleReadMore = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const toggleDropdown = (postId) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId);
  };

  const handleLike = async (postId) => {
    const currentUserId = "currentUserId"; // Replace with actual user ID from context or state

    if (likedPosts.includes(postId)) {
      // If the post is already liked, unlike it
      try {
        await unlikePost(postId).unwrap(); // Trigger unlike API call
        setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((id) => id !== postId)); // Remove from liked posts state
      } catch (error) {
        console.error("Error unliking post:", error);
      }
    } else {
      // If the post is not liked, like it
      try {
        await likePost(postId).unwrap(); // Trigger like API call
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]); // Add to liked posts state
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }

    // Refetch posts to ensure the like state is updated from the server
    await refetch();
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="mb-3 post-card shadow-lg rounded-3 position-relative">
          <div className="card-body">
            {/* User Avatar & Username */}
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src={post.user?.profilePicture || "https://via.placeholder.com/50"}
                  alt="User"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <h5 className="card-title mt-2">{post.user?.username || "Anonymous"}</h5>
              </div>

              {/* Dots Icon with Dropdown */}
              <div className="position-relative">
                <p className="cursor-pointer m-0" onClick={() => toggleDropdown(post._id)}>
                  <HiDotsVertical size={20} />
                </p>

                {openDropdownId === post._id && (
                  <div
                    className="position-absolute bg-white border rounded shadow p-2"
                    style={{
                      top: "100%",
                      right: "0",
                      minWidth: "120px",
                      zIndex: "10",
                    }}
                  >
                    <ul className="list-unstyled m-0">
                      <li className="py-1 px-3 cursor-pointer" onClick={() => alert("Edit Clicked")}>
                        Edit
                      </li>
                      <li className="py-1 px-3 cursor-pointer text-danger" onClick={() => alert("Delete Clicked")}>
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content">
              {post.image && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={post.image}
                    alt="Post"
                    className="img-fluid"
                    style={{
                      maxHeight: "350px",
                      width: "550px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <p
                className="card-text px-2"
                style={{
                  height: expandedPostId === post._id ? "auto" : "25px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: expandedPostId === post._id ? "unset" : 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.content || "No content"}
              </p>

              {post.content.length > 100 && (
                <button
                  className="btn btn-link py-0 px-2"
                  onClick={() => handleReadMore(post._id)}
                  style={{ textDecoration: "none" }}
                >
                  {expandedPostId === post._id ? "Read Less" : "Read More..."}
                </button>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="post-tags mt-2 px-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Interactions */}
              <div className="d-flex justify-content-between px-2">
                <div className="post-interactions mt-3 d-flex gap-5">
                  <div
                    className="likes"
                    onClick={() => handleLike(post._id)} // Toggle like/unlike when clicked
                    style={{
                      cursor: "pointer",
                    color: likedPosts.includes(post._id) ? "red" : "inherit", // Change color based on liked state
                    }}
                  >
                    <FaThumbsUp size={18} /> {post.likes?.length || 0} Likes
                  </div>
                  <div className="comments">
                    <FaCommentDots size={18} /> {post.comments?.length || 0} Comments
                  </div>
                </div>
                <small className="text-muted mt-3">
                  {new Date(post.createdAt).toLocaleString()} {/* Format this to your desired format */}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCard;
