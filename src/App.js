import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import LandingPage from './components/Landingpage'; // Update the import statement

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container" style={{ minHeight: 'calc(100vh - 56px)', marginBottom: '110px' }}>
            <Routes>
              <Route exact path="/" element={<LandingPage />} /> {/* Update to use LandingPage component */}
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </NoteState>
    </>
  );
};

export default App;
