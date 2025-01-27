import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/home.css"; // Ensure this imports global theme styles
import PostCard from "../../components/post/PostCard";
import Navbar from '../../components/navbar/navbar'

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "John Doe",
      content: "This is my first post! #HelloWorld",
      timestamp: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      image: "https://via.placeholder.com/600x300",
      tags: ["#HelloWorld", "#NewPost"],
      likes: 15,
      comments: 4,
    },
    {
      id: 2,
      username: "Jane Smith",
      content: "Had an amazing day at the beach! 🏖️ #SummerVibes",
      timestamp: "5 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      image: "https://via.placeholder.com/600x300",
      tags: ["#SummerVibes", "#BeachDay"],
      likes: 25,
      comments: 12,
    },
  ]);

  const handleNavigation = (destination) => {
    navigate(destination);
  };

  return (
    <div className="min-vh-100" >

      {/* Main Content */}
      <main className="container my-4">
        {/* Create Post Section */}
        <div
          className="card mb-4 rounded-3"
         
        >
          <div className="card-body">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="What's on your mind?"
              style={{
          
                color: "var(--text-primary)",
              }}
            ></textarea>
            <button className="btn float-end" style={{ backgroundColor: "var(--primary-color)", color: "var(--white)" }}>
              Post
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <PostCard posts={posts} />
      </main>

      {/* Bottom Navigation */}
      {/* <nav
        className="navbar fixed-bottom border-top"
        style={{ backgroundColor: "var(--card-background)" }}
      >
        <div className="container d-flex justify-content-around">
          <button
            className="btn btn-link"
            style={{ color: "var(--primary-color)" }}
            onClick={() => handleNavigation("/notifications")}
          >
            <FaBell size={20} />
          </button>
          <button
            className="btn btn-link"
            style={{ color: "var(--primary-color)" }}
            onClick={() => handleNavigation("/search")}
          >
            <FaSearch size={20} />
          </button>
          <button
            className="btn btn-link"
            style={{ color: "var(--primary-color)" }}
            onClick={() => handleNavigation("/profile")}
          >
            <FaUserCircle size={20} />
          </button>
        </div>
      </nav> */}
    </div>
  );
};

export default Home;
