import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the username from the URL
import { FaEdit } from "react-icons/fa";
import PostCard from "../../components/post/PostCard";
import { useGetProfileQuery } from "../../services/api/profileApi";
import profileImg from "../../assets/userProfile.jpg";
import EditProfile from "./EditProfile";

const ViewProfile = () => {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between routes

  const token = localStorage.getItem("jwtToken");

  const { data, error, isLoading } = useGetProfileQuery(username); // Fetch profile data using the username

  useEffect(() => {
    if (!token) {
      navigate("/"); // If no token, redirect to login
    }
    if (data) {
      setUser(data); // Set the user data retrieved from API
    }
  }, [data, token, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!user) {
    return <p>No user found</p>;
  }

  const handleEditProfile = () => {
    navigate(`/edit-profile/${username}`); // Navigate to the EditProfile page with the username as a route param
  };

  return (
    <div className="min-vh-100 container my-5 rounded-lg">
      {/* Profile Section */}
      <div className="d-flex align-items-center justify-content-around">
        <div className="position-relative text-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="rounded-circle border-5 border-white shadow-lg"
            style={{ width: "160px", height: "160px" }}
          />
          <h2 className="fw-bold mt-4" style={{ fontSize: "20px" }}>
            {user.username}
          </h2>
          <p className="mt-3">Indore, Madhya Pradesh</p>
          <button
            className="btn bg-secondary text-white px-4 py-2 "
            onClick={handleEditProfile} // On click, navigate to edit profile
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>

        <div className="ml-4">
          <p className="text-muted">{user.bio || "No bio available"}</p>

          <div className="d-flex justify-content-between mt-4 gap-5">
            <div className="text-center">
              <h4 className="font-weight-bold">{user.posts?.length || 0}</h4>
              <p className="text-muted">Posts</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">
                {user.followers?.length || 0}
              </h4>
              <p className="text-muted">Followers</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">
                {user.following?.length || 0}
              </h4>
              <p className="text-muted">Following</p>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      {/* Recent Posts Section */}
      <div className="my-5">
        <h3 className="font-weight-bold mb-4">Recent Posts</h3>
        <PostCard posts={user.posts || []} />
      </div>
    </div>
  );
};

export default ViewProfile;
