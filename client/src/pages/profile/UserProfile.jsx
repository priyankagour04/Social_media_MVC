import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import { useGetUserProfileQuery } from "../../services/api/profileApi";
import { useGetUserPostsByUsernameQuery } from "../../services/api/postApi";
import FollowBtn from "../../components/Commanbtn/followBtn";

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

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    if (profileData && profileData.receivedRequests?.includes(loggedInUser?.id)) {
      setFollowStatus("Requested");
    } else if (profileData?.followers?.includes(loggedInUser?.id)) {
      setFollowStatus("Following");
    } else {
      setFollowStatus("Follow");
    }
  }, [profileData, loggedInUser]);

  if (isLoadingProfile || isLoadingPosts) return <p>Loading...</p>;
  if (profileError) return <p className="text-danger">Error: {profileError.message}</p>;
  if (postsError) return <p className="text-danger">Error: {postsError.message}</p>;

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
    </div>
  );
};

export default UserProfile;
