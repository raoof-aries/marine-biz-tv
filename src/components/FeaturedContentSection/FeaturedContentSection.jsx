import React from "react";
import "./FeaturedContentSection.css";

const FeaturedContentSection = () => {
  return (
    <section className="video-section" id="services">
      <div className="section-header">
        <div className="section-tag">Featured Content</div>
        <h2 className="section-title">Experience Marine BizTV</h2>
        <p className="section-subtitle">
          Immersive maritime broadcasting at your fingertips
        </p>
      </div>
      <div className="video-wrap">
        <div className="video-glow"></div>
        <div className="video-placeholder">
          <div className="play-circle"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
