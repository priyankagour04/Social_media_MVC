import React, { useState } from 'react';
import {useSendFollowRequestMutation} from '../../services/api/followRequestApi'

const FollowBtn = ({ username, initialFollowStatus }) => {
  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const [sendFollowRequest, { isLoading }] = useSendFollowRequestMutation();
  const handleFollowClick = async () => {
    try {
      // Only allow if the status is not already 'Following' or 'Requested'
      if (followStatus === 'Follow') {
        const response = await sendFollowRequest({ username }).unwrap(); // Send the follow request

        // Check if the follow request was sent successfully
        if (response?.message === 'Follow request sent successfully') {
          setFollowStatus('Requested'); // Update the status to 'Requested'
        }
      } else if (followStatus === 'Requested') {
        // Handle un-follow or cancel request logic (optional)
      } else if (followStatus === 'Following') {
        // Handle unfollow logic here if required
      }
    } catch (error) {
      console.error('Error sending follow request:', error);
    }
  };

  return (
    <button 
      className="btn btn-primary" 
      onClick={handleFollowClick} 
      disabled={isLoading}
    >
      {followStatus === 'Follow' ? 'Follow' : followStatus}
    </button>
  );
};

export default FollowBtn;
