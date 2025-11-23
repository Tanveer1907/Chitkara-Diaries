// client/src/pages/Clubs/clubs.jsx
import React from "react";
import "./clubs.css";
import MainNavbar from "../../components/navbar/main_navbar";

export default function Clubs() {
  return (
    <>
      <MainNavbar />

      {/* Page header */}
      <header className="page-header">
        <h1>Get to know the various clubs in Chitkara Uni</h1>
      </header>

      {/* Technical Clubs */}
      <section className="club-section">
        <h2>Technical Clubs</h2>
        <div className="card-container">
          <div className="club-card">
            <img src="" alt="Open Source Chandigarh" />
            <div className="card-content">
              <h3>Open-Source Chandigarh</h3>
              <p>Learn, foster, explore — Open-Source is fun.</p>
              <a className="know-more" href="/osc">Know More</a>
            </div>
          </div>

          <div className="club-card">
            <img src="/images/IEEE.png" alt="IEEE CUIET" />
            <div className="card-content">
              <h3>IEEE CUIET</h3>
              <p>Learn, build and showcase new ideas.</p>
              <a className="know-more" href="/ieee">Know More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Clubs */}
      <section className="club-section">
        <h2>Sports Clubs</h2>
        <div className="card-container">
          <div className="club-card">
            <img src="/images/Basketball.png" alt="Basketball Club" />
            <div className="card-content">
              <h3>Basketball Club CUIET</h3>
              <p>The Chitkara Basketball Team.</p>
              <a className="know-more" href="/basketball">Know More</a>
            </div>
          </div>

          <div className="club-card">
            <img src="/images/Cricket.png" alt="Cricket Club" />
            <div className="card-content">
              <h3>Cricket Mania CUIET</h3>
              <p>Build fitness, teamwork and spirit.</p>
              <a className="know-more" href="/cricket">Know More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Clubs */}
      <section className="club-section">
        <h2>Talent Clubs</h2>
        <div className="card-container">
          <div className="club-card">
            <img src="/images/Natraj.png" alt="Natraj" />
            <div className="card-content">
              <h3>C2S2 Natraj</h3>
              <p>Dive into the world of Classical Dance.</p>
              <a className="know-more" href="/natraj">Know More</a>
            </div>
          </div>

          <div className="club-card">
            <img src="/images/Dhwani.png" alt="Dhwani" />
            <div className="card-content">
              <h3>C2S2 Dhwani</h3>
              <p>Chitkara's musical world.</p>
              <a className="know-more" href="/dhwani">Know More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Simple placeholder footer */}
      <div style={{ height: 1 }} />
    </>
  );
}
