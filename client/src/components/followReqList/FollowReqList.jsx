import React, { useEffect, useState } from "react";
import { useGetFollowRequestQuery, useAcceptFollowRequestMutation, useRejectFollowRequestMutation } from "../../services/api/followRequestApi";
import { handleSuccess, handleError } from "../../utility/toster/Tostify"; 
import { FaTimes } from "react-icons/fa";

const FollowReqList = () => {
  const { data, error, isLoading, refetch } = useGetFollowRequestQuery(); // Fetching follow requests
  const [acceptFollowRequest, { isLoading: isAccepting }] = useAcceptFollowRequestMutation();
  const [rejectFollowRequest, { isLoading: isRejecting }] = useRejectFollowRequestMutation();
  
  const [requests, setRequests] = useState([]);

  // Update local state whenever new data is fetched
  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!requests || requests.length === 0) return <div>No follow requests found</div>;

  const handleAccept = async (username) => {
    try {
      await acceptFollowRequest({ username }).unwrap();
      handleSuccess(`Follow request from ${username} accepted!`);
      refetch(); // Fetch the updated requests
    } catch (err) {
      handleError(`Error accepting request from ${username}`);
      console.error("Error accepting follow request:", err);
    }
  };

  const handleReject = async (username) => {
    try {
      await rejectFollowRequest({ username }).unwrap();
      handleSuccess(`Follow request from ${username} rejected!`);
      refetch(); // Fetch the updated requests
    } catch (err) {
      handleError(`Error rejecting request from ${username}`);
      console.error("Error rejecting follow request:", err);
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
                src={request.profilePicture || "default-avatar.jpg"}
                alt={`${request.username}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px" }}
              />
              <span>{request.username}</span>
            </div>
            <button
              onClick={() => handleAccept(request.username)}
              className="btn btn-primary btn-sm"
              disabled={isAccepting}
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </button>
            <button
              onClick={() => handleReject(request.username)}
              className="btn btn-danger btn-sm ms-2"
              disabled={isRejecting}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowReqList;
