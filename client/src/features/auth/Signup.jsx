import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/api/authAPI";
import { Modal, Button } from "react-bootstrap"; // Importing modal component

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const [signup, { data, isLoading, isError, error }] = useSignupMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the signup with API call using RTK
      const response = await signup({ email, username, password }).unwrap();
      
      // Log the response to inspect the data structure
      console.log("API Response:", response);

      // If the API response contains a user ID, username, and token, store them in localStorage
      if (response && response.user && response.token) {
        const { user, token } = response;

        // Store user information in localStorage
        localStorage.setItem("userId", user.id);  // Ensure correct field name (from response.user)
        localStorage.setItem("username", user.username || username);  // Store username from response or input
        localStorage.setItem("jwtToken", token);  // Store the JWT Token

        // Show the modal after successful signup
        setShowModal(true); // Show the modal here after successful signup
      } else {
        throw new Error("Signup response missing required fields.");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const handleCloseModal = () => setShowModal(false); // Close modal handler

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="p-4 p-lg-5 rounded"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="mb-4 display- fw-bold">Sign up</h1>
        <p className="text-muted mb-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-success fw-medium text-decoration-none border-0 bg-transparent"
          >
            Login
          </button>
        </p>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control shadow-sm"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-bold shadow-sm mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>

        {/* Show loading spinner or error message */}
        {isError && (
          <div className="text-danger mt-2">
            <p>{error?.data?.message || "Signup failed. Please try again."}</p>
          </div>
        )}
        
        {data && !isLoading && !isError && (
          <div className="text-success mt-2">
            <p>Signup successful! Please check your email to verify your account.</p>
          </div>
        )}

        {/* Modal for email verification */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Signup Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your account has been created successfully! Please check your email to verify your account before logging in.</p>
            <p>If you don't see the email, check your spam folder.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Go to Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Signup;
