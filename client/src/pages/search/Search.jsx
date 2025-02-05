import React, { useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../style/search.css";
import { useGetUserProfileQuery } from "../../services/api/profileApi"; // ✅ Correct import

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch user profile using RTK Query
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserProfileQuery(
    { username: searchQuery }, // ✅ Pass an object, matching API slice
    { skip: !searchQuery } // ✅ Skip API call when searchQuery is empty
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      style={{
        background: "var(--card-background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="container p-5">
        <h2 className="font-weight-bold mb-4">Explorer Page</h2>

        {/* Search Bar */}
        <Form.Control
          type="text"
          placeholder="Search user by username..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />

        {/* Loading State */}
        {isLoading && <Spinner animation="border" />}

        {/* Error State */}
        {error && <p className="text-danger">User not found</p>}

        {/* Display User Profile if Found */}
        {user && (
          <Card
            className="p-3 mb-3 d-flex align-items-center"
            style={{
              cursor: "pointer",
              background: "var(--card-background)",
              display: "flex",
              flexDirection: "row",
              gap: "0px",
            }}
            onClick={() => navigate(`/profile/${user.username}`)} // ✅ Navigate to searched user's profile
          >
            <Card.Img
              variant="top"
              src={user.profilePicture || "https://via.placeholder.com/150"}
              alt={user.username}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onClick={(e) => {
                  e.stopPropagation(); // Prevents card click event from triggering
                  navigate(`/profile/user/${user.username}`); 
                }}
            />
            <Card.Body className="d-flex align-items-center">
              <Card.Title
                style={{
                  cursor: "pointer",
                  color: "var(--primary-color)",
                  fontSize: "1.2rem",
                  margin: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card click event from triggering
                  navigate(`/profile/user/${user.username}`); 
                }}
              >
                {user.username}
              </Card.Title>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explorer;
