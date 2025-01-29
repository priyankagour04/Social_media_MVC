import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import PostCard from "../../components/post/PostCard";
import { useGetProfileQuery } from "../../services/api/profileApi";
import { useGetUserPostsQuery } from "../../services/api/postApi"; 
import CreatePost from "../../components/post/CreatePost";


const ViewProfile = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");

  const { data: profileData, error: profileError, isLoading: isLoadingProfile } = useGetProfileQuery(username); // Fetch profile data using the username
  const { data: postsData, error: postsError, isLoading: isLoadingPosts } = useGetUserPostsQuery(); // Fetch user's posts

  useEffect(() => {
    if (!token) {
      navigate("/"); // If no token, redirect to login
    }

    if (profileData) {
      setUser(profileData); // Set user data retrieved from the API
    }
  }, [profileData, token, navigate]);

  if (isLoadingProfile || isLoadingPosts) return <p>Loading...</p>;
  if (profileError) return <p>Error: {profileError.message}</p>;
  if (postsError) return <p>Error: {postsError.message}</p>;

  if (!user) {
    return <p>No user found</p>;
  }

  const handleEditProfile = () => {
    navigate(`/edit-profile/${username}`); // Navigate to the EditProfile page with the username as a route param
  };

  return (
    <div className="min-vh-100 container my-5 rounded-lg">
      {/* Profile Section */}
      <div className="d-flex justify-content-around">
        <div className="position-relative text-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="rounded-circle border-5 border-white shadow-lg"
            style={{ width: "110px", height: "110px" }}
          />
          <h2 className="fw-bold mt-4" style={{ fontSize: "20px" }}>
            {user.username}
          </h2>
          <p className="text-muted mt-2 fw-semibold">{user.bio || "No bio available"}</p>
        </div>

        <div className="ml-4">
          <div className="d-flex justify-content-between mt-4 gap-5">
            <div className="text-center">
              <h4 className="font-weight-bold">{user.posts?.length || 0}</h4>
              <p className="text-muted">Posts</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">{user.followers?.length || 0}</h4>
              <p className="text-muted">Followers</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">{user.following?.length || 0}</h4>
              <p className="text-muted">Following</p>
            </div>
          </div>
          <button
            className="btn bg-secondary text-white px-4 mt-5 w-100 py-2 "
            onClick={handleEditProfile} // On click, navigate to edit profile
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>
      <hr />

      {/* Recent Posts Section */}
      <div className="my-5">
        {/* Button to open the modal */}
          {/* Modal for creating a post */}
      <CreatePost showModal={showModal} setShowModal={setShowModal} /> {/* Pass state to CreatePost */}
        <PostCard posts={postsData || []} /> {/* Render the posts fetched by `getUserPosts` */}
      </div>

   
    </div>
  );
};

export default ViewProfile;
