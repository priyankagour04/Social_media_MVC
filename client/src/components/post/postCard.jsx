import React, { useState } from "react";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";

const PostCard = ({ posts }) => {
  const maxTextHeight = 25; // Adjust the max height of text that is hidden
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post is expanded

  const handleReadMore = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null); // Collapse the post if already expanded
    } else {
      setExpandedPostId(postId); // Expand the selected post
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="mb-3 post-card shadow-lg rounded-3 h-100">
          <div className="card-body">
            {/* User Avatar */}
            <div className="d-flex">
              <img
                src={post.user?.profilePicture || "https://via.placeholder.com/50"}
                alt="User"
                className="rounded-circle me-3"
                width="40"
                height="40"
              />
              {/* Username */}
              <h5 className="card-title mt-2">
                {post.user?.username || "Anonymous"}
              </h5>
            </div>

            <div className="post-content">
              {/* Post Image (If Available) */}
              {post.image && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={post.image}
                    alt="Post"
                    className="img-fluid "
                    style={{
                      maxHeight: "250px",
                      width: "500px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <p
                className="card-text px-2"
                style={{
                  height: expandedPostId === post._id ? "auto" : `${maxTextHeight}px`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: expandedPostId === post._id ? "unset" : 2, // Show only 2 lines by default
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.content || "No content"}
              </p>

              {/* Read More button */}
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
                  <div className="likes">
                    <FaThumbsUp size={18} /> {post.likes?.length || 0} Likes
                  </div>
                  <div className="comments">
                    <FaCommentDots size={18} /> {post.comments?.length || 0}{" "}
                    Comments
                  </div>
                </div>
                <small className="text-muted mt-3">
                  {new Date(post.createdAt).toLocaleString()}
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
