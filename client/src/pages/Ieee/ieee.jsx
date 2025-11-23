import React, { useEffect, useState } from "react";
import "./ieee.css";
import MainNavbar from "../../components/navbar/main_navbar.jsx";

import img1 from "../../assets/ieee1.jpg";
import img2 from "../../assets/ieee2.jpg";
import img3 from "../../assets/ieee3.jpg";
import img4 from "../../assets/ieee4.jpg";
import img5 from "../../assets/ieee5.jpg";
import img6 from "../../assets/ieee6.jpg";

import heroVideo from "../../assets/ieeeVid.mp4";

export default function Ieee() {
  const images = [img1, img2, img3, img4, img5];

  const [stats, setStats] = useState({
    rating: 0,
    problems: 0,
    hackathons: 0,
  });

  // Numbers animation
  useEffect(() => {
    const targetValues = { rating: 1780, problems: 300, hackathons: 4 };
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;

          let interval = setInterval(() => {
            setStats((prev) => ({
              rating:
                prev.rating < targetValues.rating
                  ? prev.rating + 20
                  : targetValues.rating,
              problems:
                prev.problems < targetValues.problems
                  ? prev.problems + 5
                  : targetValues.problems,
              hackathons:
                prev.hackathons < targetValues.hackathons
                  ? prev.hackathons + 1
                  : targetValues.hackathons,
            }));
          }, 40);
        }
      },
      { threshold: 0.4 }
    );

    const el = document.getElementById("leaderStats");
    if (el) observer.observe(el);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <MainNavbar />

      {/* MOVING IMAGES STRIP */}
      <div className="moving-images-container">
        <div className="moving-strip">
          {images.map((src, i) => (
            <div key={i} className="moving-image">
              <img src={src} alt={`ieee-carousel-${i}`} />
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-container">
        <div className="about-text">
          <h2>Our Mission: Building Coding Excellence</h2>
          <p>The IEEE Tech Society of Chitkara University is a dynamic community of innovators, engineers, and technology 
                    enthusiasts committed to advancing knowledge and innovation in the field of engineering and technology.
                    We aim to bridge the gap between theory and practice by empowering students through hands-on projects, workshops, hackathons, 
                    and technical events aligned with IEEE’s global vision.</p> <p>We foster teamwork, critical thinking, and disciplined practice, 
                    believing that true coding mastery comes from consistent effort and collaborative learning. Join us to transform your 
                    passion for code into professional 
                     success. Our society serves as a platform for students to explore emerging technologies, collaborate on
                      impactful research, and build solutions that address real-world challenges.</p>
           
        </div>

        <div className="about-image">
          <div className="basketball-court">
            <video autoPlay muted loop>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* FORM + LEADER SPOTLIGHT */}
      <section id="combined-section" className="section-padded">
        <div className="container combined-layout">
          {/* FORM */}
          <div className="member-registration-column">
            <h2 className="column-title registration-title">💡 Club Membership Form</h2>

            <p className="form-intro">
              Sign up here to join our core team and receive event invitations.
            </p>

            <form className="registration-form">
              <div className="form-grid">
                <div className="form-group">
                <input type="text" placeholder=" " required />
                <label>First Name *</label>
              </div>

              <div className="form-group">
                <input type="text" placeholder=" " required />
                <label>Last Name *</label>
              </div>

              <div className="form-group">
                <input type="email" placeholder=" " required />
                <label>Email Address *</label>
              </div>

              <div className="form-group">
                <input type="tel" placeholder=" " required />
                <label>Phone Number *</label>
              </div>

              <div className="form-group">
                <input type="number" placeholder=" " min="12" max="35" required />
                <label>Age *</label>
              </div>

              <div className="form-group">
                <select>
                  <option hidden></option>
                  <option value="orgamizing-team">Organizing Team</option>
                  <option value="media-team">Media Team</option>
                  <option value="graphics-team">Graphics Team</option>
                  <option value="discipline-team">Discipline Team</option>
                  <option value="technical-team">Technical Team</option>
                  <option value="content-team">Content Team</option>
                  <option value="promotion-team">Promotion Team</option>
                </select>
                <label>Preferred Team</label>
              </div>

              <div className="form-group">
                <select required>
                  <option hidden></option>
                  <option value="first">1st Year</option>
                  <option value="second">2nd Year</option>
                  <option value="third">3rd Year</option>
                  <option value="fourth">4th Year</option>
                </select>
                <label>Year *</label>
              </div>

              <div className="form-group full-width">
                <textarea placeholder=" "></textarea>
                <label>Skills</label>
              </div>
            </div>

              <button className="submit-btn full-width">Join IEEE</button>
            </form>
          </div>

          {/* LEADER SPOTLIGHT */}
          <div className="player-spotlight-column" id="leaderStats">
            <h2 className="column-title spotlight-title">Leader Spotlight</h2>

            <div className="featured-card">
              <div className="player-photo-placeholder">
                <img src={img6} alt="leader" className="leader-profile-img" />
              </div>

              <div className="player-details">
                <span className="player-number">#01</span>
                <h3>Aashima Rana</h3>
                <p className="player-position">Club President & CP Lead</p>

                <ul className="player-stats-list">
                  <li>
                    <strong>Max Codeforces Rating:</strong> {stats.rating}
                  </li>
                  <li>
                    <strong>Problems Solved:</strong> {stats.problems}
                  </li>
                  <li>
                    <strong>Hackathons Won:</strong> {stats.hackathons}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="events-section section-padded">
        <div className="container">
          <h2 className="section-title events-title">📅 Upcoming Coding Events</h2>

          <div className="events-grid">
            <div className="event-card">
              <div className="event-date-box">
                <span className="month">NOV</span>
                <span className="day">05</span>
              </div>
              <div className="event-details">
                <h3>Weekly Algo Sprint #4</h3>
                <p>DP + Graphs practice session.</p>
                <span className="event-location">
                  <i className="fas fa-desktop"></i> CS Lab, Turing Block
                </span>
              </div>
            </div>

            <div className="event-card">
              <div className="event-date-box">
                <span className="month">NOV</span>
                <span className="day">18</span>
              </div>
              <div className="event-details">
                <h3>Mock Technical Interview Workshop</h3>
                <p>Led by a Google SDE.</p>
                <span className="event-location">
                  <i className="fas fa-user-tie"></i> Seminar Hall B
                </span>
              </div>
            </div>

            <div className="event-card">
              <div className="event-date-box">
                <span className="month">DEC</span>
                <span className="day">01</span>
              </div>
              <div className="event-details">
                <h3>Intra-College Hackathon</h3>
                <p>24-hour coding challenge.</p>
                <span className="event-location">
                  <i className="fas fa-laptop-code"></i> Innovation Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-info">
          <h3>Team Coordinator</h3>
          <p><strong>Name:</strong> Arjun Kapoor</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> arjun.kapoor@chitkara.edu.in</p>
        </div>

        <div className="footer-social">
          <h3>Connect with Chitkara University</h3>
          <div className="social-icons">
            <a href="https://www.linkedin.com/school/chitkara-university/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/chitkarau" target="_blank"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/@chitkarauniversity" target="_blank"><i className="fab fa-youtube"></i></a>
            </div>
        </div>
      </footer>
    </>
  );
}


