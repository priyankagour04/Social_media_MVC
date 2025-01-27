import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NotificationItem = ({ notification }) => {
  return (
    <div className="my-3">
      <Card className="shadow-sm rounded-lg">
        <Card.Body>
          <Card.Title style={{ color: "var(--text-primary)" }}>
            {notification.title}
          </Card.Title>
          <Card.Text style={{ color: "var(--text-secondary)" }}>
            {notification.message}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <small style={{ color: "var(--text-muted)" }}>{notification.timestamp}</small>
            <Button
              variant="link"
              style={{
            
                textDecoration: "none"
              }}
            >
              Mark as read
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotificationItem;
