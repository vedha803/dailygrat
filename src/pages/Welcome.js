import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'; // Import the CSS file

function Welcome() {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to DailyGrat</h1>
        <p>Write about your day, add photos, places, and more.</p>
        <p>Schedule your time for writing and make it a habit.</p>
        <Link to="/home">
          <button className="get-started-button">Get Started</button>
        </Link>
      </header>
    </div>
  );
}

export default Welcome;



