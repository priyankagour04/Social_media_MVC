import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
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

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterContent = (content) => {
    return content.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <div style={{ background: "var(--card-background)", color: "var(--text-primary)" }}>
        <div className="container p-5">
          <h2 className="font-weight-bold mb-4">Explorer Page</h2>

          {/* Search Bar */}
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4"
            style={{ width: '', margin: '' }}
          />

         
        </div>
      </div>
    </>
  );
};

export default Explorer;
