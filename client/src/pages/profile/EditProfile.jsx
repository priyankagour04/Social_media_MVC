import React, { useState, useEffect } from "react";
import { useEditProfileMutation } from "../../services/api/profileApi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { handleSuccess, handleError } from "../../utility/toster/Tostify"; // Import the toast handlers

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  // UseEffect to fetch userId from localStorage if not present in Redux store
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      console.error("User is not logged in.");
      handleError("User ID is missing. Please login again.");
      navigate("/login"); // Redirect to login page if userId is not found
    }
  }, [navigate]);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId"); 
  const username = localStorage.getItem("username");


  const [editProfile, { isLoading, isError, error }] = useEditProfileMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Ensure bio is provided before submitting
    if (!bio.trim()) {
      handleError("Bio cannot be empty.");
      return;
    }

    // Create FormData for profile update, including profile picture and bio
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("bio", bio);

    if (image) {
      formData.append("profilePicture", image); 
    }

    try {
      await editProfile(formData).unwrap();
      console.log("Profile Updated Successfully");
      handleSuccess("Profile updated successfully!");

  
      navigate(`/profile/${username}`);  
    } catch (err) {
      console.log("Error updating profile:", err);
      handleError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h3>Edit Profile</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSaveChanges}>
            {/* Image Upload */}
            <div className="mb-4" style={{ marginTop: "10px" }}>
              <label htmlFor="profileImage" className="form-label">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                onChange={handleImageChange}
                className="form-control"
              />
              {imagePreview && (
                <div className="mt-3 text-center">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="img-thumbnail rounded-circle"
                    style={{ width: "120px", height: "120px", objectFit: "cover", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>

            {/* Bio Input */}
            <div className="mb-4" style={{ marginTop: "10px" }}>
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself"
                rows="4"
                className="form-control"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn px-4 py-2"
                style={{ background: "var(--primary-color)", color: "var(--white)" }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {isError && (
            <div className="alert alert-danger mt-3">
              <strong>Error:</strong> {error?.data?.message || "An error occurred. Please try again."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
