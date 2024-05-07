import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Screenshot 2024-05-05 133800.png'; // Import your logo here
import Home from './Home'; // Import your Home component here

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setCredentials({ ...credentials, email: e.target.value });
    setError(""); // Clear error message when typing
  }

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value });
    setError(""); // Clear error message when typing
  }

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
      setError("");
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
    } catch (error) {
      setError("Incorrect credentials. Please try to login with correct credentials.");
    }
  }

  if (isLoggedIn) {
    return <Home />; // Render the Home component when isLoggedIn is true
  }

  return (
    <section className="vh-100 glassmorphism-black">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem', background: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-white">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img src={Logo} alt="Your logo" style={{ width: '50px', marginRight: '10px' }} />
                        <span className="h1 fw-bold mb-0" style={{ position: 'relative', bottom: '4px' }}>i-Notebook</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in to your account</h5>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example17" className="form-control form-control-lg" value={credentials.email} onChange={handleEmailChange} style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }} />
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type={showPassword ? "text" : "password"} id="form2Example27" className="form-control form-control-lg" value={credentials.password} onChange={handlePasswordChange} style={{ color: '#fff', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }} />
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" value="" id="showPassword" onChange={handleShowPasswordChange} />
                        <label className="form-check-label" htmlFor="showPassword" style={{ color: '#fff' }}>
                          Show Password
                        </label>
                      </div>
                      <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      {error && <p className="text-danger mt-2">{error}</p>}
                      <p className="mt-3">
                        Don't have an account? <Link to="/signup" className="text-white">Register here</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
