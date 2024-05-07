import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="text-center">
        <h1>Welcome to i-Notebook</h1>
        <p>A place to manage your notes efficiently</p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
