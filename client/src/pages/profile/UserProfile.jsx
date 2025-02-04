import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import { useGetUserProfileQuery } from "../../services/api/profileApi";
import { useGetUserPostsByUsernameQuery } from "../../services/api/postApi";

import FollowBtn from "../../components/Commanbtn/followBtn";
import { useGetFollowStatusQuery } from "../../services/api/followRequestApi";

const UserProfile = () => {
  const { username } = useParams(); 
  const navigate = useNavigate();
  const [followStatus, setFollowStatus] = useState("Follow");

  // Get the logged-in user data from Redux
  const loggedInUser = useSelector((state) => state.auth.user);

  // Fetch user profile data using RTK Query
  const {
    data: profileData,
    error: profileError,
    isLoading: isLoadingProfile,
  } = useGetUserProfileQuery({ username });

  // Fetch user posts data using RTK Query
  const {
    data: postsData,
    error: postsError,
    isLoading: isLoadingPosts,
  } = useGetUserPostsByUsernameQuery(username);

  // Fetch the follow status using RTK Query
  const { data: followData, error: followError, isLoading: isLoadingFollow } = useGetFollowStatusQuery(username);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    if (followData) {
      setFollowStatus(followData.status); // Set the follow status from the API response
    }
  }, [followData]);

  if (isLoadingProfile || isLoadingPosts || isLoadingFollow) return <p>Loading...</p>;
  if (profileError) return <p className="text-danger">Error: {profileError.message}</p>;
  if (postsError) return <p className="text-danger">Error: {postsError.message}</p>;
  if (followError) return <p className="text-danger">Error: {followError.message}</p>;

  if (!profileData) return <p className="text-warning">No user found</p>;

  return (
    <div className="min-vh-100 container my-5 rounded-lg">
      {/* Profile Section */}
      <div className="d-flex justify-content-around">
        <div className="position-relative text-center">
          <img
            src={profileData.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-circle border-5 border-white shadow-lg"
            style={{ width: "110px", height: "110px" }}
          />
          <h2 className="fw-bold mt-4" style={{ fontSize: "20px" }}>
            {profileData.username}
          </h2>
          <p className="text-muted mt-2 fw-semibold">
            {profileData.bio || "No bio available"}
          </p>
        </div>

        <div className="ml-4">
          <div className="d-flex justify-content-between mt-4 gap-5">
            <div className="text-center">
              <h4 className="font-weight-bold">{profileData.posts?.length || 0}</h4>
              <p className="text-muted">Posts</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">{profileData.followers?.length || 0}</h4>
              <p className="text-muted">Followers</p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">{profileData.following?.length || 0}</h4>
              <p className="text-muted">Following</p>
            </div>
          </div>
          {/* Follow Button Component */}
          {loggedInUser?.id !== profileData.id && (
            <FollowBtn username={profileData.username} initialFollowStatus={followStatus} />
          )}
        </div>
      </div>
      <hr />

      {/* Only show posts if the user is following */}
      {followStatus === "Following" && (
        <div className="my-5">
          <div className="row g-3">
            {postsData?.length > 0 ? (
              postsData.map((post) => (
                <div className="col-lg-6" key={post._id}>
                  <PostCard posts={[post]} />
                </div>
              ))
            ) : (
              <p className="text-muted text-center">No posts available</p>
            )}
          </div>
        </div>
      )}
      {/* Show a message when user is not following */}
      {followStatus !== "Following" && (
        <p className="text-muted text-center">Follow this user to view their posts</p>
      )}
    </div>
  );
};

export default UserProfile;
