import React from 'react'; 
import { useGetFollowRequestQuery } from '../../services/api/followRequestApi';

const FollowReqList = () => {
  const { data, error, isLoading } = useGetFollowRequestQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No follow requests found</div>;
  }

  return (
    <div>
      <h3>Follow Requests</h3>
      <ul>
        {data.map((request) => (
          <li key={request._id}>{request.username}</li>  // Adjust based on the actual structure of your request
        ))}
      </ul>
    </div>
  );
};

export default FollowReqList;
