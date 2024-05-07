import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Screenshot 2024-05-05 133800.png'; // Import your logo here
import Home from './Home'; // Import your Home component here

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    setError(""); // Clear error message when typing
  }

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
      setError("");
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
    } catch (error) {
      setError("Failed to create user. Please try again.");
    }
  }

  if (isLoggedIn) {
    return <Home />; // Render the Home component when isLoggedIn is true
  }

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-6">
          <div className="card" style={{ borderRadius: '1rem', background: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
            <div className="card-body p-4 p-lg-5 text-white">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center mb-4">
                  <img src={Logo} alt="i-Notebook" style={{ width: '50px', marginRight: '10px' }} />
                  <h2 className="fw-bold mb-0">i-Notebook</h2>
                </div>
                <div className="mb-4 text-center text-white" style={{ fontSize: '1.5rem' }}>Create a new account</div>
                <div className="form-outline mb-4 glassmorphism">
                  <input type="text" id="name" onChange={onChange} className="form-control form-control-lg" style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }} />
                  <label className="form-label" htmlFor="name">Name</label>
                </div>
                <div className="form-outline mb-4 glassmorphism">
                  <input type="email" id="email" onChange={onChange} className="form-control form-control-lg" style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }} />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>
                <div className="form-outline mb-4 glassmorphism">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control form-control-lg"
                    onChange={onChange}
                    style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}
                  />
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="form-text text-white">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showPassword"
                      onChange={handleShowPasswordChange}
                    />
                    <label className="form-check-label mx-2" htmlFor="showPassword" >View Password</label>
                  </div>
                </div>
                <div className="form-outline mb-4 glassmorphism">
                  <input type="password" id="confirmPassword" onChange={onChange} className="form-control form-control-lg" style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }} />
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                </div>
                {error && <p className="text-danger mb-4">{error}</p>}
                <button className="btn btn-light btn-lg btn-block glassmorphism-black" type="submit">Create Account</button>
              </form>
              <div className="text-center mt-3">
                <p className="text-white mb-0">Already have an account? <Link to="/login" className="text-white">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
