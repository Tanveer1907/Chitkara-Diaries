import React, { useState } from "react";
import "./../pages/Home/homepage.css";

// Import ALL images properly
import libraryImg from "../assets/library.jpeg";
import squareoneImg from "../assets/square_one.png";
import turingImg from "../assets/turing_block.jpg";
import sportoriumImg from "../assets/sportorium.jpg";
import exploratoriumImg from "../assets/exploratorium.png";

const cards = [
  {
    id: 1,
    title: "Central Library",
    subtitle: "24/7 Study Hub",
    icon: "📚",
    img: libraryImg,
    info: "The Central Library offers 24/7 access to books, digital resources and private study zones."
  },
  {
    id: 2,
    title: "Square One",
    subtitle: "Dining & Social Space",
    icon: "🍽️",
    img: squareoneImg,
    info: "A lively space to hang out, eat and collaborate with friends."
  },
  {
    id: 3,
    title: "Turing Block",
    subtitle: "Innovation Center",
    icon: "⚗️",
    img: turingImg,
    info: "Advanced equipment and research facilities for innovators and creators."
  },
  {
    id: 4,
    title: "Sportorium",
    subtitle: "Fitness & Recreation",
    icon: "🏋️‍♂️",
    img: sportoriumImg,
    info: "Indoor & outdoor sports with full gym, courts and training spaces."
  },
  {
    id: 5,
    title: "Exploratorium",
    subtitle: "Events & Performances",
    icon: "🎭",
    img: exploratoriumImg,
    info: "Large auditorium for events, fests and cultural performances."
  }
];

export default function LocationCards() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="location-cards-wrapper">
      {cards.map(card => (
        <div
          key={card.id}
          className="location-card"
          onMouseEnter={() => setHovered(card.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="card-icon">{card.icon}</div>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-sub">{card.subtitle}</p>

          {hovered === card.id && (
            <div className="card-hover-popup">
              <img src={card.img} alt="" className="popup-img" />
              <h4 className="popup-title">{card.title}</h4>
              <p className="popup-info">{card.info}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
