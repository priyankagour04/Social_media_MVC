import React, { useState } from "react";
import { useGetFollowRequestQuery, useAcceptFollowRequestMutation } from "../../services/api/followRequestApi";
import { handleSuccess, handleError } from "../../utility/toster/Tostify"; 
const FollowReqList = () => {
  const { data, error, isLoading } = useGetFollowRequestQuery();
  const [acceptFollowRequest, { isLoading: isAccepting, error: acceptError }] = useAcceptFollowRequestMutation();
  const [requests, setRequests] = useState(data || []); // State to manage the list of requests locally

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!requests || requests.length === 0) {
    return <div>No follow requests found</div>;
  }

  const handleAccept = async (username) => {
    try {
      // Call the accept API
      await acceptFollowRequest({ username }).unwrap();

      // Show success toast notification
      handleSuccess(`Follow request from ${username} accepted!`);

      // Remove the accepted request from the list
      setRequests((prevRequests) => prevRequests.filter((request) => request.username !== username));
    } catch (err) {
      // Show error toast notification
      handleError(`Error accepting request from ${username}`);
      console.error("Error accepting follow request:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Follow Requests</h3>
      <div className="mt-3">
        {requests.map((request) => (
          <div
            key={request._id}
            className="d-flex justify-content-between align-items-center p-3"
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={request.profilePicture || "default-avatar.jpg"} // Fallback if no profile picture
                alt={`${request.username}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px" }}
              />
              <span>{request.username}</span>
            </div>
            <button
              onClick={() => handleAccept(request.username)} // Pass the username to the handler
              className="btn btn-primary btn-sm"
              disabled={isAccepting} // Disable button when accepting
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </button>
          </div>
        ))}
      </div>
      {acceptError && <div className="alert alert-danger mt-3">{acceptError.message}</div>}
    </div>
  );
};

export default FollowReqList;
