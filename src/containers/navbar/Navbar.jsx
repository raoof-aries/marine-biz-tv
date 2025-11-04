import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Check if it's a route (starts with /) or an anchor link (starts with #)
    if (href.startsWith("/")) {
      // Navigate to the route
      navigate(href);
      setMobileMenuOpen(false);
    } else {
      // Scroll to anchor on current page
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        <a href="/" className="logo">
          <img src={Logo} alt="Marine Biz Tv Logo" className="logo-img" />
        </a>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
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
            <a href="/live" onClick={(e) => handleNavClick(e, "/live")}>
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
