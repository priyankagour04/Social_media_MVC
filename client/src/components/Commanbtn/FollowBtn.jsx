import React, { useState, useEffect } from "react";
import { useSendFollowRequestMutation } from "../../services/api/followRequestApi";

const FollowBtn = ({ username, initialFollowStatus }) => {
  const [sendFollowRequest, { isLoading }] = useSendFollowRequestMutation();
  const [buttonText, setButtonText] = useState(initialFollowStatus);

  useEffect(() => {
    setButtonText(initialFollowStatus);
  }, [initialFollowStatus]);

  const handleFollowRequest = async () => {
    if (!username) {
      console.error("Error: Username is missing.");
      alert("Invalid user. Please try again.");
      return;
    }

    try {
      const response = await sendFollowRequest(username).unwrap();
      console.log("Follow Request Response:", response);

      if (response.message === "User not found.") {
        alert("User not found. Please check the username.");
        return;
      }

      setButtonText("Requested");
    } catch (error) {
      console.error("Error sending follow request:", error);
      alert(error?.data?.message || "Failed to send follow request.");
    }
  };

  return (
    <button
      onClick={handleFollowRequest}
      disabled={isLoading || buttonText === "Requested"}
      className="btn bg-primary text-white px-4 mt-5 w-100 py-2"
    >
      {isLoading ? "Sending..." : buttonText}
    </button>
  );
};

export default FollowBtn;
