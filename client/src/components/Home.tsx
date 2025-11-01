import React from "react";
import "./Home.css";

interface HomeProps {
  setCurrentView: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Discover the Himalayas</h1>
          <p>Experience the majestic beauty of the world's highest mountains</p>
          <button
            className="cta-button"
            onClick={() => setCurrentView("tours")}
          >
            Explore Tours
          </button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🏔️</span>
          <h3>Mountain Adventures</h3>
          <p>Trek through breathtaking mountain trails and valleys</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏕️</span>
          <h3>Cultural Experiences</h3>
          <p>Immerse yourself in local culture and traditions</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">✨</span>
          <h3>Expert Guides</h3>
          <p>Professional guides ensuring your safety and enjoyment</p>
        </div>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          Himalayan Tours & Travels has been leading adventure tours in the
          Himalayas for over a decade. We offer carefully curated experiences
          that combine adventure, culture, and natural beauty.
        </p>
        <div className="stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Happy Travelers</p>
          </div>
          <div className="stat">
            <h3>50+</h3>
            <p>Destinations</p>
          </div>
          <div className="stat">
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
