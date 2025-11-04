import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="blixo-home-body">
      {/* Navbar */}
      <nav className="blixo-navbar">
        <div className="blixo-container">
          <div className="blixo-logo">Online Complaint and Grievance Portal</div>
          <div className="blixo-links">
            <Link to="/login" className="blixo-btn-login">Login</Link>
            <Link to="/signup" className="blixo-btn-signup">Signup</Link>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="blixo-welcome-section">
        <h1>Welcome to the Portal</h1>
        <p>Your complaints, tracked and resolved efficiently!</p>
      </div>

      {/* How it Works Section */}
      <div className="blixo-how-it-works">
        <h2>How it Works</h2>
        <div className="blixo-cards">
          <div className="blixo-card">
            <h3>Step 1</h3>
            <p>Register or Login to your account.</p>
          </div>
          <div className="blixo-card">
            <h3>Step 2</h3>
            <p>Submit your complaint through the portal.</p>
          </div>
          <div className="blixo-card">
            <h3>Step 3</h3>
            <p>Track your complaint status easily.</p>
          </div>
          <div className="blixo-card">
            <h3>Step 4</h3>
            <p>Get notified when your complaint is resolved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
