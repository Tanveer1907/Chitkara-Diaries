import React from "react";
import "./../pages/Home/homepage.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Campus Explorer</h4>
            <p>Discover the best of our campus with interactive exploration and detailed information.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#about-us-section">About Us</a></li>
              <li><a href="/club_page.html">Clubs</a></li>
              <li><a href="/journal.html">Journal</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 info@campusexplorer.edu.in</p>
            <p>📞 +91 9876512340</p>
            <p>📍Chitkara University, Rajpura, Punjab</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Campus Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
