import React from "react";
import "../pages/Home/homepage.css";
import heroImg from "../assets/chitkara.jpg"; // IMPORT FIXED

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-image">
          <img src={heroImg} alt="Campus Overview" />   {/* FIXED */}
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to Our Campus</h1>
              <p className="hero-subtitle">Discover excellence in education and innovation</p>
              <p className="hero-description">Explore our vibrant campus community and world-class facilities</p>
              <a href="#campus-map" className="hero-btn">
                <i className="fas fa-map-marked-alt"></i>
                Explore Campus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
