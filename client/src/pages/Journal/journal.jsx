import React, { useState } from "react";
import "./journal.css";
import MainNavbar from "../../components/navbar/main_navbar";

import j1 from "../../assets/j1.mp4";
import j2 from "../../assets/j2.mp4";
import j3 from "../../assets/j3.jpg";
import j4 from "../../assets/j4.mp4";

export default function Journal() {
  // Each journal entry is a single page
  const journals = [j1, j2, j3, j4];

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' or 'prev'

  function flipNext() {
    if (currentPage < journals.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1000); // Smoother timing
    }
  }

  function flipPrev() {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1000); // Smoother timing
    }
  }

  function Media({ src, alt }) {
    if (!src) return null;

    const isVideo =
      src.endsWith(".mp4") ||
      src.endsWith(".webm") ||
      src.endsWith(".ogg");

    if (isVideo) {
      return (
        <video
          className="journal-media"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }

    return <img className="journal-media" src={src} alt={alt} />;
  }

  return (
    <div className="journal-root">
      <MainNavbar />

      <header className="journal-header">
        Our Journals — From The Books of Our Students
      </header>

      <div className="journal-controls">
        <button
          className="journal-btn"
          onClick={flipPrev}
          disabled={currentPage === 0 || isFlipping}
        >
          ◀ Previous
        </button>

        <span className="page-counter">
          Page {currentPage + 1} / {journals.length}
        </span>

        <button
          className="journal-btn"
          onClick={flipNext}
          disabled={currentPage === journals.length - 1 || isFlipping}
        >
          Next ▶
        </button>
      </div>

      <div className="journal-container">
        <div className="book-wrapper">
          {/* Book spine */}
          <div className="book-spine"></div>

          {/* Left page (static background) */}
          <div className="book-page book-page-left">
            <div className="page-content">
              {currentPage === 0 ? (
                <div className="journal-title-page">
                  <div className="decorative-corner top-left"></div>
                  <div className="decorative-corner top-right"></div>
                  <div className="decorative-corner bottom-left"></div>
                  <div className="decorative-corner bottom-right"></div>

                  <div className="title-content">
                    <div className="journal-main-title">
                      Our Journal
                    </div>
                    <div className="title-underline"></div>
                    <div className="journal-caption">
                      Capturing memories, one page at a time ✨
                    </div>
                    <div className="journal-subtitle">
                      Stories from the hearts of Chitkara students
                    </div>
                  </div>

                  <div className="decorative-flourish">
                    <svg viewBox="0 0 100 20" width="100" height="20">
                      <path d="M0,10 Q25,0 50,10 T100,10" stroke="#621414" strokeWidth="0.5" fill="none" opacity="0.3" />
                    </svg>
                  </div>
                </div>
              ) : (
                <Media src={journals[currentPage - 1]} alt="Previous page" />
              )}
            </div>
          </div>

          {/* Flipping page */}
          <div className={`book-page book-page-flip ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
            <div className="page-front">
              <Media src={journals[currentPage]} alt="Current page front" />
            </div>
            <div className="page-back">
              {currentPage < journals.length - 1 && (
                <Media src={journals[currentPage + 1]} alt="Current page back" />
              )}
            </div>
          </div>

          {/* Right page (static) */}
          <div className="book-page book-page-right">
            <div className="page-content">
              {currentPage < journals.length - 1 && (
                <Media src={journals[currentPage + 1]} alt="Next page" />
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 Chitkara Diaries — All Rights Reserved
      </footer>
    </div>
  );
}
