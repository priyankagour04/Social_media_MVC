import React from 'react';
import { FaThumbsUp, FaCommentDots } from 'react-icons/fa';

const PostCard = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className= " mb-3 post-card shadow-lg rounded-3">
          <div className="card-body d-flex">
            <img
              src={post.avatar}
              alt="User"
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div className="post-content">
              <h5 className="card-title">{post.username}</h5>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="img-fluid my-2 rounded"
                />
              )}
              <p className="card-text">{post.content}</p>
              <small className="text-muted">{post.timestamp}</small>

              {/* Tags */}
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactions */}
              <div className="post-interactions mt-3 d-flex justify-content-between">
                <div className="likes">
                  <FaThumbsUp size={18} /> {post.likes} Likes
                </div>
                <div className="comments">
                  <FaCommentDots size={18} /> {post.comments} Comments
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCard;
