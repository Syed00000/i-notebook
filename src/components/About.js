import React from 'react';

function About() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))', // Updated background
    }}>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        padding: '2rem',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>i-Notebook</h1>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}> Your Digital Note for Organized Living</h4>
        <p style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0', overflowY: 'auto', maxHeight: '50vh', maxWidth: '100%', padding: '0 1rem' }}>
          Users can register and create an account to log in and start jotting down their daily tasks. Once logged in, users can write, save, update, and delete their notes at their convenience. i-Notebook provides a seamless experience for users to access their notes from anywhere, as it is hosted on the cloud. With i-Notebook, users can stay organized and keep track of their tasks efficiently.
        </p>
      </div>
      {/* Glass morphism effect */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(0,0,0,0.05))', // Updated gradient
        backdropFilter: 'blur(10px)',
        zIndex: '-1',
      }}></div>
    </div>
  );
}

export default About;
