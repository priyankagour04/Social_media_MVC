import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
const navbar = () => {
     const navigate = useNavigate();

     
  const handleNavigation = (destination) => {
    navigate(destination);
  };

  const username = localStorage.getItem("username");
  
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--white)",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{ color: "var(--white)" }}
            href="#"
          >
            SocialApp
          </a>
          <div className="d-flex">
          <button
              className="btn btn-link me-2"
              aria-label="Home"
              style={{ color: "var(--white)" }}
              onClick={() => handleNavigation("/home")}
            >
            <IoHome size={20} />
           
            </button>
            <button
              className="btn btn-link me-2"
              aria-label="Notifications"
              style={{ color: "var(--white)" }}
              onClick={() => handleNavigation("/notifications")}
            >
              <FaBell size={20} />
            </button>
            <button
              className="btn btn-link me-2"
              aria-label="Search"
              style={{ color: "var(--white)" }}
              onClick={() => handleNavigation("/search")}
            >
              <FaSearch size={20} />
            </button>
            <button
              className="btn btn-link"
              aria-label="User Profile"
              style={{ color: "var(--white)" }}
              onClick={() => handleNavigation(`/profile/${username}`)}
            >
              <FaUserCircle size={20} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbar;
