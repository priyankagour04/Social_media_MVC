import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../../style/search.css';

const Explorer = () => {
  // Dummy data for Newly Added and Trending Content
  const newlyAddedContent = [
    { id: 1, title: 'New Post Title 1', content: 'This is the newly added post description.', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'New Post Title 2', content: 'Another newly added post description.', image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'New Post Title 3', content: 'New content in the newly added category.', image: 'https://via.placeholder.com/300' },
  ];

  const trendingContent = [
    { id: 1, title: 'Trending Post Title 1', content: 'This is the description of trending content.', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Trending Post Title 2', content: 'Another trendy post that\'s popular right now.', image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Trending Post Title 3', content: 'People are talking about this trending content.', image: 'https://via.placeholder.com/300' },
  ];

  return (
  <>
     <div style={{ background:  "var(--card-background)", color: "var(--text-primary)" }}>
     <div className="container p-5" >
      <h2 className="font-weight-bold mb-4">Explorer Page</h2>

      {/* Newly Added Content */}
      <section>
        <h3 className="mb-3">Newly Added</h3>
        <Row className="g-4">
          {newlyAddedContent.map((post) => (
            <Col md={4} key={post.id}>
              <Card
                className="shadow-sm rounded-lg"
                style={{
                 
                  color: "var(--text-primary)",
                }}
              >
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title style={{ color: "var(--text-secondary)" }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Button
                    variant="link"
                    href="#"
                    style={{
                      color: "var(--primary-color)",
                      textDecoration: "none",
                    }}
                  >
                    View Post
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Trending Content */}
      <section className="mt-5">
        <h3 className="mb-3">Trending Content</h3>
        <Row className="g-4">
          {trendingContent.map((post) => (
            <Col md={4} key={post.id}>
              <Card
                className="shadow-sm rounded-lg"
                style={{
                  backgroundColor: "var(--card-background)",
                  color: "var(--text-primary)",
                }}
              >
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title style={{ color: "var(--text-secondary)" }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Button
                    variant="link"
                    href="#"
                    style={{
                      color: "var(--primary-color)",
                      textDecoration: "none",
                    }}
                  >
                    See Trending
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
     </div>
  </>
  );
};

export default Explorer;
