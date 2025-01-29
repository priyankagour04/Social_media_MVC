import React, { useState } from "react";
import { useEditProfileMutation } from "../../services/api/profileApi";
import { useSelector } from "react-redux"; // Import Redux selector

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");

  // Get logged-in user ID from Redux; fallback to localStorage if Redux state is lost
  const userId = useSelector((state) => state.auth.user?.id) || localStorage.getItem("userId");

  const [editProfile, { isLoading, isError, error }] = useEditProfileMutation();

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save actual file for uploading
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle Form Submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing. Cannot update profile.");
      alert("User ID is missing. Please re-login.");
      return;
    }

    if (!bio.trim() || !city.trim()) {
      alert("Bio and City fields cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("bio", bio);
    formData.append("city", city);
    if (image) formData.append("profilePicture", image); // Append the actual image file

    try {
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

            {/* City Input */}
            <div className="mb-4">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
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
