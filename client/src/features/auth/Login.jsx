import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/api/authAPI"; 

const Login = () => {
  const navigate = useNavigate();
  
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Using the useLoginMutation hook
  const [login, { data, isLoading, isError, error }] = useLoginMutation();

  // Handle form submission and login
  const handleSubmit = (e) => {
    e.preventDefault();
    // Attempting the login API call with the username and password
    login({ username, password });
  };

  // Handle successful login or redirect
  useEffect(() => {
    if (data) {
      // If login is successful, redirect to the home route
      navigate("/home");
    }
  }, [data, navigate]);

  // Handle any login errors
  useEffect(() => {
    if (isError) {
      // Log the actual error response for debugging
      console.error("Login failed:", error);
    }
  }, [isError, error]);

  // Redirect to the signup page
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  // Redirect to the forgot password page
  const handleForgotPasswordRedirect = () => {
    navigate("/forget");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="p-4 p-lg-5 rounded"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="mb-4 display- fw-bold">Login</h1>
        <p className="text-muted mb-4">
          Don’t have an account yet?{" "}
          <span
            className="text-success fw-medium text-decoration-none"
            role="button"
            onClick={handleSignupRedirect}
          >
            Sign up
          </span>
        </p>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
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

          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <span
              className="text-success small text-decoration-none"
              role="button"
              onClick={handleForgotPasswordRedirect}
            >
              Forgot password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {isError && (
          <div className="text-danger mt-2">
            <p>Login failed. Please check your credentials.</p>
            {error && (
              <pre>{JSON.stringify(error, null, 2)}</pre> // Display error response from API (for debugging)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
