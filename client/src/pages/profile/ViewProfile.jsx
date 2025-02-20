import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import PostCard from "../../components/post/PostCard";
import { useGetProfileQuery } from "../../services/api/profileApi";
import { useGetUserPostsQuery } from "../../services/api/postApi";
import CreatePost from "../../components/post/CreatePost";
import FollowReqList from "../../components/followReqList/FollowReqList";
import FollowerList from "../connections/FollowerList";
import FollowingList from "../connections/FollowingList"; 

const ViewProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("requests"); 
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
      navigate("/");
    }

    if (profileData) {
      setUser(profileData);
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
              <h4 className="font-weight-bold">{user.followers?.length || 0}</h4>
              <p
                className={`text-muted cursor-pointer ${activeTab === "followers" ? "fw-bold" : ""}`}
                onClick={() => setActiveTab("followers")}
                style={{ cursor: "pointer" }}
              >
                Followers
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-weight-bold">{user.following?.length || 0}</h4>
              <p
                className={`text-muted cursor-pointer ${activeTab === "following" ? "fw-bold" : ""}`}
                onClick={() => setActiveTab("following")}
                style={{ cursor: "pointer" }}
              >
                Following
              </p>
            </div>
            <div className="text-center">
            <h4 className="font-weight-bold">{user.receivedRequests?.length || 0}</h4>
              <p
                className={`text-muted cursor-pointer ${activeTab === "requests" ? "fw-bold" : ""}`}
                onClick={() => setActiveTab("requests")}
                style={{ cursor: "pointer" }}
              >
                Requests
              </p>
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

      <div>
        <CreatePost showModal={showModal} setShowModal={setShowModal} />
      </div>

      <Row className="mt-3">
        <Col lg={7} md={12}>
          <PostCard posts={postsData || []} />
        </Col>
        <Col lg={5} md={12} className="d-none d-lg-block px-5">
          {activeTab === "followers" ? (
            <FollowerList />
          ) : activeTab === "following" ? (
            <FollowingList />
          ) : (
            <FollowReqList />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ViewProfile;
