import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/api/authAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous errors

    // Perform the login mutation
    login({ username, password });
  };

  useEffect(() => {
    if (isSuccess && data) {
      // Check if user data and necessary properties exist
      if (data.success && data.user && data.user._id && data.user.username) {
        // Store user information in localStorage
        localStorage.setItem("userId", data.user._id);  // user._id instead of data.user.id
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("username", data.user.username);

        // Dispatch user credentials to Redux store for global state management
        dispatch(
          setCredentials({ token: data.token, user: data.user })
        );

        // Navigate to the home page or dashboard
        navigate(`/profile/${data.user.username}`, { replace: true });
      } else {
        setErrorMessage("User information is incomplete.");
      }
    }

    if (isError) {
      setErrorMessage(error?.data?.message || "An error occurred during login.");
    }
  }, [isSuccess, data, isError, error, dispatch, navigate]);

  const handleSignupRedirect = () => navigate("/signup");
  const handleForgotPasswordRedirect = () => navigate("/forget");

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="p-4 p-lg-5 rounded"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="mb-4 display-5 fw-bold">Login</h1>
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control shadow-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-describedby="usernameHelp"
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
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
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

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {errorMessage && (
          <div className="text-danger mt-3">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
