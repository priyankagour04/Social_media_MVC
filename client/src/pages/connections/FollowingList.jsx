import React from "react";
import { useGetFollowingQuery } from "../../services/api/followRequestApi";
import {
  Container,
  ListGroup,
  Image,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

const FollowingList = () => {
  const { data, error, isLoading } = useGetFollowingQuery();

  if (isLoading)
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">Error loading following list</Alert>;

  // Ensure the response is an array before mapping
  const followingUsers = Array.isArray(data?.following) ? data.following : [];

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <Card.Header
          className="text-center fw-bold"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--white)",
          }}
        >
          Following List
        </Card.Header>
        <Card.Body>
          {followingUsers.length > 0 ? (
            <ListGroup variant="flush">
              {followingUsers.map((user) => (
                <ListGroup.Item
                  key={user._id}
                  className="d-flex align-items-center gap-3 py-2 border-bottom"
                >
                  {/* Profile Image Wrapper */}
                  <div
                    className="rounded-circle border overflow-hidden d-flex justify-content-center align-items-center"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <Image
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

                  {/* User Info */}
                  <div>
                    <h6 className="mb-1 fw-bold">{user.name || user.username}</h6>

                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info" className="text-center">
              You are not following anyone.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FollowingList;
