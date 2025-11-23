import React, { useEffect, useState } from "react";
import "./basketball.css";
import MainNavbar from "../../components/navbar/main_navbar.jsx";

// 🔁 UPDATE THESE PATHS TO YOUR REAL ASSETS
import heroVideo from "../../assets/basketballvid.mp4";
import strip1 from "../../assets/bb1.jpg";
import strip2 from "../../assets/bb2.jpg";
import strip3 from "../../assets/bb3.jpg";
import strip4 from "../../assets/bb4.jpg";
import strip5 from "../../assets/bb5.jpg";
import captainImg from "../../assets/bb6.jpg";

const heroImages = [strip1, strip2, strip3, strip4, strip5];

export default function Basketball() {
  const [stats, setStats] = useState({
    wins: 0,
    avgPoints: 0,
    titles: 0,
  });

  const [activeTab, setActiveTab] = useState("league");

  // animate stats when stats section comes into view
  useEffect(() => {
    const target = { wins: 24, avgPoints: 82, titles: 3 };
    let started = false;
    let intervalId;

    const section = document.getElementById("bb-stats-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;

          intervalId = setInterval(() => {
            setStats((prev) => {
              const next = {
                wins:
                  prev.wins < target.wins ? prev.wins + 1 : target.wins,
                avgPoints:
                  prev.avgPoints < target.avgPoints
                    ? prev.avgPoints + 2
                    : target.avgPoints,
                titles:
                  prev.titles < target.titles ? prev.titles + 1 : target.titles,
              };

              if (
                next.wins === target.wins &&
                next.avgPoints === target.avgPoints &&
                next.titles === target.titles
              ) {
                clearInterval(intervalId);
              }

              return next;
            });
          }, 50);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);

  const schedule = {
    league: [
      {
        date: "JAN 12",
        opponent: "Punjab Engineering College",
        type: "League Game",
        venue: "Main Indoor Arena",
        time: "5:30 PM",
      },
      {
        date: "JAN 26",
        opponent: "UIET Chandigarh",
        type: "League Game",
        venue: "Chitkara Sports Complex",
        time: "4:00 PM",
      },
    ],
    friendlies: [
      {
        date: "FEB 02",
        opponent: "Alumni All-Stars",
        type: "Friendly",
        venue: "Outdoor Court",
        time: "6:00 PM",
      },
      {
        date: "FEB 15",
        opponent: "Faculty Five",
        type: "Exhibition",
        venue: "Main Indoor Arena",
        time: "3:00 PM",
      },
    ],
    camps: [
      {
        date: "MAR 03",
        opponent: "Skills Camp",
        type: "Player Development",
        venue: "Chitkara Sports Complex",
        time: "Full Day",
      },
      {
        date: "MAR 10",
        opponent: "Shooting Clinic",
        type: "Special Session",
        venue: "Indoor Court 2",
        time: "10:00 AM",
      },
    ],
  };

  const currentEvents = schedule[activeTab];

  const scrollToTryouts = () => {
    const el = document.getElementById("bb-tryouts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <MainNavbar />

      <main className="bb-page">
        {/* HERO */}
        <section className="bb-hero">
          <div className="bb-hero-bg" />

          <div className="bb-hero-inner">
            <div className="bb-hero-copy">
              <p className="bb-tagline">Chitkara University · Basketball Program</p>
              <h1>Where Discipline Meets Fast Break Energy.</h1>
              <p className="bb-hero-text">
                The official Chitkara Basketball squad trains like a pro unit:
                structured sets, high-tempo transition, and relentless defense.
                Trial. Train. Earn your place in the starting five.
              </p>

              <div className="bb-hero-actions">
                <button className="bb-btn-primary" onClick={scrollToTryouts}>
                  Register for Tryouts
                </button>
                <button
                  className="bb-btn-ghost"
                  onClick={() =>
                    document
                      .getElementById("bb-schedule")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Schedule
                </button>
              </div>

              <div className="bb-hero-metrics">
                <div className="bb-metric-pill">
                  <span className="bb-metric-label">Roster Size</span>
                  <span className="bb-metric-value">14 Athletes</span>
                </div>
                <div className="bb-metric-pill">
                  <span className="bb-metric-label">Training Days</span>
                  <span className="bb-metric-value">5x Weekly</span>
                </div>
              </div>
            </div>

            <div className="bb-hero-media">
              <div className="bb-video-card">
                <div className="bb-video-badge">Game Tape · 00:30</div>
                <video
                  className="bb-hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Sliding image strip */}
          <div className="bb-hero-strip">
            <div className="bb-strip-track">
              {heroImages.concat(heroImages).map((src, index) => (
                <div key={index} className="bb-strip-item">
                  <img src={src} alt={`Basketball ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT + STATS */}
        <section id="bb-stats-section" className="bb-about">
          <div className="bb-about-inner">
            <div className="bb-about-text">
              <h2>Built on Systems, Not Just Shots.</h2>
              <p>
                At Chitkara, basketball isn’t just pickup ball. We run structured
                offenses, read defensive coverages, and track performance like a
                professional program. Every practice has a plan. Every drill has a
                metric. Every player has a role.
              </p>
              <p>
                Our focus areas include decision-making under pressure, off-ball
                movement, communication, and elite conditioning. You’re not just
                learning to play — you’re learning to compete.
              </p>
            </div>

            <div className="bb-stats-grid">
              <div className="bb-stat-card">
                <span className="bb-stat-label">Season Wins</span>
                <span className="bb-stat-number">{stats.wins}</span>
                <span className="bb-stat-caption">Last university circuit</span>
              </div>
              <div className="bb-stat-card">
                <span className="bb-stat-label">Avg. Points / Game</span>
                <span className="bb-stat-number">{stats.avgPoints}</span>
                <span className="bb-stat-caption">High-tempo offense</span>
              </div>
              <div className="bb-stat-card">
                <span className="bb-stat-label">Championship Titles</span>
                <span className="bb-stat-number">{stats.titles}</span>
                <span className="bb-stat-caption">Inter-college level</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRYOUT FORM + CAPTAIN SPOTLIGHT */}
        <section id="bb-tryouts" className="bb-main-grid">
          {/* FORM CARD */}
          <div className="bb-card bb-form-card">
            <h2>🚨 Open Tryout Registration</h2>
            <p className="bb-form-intro">
              Lock your slot for the next selection camp. Fields marked * are
              mandatory.
            </p>

            <form
              className="bb-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for registering for basketball tryouts! 🏀");
              }}
            >
              <div className="bb-form-grid">
                <div className="bb-input-group bb-floating">
                  <input type="text" required placeholder=" " />
                  <label>First Name *</label>
                </div>

                <div className="bb-input-group bb-floating">
                  <input type="text" required placeholder=" " />
                  <label>Last Name *</label>
                </div>

                <div className="bb-input-group bb-floating">
                  <input type="email" required placeholder=" " />
                  <label>Email *</label>
                </div>

                <div className="bb-input-group bb-floating">
                  <input type="tel" required placeholder=" " />
                  <label>Phone Number *</label>
                </div>

                <div className="bb-input-group">
                  <label>Primary Role *</label>
                  <select required>
                    <option value="">Select Role</option>
                    <option>Point Guard</option>
                    <option>Shooting Guard</option>
                    <option>Small Forward</option>
                    <option>Power Forward</option>
                    <option>Center</option>
                  </select>
                </div>

                <div className="bb-input-group">
                  <label>Highest Level Played *</label>
                  <select required>
                    <option value="">Select Level</option>
                    <option>School / Local</option>
                    <option>District</option>
                    <option>State / National</option>
                  </select>
                </div>

                <div className="bb-input-group bb-floating bb-full">
                  <textarea placeholder=" " />
                  <label>Key achievements / tournaments</label>
                </div>
              </div>

              <button type="submit" className="bb-btn-full">
                Submit Tryout Application
              </button>
            </form>
          </div>

          {/* SPOTLIGHT CARD */}
          <div className="bb-card bb-spotlight-card">
            <h2>Player Spotlight</h2>

            <div className="bb-spotlight-inner">
              <div className="bb-spotlight-image-wrap">
                <img
                  src={captainImg}
                  alt="Team Captain"
                  className="bb-spotlight-img"
                />
                <span className="bb-jersey-chip">#10 · Captain</span>
              </div>

              <div className="bb-spotlight-copy">
                <h3>Vikram Singh</h3>
                <p className="bb-spotlight-role">Floor General · 4th Year CSE</p>

                <ul className="bb-spotlight-stats">
                  <li>
                    <span className="bb-stat-label-small">PPG</span>
                    <span className="bb-stat-value-small">17.6</span>
                  </li>
                  <li>
                    <span className="bb-stat-label-small">APG</span>
                    <span className="bb-stat-value-small">6.2</span>
                  </li>
                  <li>
                    <span className="bb-stat-label-small">3P%</span>
                    <span className="bb-stat-value-small">39%</span>
                  </li>
                </ul>

                <p className="bb-spotlight-summary">
                  Known for his court vision, leadership, and clutch shooting,
                  Vikram sets the performance standard for every new recruit
                  walking into camp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SCHEDULE / EVENTS (INTERACTIVE TABS) */}
        <section id="bb-schedule" className="bb-schedule">
          <div className="bb-schedule-inner">
            <div className="bb-schedule-header">
              <h2>📅 Program Calendar</h2>
              <p>
                Switch between league games, friendlies, and development camps to
                see how loaded the season actually is.
              </p>
            </div>

            <div className="bb-tabs">
              <button
                className={`bb-tab ${activeTab === "league" ? "active" : ""}`}
                onClick={() => setActiveTab("league")}
              >
                League Games
              </button>
              <button
                className={`bb-tab ${activeTab === "friendlies" ? "active" : ""}`}
                onClick={() => setActiveTab("friendlies")}
              >
                Friendlies
              </button>
              <button
                className={`bb-tab ${activeTab === "camps" ? "active" : ""}`}
                onClick={() => setActiveTab("camps")}
              >
                Camps & Clinics
              </button>
            </div>

            <div className="bb-events-grid">
              {currentEvents.map((item, idx) => (
                <article key={idx} className="bb-event-card">
                  <div className="bb-event-date">
                    <span className="bb-event-month">
                      {item.date.split(" ")[0]}
                    </span>
                    <span className="bb-event-day">
                      {item.date.split(" ")[1]}
                    </span>
                  </div>
                  <div className="bb-event-body">
                    <h3>{item.opponent}</h3>
                    <p className="bb-event-type">{item.type}</p>
                    <p className="bb-event-venue">{item.venue}</p>
                    <p className="bb-event-time">{item.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bb-footer">
          <div className="bb-footer-inner">
            <div className="bb-footer-info">
              <h3>Basketball Program Coordinator</h3>
              <p>
                <strong>Name:</strong> Arjun Kapoor
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Email:</strong> arjun.kapoor@chitkara.edu.in
              </p>
            </div>

            <div className="bb-footer-social">
              <h3>Connect with Chitkara University</h3>
              <div className="bb-social-icons">
                <a href="https://www.linkedin.com/school/chitkara-university/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/chitkarau" target="_blank"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/@chitkarauniversity" target="_blank"><i className="fab fa-youtube"></i></a>
            </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
