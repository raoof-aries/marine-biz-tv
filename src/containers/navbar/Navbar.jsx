import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        <div className="logo">MarineBizTV</div>
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              About
            </a>
          </li>
          <li>
            <a href="#services" onClick={(e) => handleNavClick(e, "#services")}>
              Services
            </a>
          </li>
          <li>
            <a href="#live" onClick={(e) => handleNavClick(e, "#live")}>
              Live TV
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
