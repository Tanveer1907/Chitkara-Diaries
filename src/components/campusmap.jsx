import React from "react";
import mapImg from "../assets/chitkara_map.jpg";
import "./../pages/Home/homepage.css";

export default function CampusMap() {
  // REAL 360 LINKS
  const links = {
    library:
      "https://cloud-sg.insta360.com/share/sg/3v2Y4r7w84777X4R4301649920/player?mediaId=324787689624702976&businessId=324787744385536000",

    square:
      "https://cloud-sg.insta360.com/share/sg/38234o7X8m7w41338268452864/player?mediaId=324787176153808896&businessId=324787438335561728",

    alpha:
      "https://cloud-sg.insta360.com/share/sg/3u2S4Y7C82755R9p7001883648/player?mediaId=324787534791966720&businessId=324787597098352640",

    turing:
      "https://cloud-sg.insta360.com/share/sg/3z212w2q3o2y288v0913285120/player?mediaId=322232257051889664&businessId=322232281018142720",
  };

  const locations = [
    { name: "Square One", top: "20%", left: "72%", link: links.square },
    { name: "Turing Block", top: "30%", left: "30%", link: links.turing },
    { name: "Central Library", top: "29%", left: "45%", link: links.library },
    { name: "Alpha Zone", top: "75%", left: "75%", link: links.alpha },
  ];

  return (
    <div className="static-map-container">
      <div className="map-wrapper">
        <img src={mapImg} className="static-map-img" alt="Campus Map" />

        {locations.map((loc, i) => (
          <div
            key={i}
            className="pin"
            style={{ top: loc.top, left: loc.left }}
          >
            <div
              className="pin-inner"
              onClick={() => window.open(loc.link, "_blank")}
            ></div>

            <div className="pin-popup">
              <h4>{loc.name}</h4>
              <p>Click to explore 360° view</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
