import React, { useState, useEffect } from "react";
import { 
  useSendFollowRequestMutation, 
  useGetFollowStatusQuery 
} from "../../services/api/followRequestApi";

const FollowBtn = ({ username }) => {
  // Fetch the initial follow status from API
  const { data: followStatusData, refetch } = useGetFollowStatusQuery(username);
  const [followStatus, setFollowStatus] = useState("Follow");
  
  const [sendFollowRequest, { isLoading }] = useSendFollowRequestMutation();

  useEffect(() => {
    if (followStatusData?.status) {
      setFollowStatus(followStatusData.status);
    }
  }, [followStatusData]);

  const handleFollowClick = async () => {
    try {
      if (followStatus === "Follow") {
        const response = await sendFollowRequest({ username }).unwrap();
        if (response?.message === "Follow request sent successfully") {
          setFollowStatus("Requested");  // Change status to "Requested" after request is sent
          refetch(); // Fetch the updated follow status
        }
      }
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  return (
    <button 
      className="btn btn-primary" 
      onClick={handleFollowClick} 
      disabled={isLoading || followStatus === "Following" || followStatus === "Requested"}
    >
      {isLoading ? "Processing..." : followStatus}
    </button>
  );
};

export default FollowBtn;
