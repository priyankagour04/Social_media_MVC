import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyEmailQuery } from "../services/api/authAPI";

const VerifyEmail = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Use the RTK Query hook for email verification
  const { data, isLoading, isError, error } = useVerifyEmailQuery(token);

  useEffect(() => {
    if (data) {
      // Email verified successfully
      setMessage("Your email has been successfully verified!");
      setIsVerified(true); // Set the state to mark verification as successful
    } else if (isError) {
      setMessage(error?.data?.message || "Email verification failed. Please try again.");
    }
  }, [data, isError, error]);

  // Redirect to login page after a successful verification
  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 3000);
    }
  }, [isVerified, navigate]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="p-4 p-lg-5 rounded" style={{ maxWidth: "500px", width: "100%" }}>
        <h1 className="mb-4">Email Verification</h1>
        {isLoading ? (
          <p>Verifying your email...</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
