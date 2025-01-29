import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/home.css"; 
import PostCard from "../../components/post/PostCard";
import { useGetPostsQuery } from "../../services/api/postApi";

const Home = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  return (
    <div className="min-vh-100">
      <main className="container my-4">
        {/* Create Post Section */}
        <div className="card mb-4 rounded-3">
          <div className="card-body">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="What's on your mind?"
              style={{ color: "var(--text-primary)" }}
            ></textarea>
            <button className="btn float-end" style={{ backgroundColor: "var(--primary-color)", color: "var(--white)" }}>
              Post
            </button>
          </div>
        </div>

        {/* Posts Grid Layout */}
        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Failed to load posts.</p>}
        {posts && posts.length > 0 ? (
          <div className="row g-3">
            {posts.map((post) => (
              <div key={post.id} className="col-md-4"> {/* Two columns per row */}
                <PostCard posts={[post]} />  
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <p>No posts available</p>
        )}
      </main>
    </div>
  );
};

export default Home;
