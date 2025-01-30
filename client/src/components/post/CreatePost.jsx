import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAddPostMutation } from "../../services/api/postApi";

const CreatePost = ({ onPostCreated }) => {
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [content, setContent] = useState(""); // State for the post content
  const [image, setImage] = useState(""); // State for the image URL (for uploaded images)
  const [tags, setTags] = useState([]); // State for post tags (array of strings)

  const user = useSelector((state) => state.auth.user);

  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation(); // Using RTK Query's addPost mutation hook

  useEffect(() => {
    if (isSuccess) {
      console.log("Post created successfully!");
      onPostCreated(); // Callback function to close the modal or refresh the posts list
      setShowModal(false); // Close modal on successful post
    }
  }, [isSuccess, onPostCreated]);

  // Handle file upload (get image file and upload)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // for example, from Cloudinary or other services

      // Upload image to a cloud storage or server
      fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            setImage(data.secure_url); // Set the uploaded image URL in the state
          }
        })
        .catch((err) => console.error("Error uploading image:", err));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      alert("Content is required!");
    } else {
      // Create post object according to the schema
      const postData = {
        user: user._id, // User reference (from redux or another state management)
        content,
        image,
        tags,
      };

      // Use RTK Query's addPost mutation to submit post data
      addPost(postData);
    }
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim())); // Split by commas and remove extra spaces
  };

  return (
    <div>
      <Button style={{ background: "var(--primary-color)" }} onClick={() => setShowModal(true)}>
        Add Post +
      </Button>

      {/* Modal for creating a post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inside the modal */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content:
              </label>
              <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image (Upload from computer)
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && <img src={image} alt="Uploaded" width="100" className="mt-2" />}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (Optional - Comma separated)
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                value={tags.join(", ")} // Display tags as comma-separated
                onChange={handleTagChange}
                placeholder="Enter tags (optional)"
              />
            </div>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
