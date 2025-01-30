import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAddPostMutation } from "../../services/api/postApi";

const CreatePost = ({ showModal, setShowModal }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); 
  const [tags, setTags] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Post created successfully!");
      setShowModal(false); // Close modal on successful post creation
    }
  }, [isSuccess, setShowModal]);

  useEffect(() => {
    // Reset form when modal is closed
    if (!showModal) {
      setContent("");
      setImage("");
      setTags([]);
    }
  }, [showModal]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // Limit size to 5MB
        alert("File size exceeds the limit of 5MB.");
        return;
      }

      setImageUploading(true); // Start uploading

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cloudinary_preset");

      fetch("https://api.cloudinary.com/v1_1/dlzts54nq/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            setImage(data.secure_url);
            setImageUploading(false); // Stop uploading
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          setImageUploading(false); // Stop uploading on error
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      alert("Content is required!");
    } else {
      const postData = {
        content,
        image, // Include image URL in the post data
        tags,
      };

     
      addPost(postData); // Send post data including the image URL
    }
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  return (
    <div>
      <Button style={{ background: "var(--primary-color)" }} onClick={() => setShowModal(true)}>
        Add Post +
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content:</label>
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
              <label htmlFor="image" className="form-label">Image (Upload from computer)</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imageUploading} // Disable while uploading
              />
              {imageUploading ? (
                <div className="mt-2">
                  <Spinner animation="border" size="sm" /> Uploading...
                </div>
              ) : (
                image && <img src={image} alt="Uploaded" width="100" className="mt-2" />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags (Optional - Comma separated)</label>
              <input
                type="text"
                className="form-control"
                id="tags"
                value={tags.join(", ")}
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
