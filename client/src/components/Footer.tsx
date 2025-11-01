import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🏔️ Himalayan Tours & Travels</h3>
          <p>Your gateway to Himalayan adventures</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Tours</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@himalayantours.com</p>
          <p>📞 +977-1-234567</p>
          <p>📍 Kathmandu, Nepal</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>📺</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Himalayan Tours & Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
