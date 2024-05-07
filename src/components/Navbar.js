import React, { useEffect, useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo"; // Import the Logo component

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {}, [location]);

  const [loginHovered, setLoginHovered] = useState(false);
  const [signupHovered, setSignupHovered] = useState(false);

  const loginBtnStyle = {
    border: "none",
    borderRadius: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    color: loginHovered ? "#000" : "#fff",
    backgroundColor: loginHovered ? "#fff" : "transparent",
    transition: "background-color 0.3s, color 0.3s",
    cursor: "pointer",
    padding: "10px 20px",
    fontSize: "16px",
    outline: "none",
    ...(loginHovered && {
      backgroundColor: "#fff",
      color: "#000",
    }),
  };

  const signupBtnStyle = {
    border: "none",
    borderRadius: "20px",
    marginRight: "10px",
    color: signupHovered ? "#000" : "#fff",
    backgroundColor: signupHovered ? "#fff" : "transparent",
    transition: "background-color 0.3s, color 0.3s",
    cursor: "pointer",
    padding: "10px 20px",
    fontSize: "16px",
    outline: "none",
    ...(signupHovered && {
      backgroundColor: "#fff",
      color: "#000",
    }),
  };

  // Check if the user is on the login or signup page
  const isLoginPage = location.pathname === "/Login";
  const isSignupPage = location.pathname === "/SignUp";

  return (
    <nav className="navbar navbar-dark navbar-expand-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)" }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Logo /> {/* Include the Logo component here */}
          <Link className="navbar-brand" to="/">
            i-Notebook
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/" ? "active": ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about" ? "active": "" }`} aria-current="page" to="/about">About</Link>
            </li>
          </ul>
          {/* Render login and signup buttons conditionally */}
          {!isLoginPage && !isSignupPage && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/Login">
                <button 
                  style={loginBtnStyle} 
                  type="button"
                  onMouseEnter={() => setLoginHovered(true)}
                  onMouseLeave={() => setLoginHovered(false)}
                >
                  Login
                </button>
              </Link>
              <Link to="/SignUp">
                <button 
                  style={signupBtnStyle} 
                  type="button"
                  onMouseEnter={() => setSignupHovered(true)}
                  onMouseLeave={() => setSignupHovered(false)}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
