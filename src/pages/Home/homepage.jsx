import React from "react";
import MainNavbar from "../../components/navbar/main_navbar";
import HeroSection from "../../components/herosection";
import CampusMap from "../../components/campusmap";
import LocationCards from "../../components/locationcards";
import Stats from "../../components/stats";
import Footer from "../../components/footer";
import "./homepage.css";

export default function HomePage() {
  return (
    <>
      <MainNavbar />
      <div id="top" style={{ paddingTop: 0 }}></div> {/* offset for fixed navbar */}
      <main>
        <HeroSection />
        <section className="map-section" id="campus-map">
          <div className="container">
            <h2>Campus Locations</h2>
            <CampusMap />
            <LocationCards />
          </div>
        </section>

        <Stats />

        <section className="about-us-section" id="about-us-section">
          <div className="container">
            <div className="about-content">
              <div className="about-header">
                <h2>About Our Campus</h2>
                <p>Discover what makes our institution special</p>
              </div>
              <div className="about-grid">
                <div className="about-card">
                  <div className="about-icon"><i className="fas fa-graduation-cap"></i></div>
                  <h3>Academic Excellence</h3>
                  <p>We provide world-class education with innovative teaching methods and cutting-edge research opportunities.</p>
                </div>
                <div className="about-card">
                  <div className="about-icon"><i className="fas fa-users"></i></div>
                  <h3>Vibrant Community</h3>
                  <p>Our diverse campus community fosters collaboration, creativity, and lifelong friendships.</p>
                </div>
                <div className="about-card">
                  <div className="about-icon"><i className="fas fa-lightbulb"></i></div>
                  <h3>Innovation Hub</h3>
                  <p>State-of-the-art facilities and resources support groundbreaking research and entrepreneurship.</p>
                </div>
              </div>

              <div className="about-stats">
                <div className="stat">
                  <h4>Founded</h4>
                  <p>2000</p>
                </div>
                <div className="stat">
                  <h4>Ranking</h4>
                  <p>Top 50</p>
                </div>
                <div className="stat">
                  <h4>Alumni</h4>
                  <p>50,000+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
