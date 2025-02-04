import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import PostCard from "../../components/post/PostCard";
import { useGetProfileQuery } from "../../services/api/profileApi";
import { useGetUserPostsQuery } from "../../services/api/postApi";
import CreatePost from "../../components/post/CreatePost";
import FollowReqList from "../../components/followReqList/FollowReqList";

const ViewProfile = () => {
  const [showModal, setShowModal] = useState(false); // Manage modal visibility here
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const {
    data: profileData,
    error: profileError,
    isLoading: isLoadingProfile,
  } = useGetProfileQuery(username);
  const {
    data: postsData,
    error: postsError,
    isLoading: isLoadingPosts,
  } = useGetUserPostsQuery();

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if no token
    }

    if (profileData) {
      setUser(profileData); // Set user data retrieved from API
    }
  }, [profileData, token, navigate]);

  if (isLoadingProfile || isLoadingPosts) return <p>Loading...</p>;
  if (profileError) return <p>Error: {profileError.message}</p>;
  if (postsError) return <p>Error: {postsError.message}</p>;

  if (!user) {
    return <p>No user found</p>;
  }

  const handleEditProfile = () => {
    navigate(`/edit-profile/${username}`);
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
          <p className="text-muted mt-2 fw-semibold">
            {user.bio || "No bio available"}
          </p>
        </div>

        <div className="ml-4">
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
          <button
            className="btn bg-secondary text-white px-4 mt-5 w-100 py-2"
            onClick={handleEditProfile}
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>
      <hr />

      {/* Recent Posts Section */}
      <Row>
      <Col lg={7} md={12} className="mb-3">
        <CreatePost showModal={showModal} setShowModal={setShowModal} />
        <PostCard posts={postsData || []} />
      </Col>
      <Col lg={5} md={12} className="d-none d-lg-block px-5">
        <FollowReqList />
      </Col>
    </Row>
    </div>
  );
};

export default ViewProfile;
