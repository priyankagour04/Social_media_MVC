import React, { useState } from "react";
import { useEditProfileMutation } from "../../services/api/profileApi";
import { useSelector } from "react-redux"; // Import Redux selector

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bio, setBio] = useState("");

  // Get logged-in user ID from Redux; fallback to localStorage if Redux state is lost
  const userId = useSelector((state) => state.auth.user?.id) || localStorage.getItem("userId");

  // Initialize the mutation
  const [editProfile, { isLoading, isError, error }] = useEditProfileMutation();

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the actual file for uploading
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle Form Submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Check if userId exists
    if (!userId) {
      console.error("User ID is missing. Cannot update profile.");
      alert("User ID is missing. Please re-login.");
      return;
    }

    if (!bio.trim()) {
      alert("Bio cannot be empty.");
      return;
    }

    // Create FormData object to send form data, including file
    const formData = new FormData();
    formData.append("userId", userId);  // Ensure that userId is appended to FormData
    formData.append("bio", bio);

    // Only append image if it's selected
    if (image) {
      formData.append("profilePicture", image);  // Append file for profilePicture
    }

    try {
      // Call the editProfile mutation with the FormData
      await editProfile(formData).unwrap();
      console.log("Profile Updated Successfully");
      alert("Profile updated successfully!");
    } catch (err) {
      console.log("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
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
            <div className="mb-4">
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
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

            {/* Bio Input */}
            <div className="mb-4">
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
