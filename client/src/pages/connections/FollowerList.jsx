import React from "react";
import { useGetFollowersQuery } from "../../services/api/followRequestApi";
import {
  Container,
  ListGroup,
  Image,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

const FollowerList = () => {
  const { data, error, isLoading } = useGetFollowersQuery();

  if (isLoading)
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">Error loading followers</Alert>;

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
          Followers
        </Card.Header>
        <Card.Body>
          {data?.followers?.length > 0 ? (
            <ListGroup variant="flush">
              {data.followers.map((follower) => (
                <ListGroup.Item
                  key={follower._id}
                  className="d-flex align-items-center gap-3 py-2 border-bottom"
                >
              
                  <div
                    className="rounded-circle border overflow-hidden d-flex justify-content-center align-items-center"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <Image
                      src={follower.profilePicture || "/default-avatar.png"}
                      alt={follower.username}
                      className="rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Follower Info */}
                  <div>
                    <h6 className="mb-1 fw-bold">{follower.username}</h6>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info" className="text-center">
              No followers yet.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FollowerList;
