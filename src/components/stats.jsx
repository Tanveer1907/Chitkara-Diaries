import React from "react";
import "./../pages/Home/homepage.css";

const stats = [
  { icon: "fas fa-users", number: "5,000+", label: "Students" },
  { icon: "fas fa-chalkboard-teacher", number: "100+", label: "Faculty Members" },
  { icon: "fas fa-building", number: "15+", label: "Buildings" },
  { icon: "fas fa-graduation-cap", number: "25+", label: "Programs" },
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-container">
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon"><i className={s.icon}></i></div>
              <div className="stat-info">
                <h3>{s.number}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
