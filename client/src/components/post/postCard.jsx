import React from "react";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";

const PostCard = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="mb-3 post-card shadow-lg rounded-3">
          <div className="card-body">
            {/* User Avatar */}
            <div className="d-flex">
              <img
                src={
                  post.user?.profilePicture || "https://via.placeholder.com/50"
                }
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
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "250px",
                      width: "500px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Post Content */}
              <p className="card-text">{post.content || "No content"}</p>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="post-tags mt-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Interactions */}
              <div className="d-flex justify-content-between">
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
