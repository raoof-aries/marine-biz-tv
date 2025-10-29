import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="grid-bg"></div>
      <div className="float-elements">
        <div className="float-icon">🌊</div>
        <div className="float-icon">⚓</div>
        <div className="float-icon">🚢</div>
        <div className="float-icon">📡</div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <div className="status-dot"></div>
          <span>Broadcasting Live 24/7</span>
        </div>
        <h1>
          World's First
          <br />
          <span className="text-gradient">Marine TV Channel</span>
        </h1>
        <p className="hero-desc">
          Connecting the maritime world through innovative broadcasting and
          comprehensive coverage of global marine events, news, and insights.
        </p>
        <div className="hero-buttons">
          <a
            href="#live"
            className="btn btn-primary"
            onClick={(e) => handleNavClick(e, "#services")}
          >
            ▶ Watch Live
          </a>
          <a
            href="#about"
            className="btn btn-secondary"
            onClick={(e) => handleNavClick(e, "#about")}
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
