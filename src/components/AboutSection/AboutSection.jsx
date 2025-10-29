import React, { useEffect, useRef } from "react";
import "./AboutSection.css";

const AboutSection = () => {
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const statCards = statsRef.current?.querySelectorAll(".stat-card");
    const featureItems = featuresRef.current?.querySelectorAll(".feature-item");

    statCards?.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });

    featureItems?.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="stats" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Live Broadcasting</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">150+</div>
            <div className="stat-label">Countries Reached</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Industry Professionals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Events Covered</div>
          </div>
        </div>
      </section>

      <section className="features" id="about" ref={featuresRef}>
        <div className="section-header">
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">Your Gateway to Maritime Excellence</h2>
          <p className="section-subtitle">
            Industry-leading broadcasting with global reach and premium content
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrap">📺</div>
            <h3>24/7 Live Streaming</h3>
            <p>
              Access live maritime events, conferences, and industry updates
              around the clock from anywhere in the world.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap">🌊</div>
            <h3>Global Coverage</h3>
            <p>
              Comprehensive coverage of maritime activities, trade shows, and
              industry developments across the globe.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap">🎥</div>
            <h3>Premium Content</h3>
            <p>
              High-quality video archives featuring interviews, seminars, and
              special presentations from industry leaders.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap">📰</div>
            <h3>Latest News</h3>
            <p>
              Stay updated with breaking news, market trends, and important
              developments in the maritime sector.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap">🤝</div>
            <h3>Industry Network</h3>
            <p>
              Connect with maritime professionals, shipbuilders, and industry
              experts from around the world.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap">🏆</div>
            <h3>ISO Certified</h3>
            <p>
              ISO 9001:2015 certified company ensuring the highest standards of
              quality and service delivery.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
