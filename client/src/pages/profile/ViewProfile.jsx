  import React from "react";
  import { FaEdit } from "react-icons/fa";
  import PostCard from "../../components/post/PostCard";

  const ViewProfile = () => {

    
    const user = {
      username: "John Doe",
      email: "johndoe@example.com",
      bio: "Passionate about web development, with over 8 years of experience in designing and creating responsive web applications.",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      followers: 1200,
      following: 350,
      posts: [
        {
          id: 1,
          username: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          image: "https://via.placeholder.com/500x300",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          timestamp: "2025-01-25 12:30:00",
          tags: ["#webdev", "#javascript"],
          likes: 220,
          comments: 15,
        },
        {
          id: 2,
          username: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          image: "https://via.placeholder.com/500x300",
          content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          timestamp: "2025-01-24 10:30:00",
          tags: ["#coding", "#react"],
          likes: 150,
          comments: 7,
        },
        {
          id: 3,
          username: "Sam Brown",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          image: "https://via.placeholder.com/500x300",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          timestamp: "2025-01-23 08:15:00",
          tags: ["#html", "#css"],
          likes: 180,
          comments: 10,
        },
      ],
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    };

    return (
      <div className="min-vh-100">
        <div className="container my-5 rounded-lg">
          {/* Profile Section */}
          <div className="d-flex align-items-center gap-5">
            {/* Profile Picture */}
            <div className="position-relative">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded-circle border-5 border-white shadow-lg"
                style={{ width: "160px", height: "160px" }}
              />
              <h2 className="fw-bold mt-2 text-center" style={{ fontSize: "22px", color: "#333" }}>
                {user.username}
              </h2>
            </div>

            {/* Profile Info and Stats */}
            <div className="ml-4">
              <p className="text-muted font-weight-semibold">{user.bio}</p>
              <p className="text-muted mb-3">Based in New York, USA</p>

              {/* Profile Stats */}
              <div className="d-flex justify-content-between mt-4">
                <div className="text-center">
                  <h4 className="font-weight-bold">{user.posts.length}</h4>
                  <p className="text-muted">Posts</p>
                </div>
                <div className="text-center">
                  <h4 className="font-weight-bold">{user.followers}</h4>
                  <p className="text-muted">Followers</p>
                </div>
                <div className="text-center">
                  <h4 className="font-weight-bold">{user.following}</h4>
                  <p className="text-muted">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="my-4 d-flex justify-content-start">
            <button className="btn bg-secondary text-white px-4 py-2">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          </div>

          {/* User Posts (Using PostCard) */}
        <div className="d-d-grid">
        <div className="my-5 grid col-6">
            <h3 className="font-weight-bold mb-4">Recent Posts</h3>
            <PostCard posts={user.posts} /> {/* Pass posts as props to PostCard */}
          </div>
        </div>
        </div>
      </div>
    );
  };

  export default ViewProfile;
