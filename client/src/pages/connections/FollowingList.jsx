import React from "react";
import { useGetFollowingQuery } from "../../services/api/followRequestApi";
import "bootstrap/dist/css/bootstrap.min.css";

const FollowingList = () => {
  const { data, error, isLoading } = useGetFollowingQuery();

  console.log("API Response:", data); // Debugging API Response

  if (isLoading) {
    return <div className="text-center fw-bold mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger fw-bold mt-4">Error: {error.message || "Something went wrong"}</div>;
  }

  // Handle API response
  const followingUsers = Array.isArray(data) ? data : data?.following || [];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="text-center">
          <h2 className="p-3 mb-0"
           style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--white)",
          }}
          >Following List</h2>
        </div>
        <div className="card-body">
          {followingUsers.length > 0 ? (
            <ul className="list-group">
              {followingUsers.map((user) => (
                <li key={user.id || user._id} className="list-group-item d-flex align-items-center">
                  {/* Profile Image Container */}
                  <div
                    className="rounded-circle border overflow-hidden d-flex justify-content-center align-items-center me-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <img
                      src={user.profilePicture || "/default-avatar.png"}
                      alt={user.username || "User"}
                      className="rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* User Details */}
                  <div>
                    <h5 className="mb-0">{user.name || user.username}</h5>
                    <small className="text-muted">@{user.username || "username"}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No following users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
