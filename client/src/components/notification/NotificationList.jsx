import React from 'react';
import { Container } from 'react-bootstrap';
import NotificationItem from './NotificationItem';

const NotificationsList = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Comment on Your Post',
      message: 'Someone has commented on your recent post. Check it out!',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'New Follower',
      message: 'You have a new follower. Follow them back!',
      timestamp: '1 day ago',
    },
    {
      id: 3,
      title: 'Friend Request Accepted',
      message: 'Your friend request has been accepted by Jane Doe.',
      timestamp: '3 days ago',
    },
  ];

  return (
    <Container className="p-5">
      <h3>Notifications</h3>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </Container>
  );
};

export default NotificationsList;
