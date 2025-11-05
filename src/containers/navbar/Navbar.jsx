import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Whenever location (pathname or hash) changes, handle scrolling:
  useEffect(() => {
    // If we have a hash (e.g. #contact), try to scroll to that element.
    if (location.hash) {
      // Small timeout to allow DOM updates after navigation
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Fallback: scroll to top if element not found
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      // No hash -> scroll to top of page
      // Use instant when navigating between routes if you prefer no smooth, change behavior.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Anchor on same page: "#about", "#home" etc.
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If anchor not found, still scroll to top as a safe fallback
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setMobileMenuOpen(false);
      return;
    }

    // Route or route+hash (e.g. "/news", "/#contact")
    if (href.startsWith("/")) {
      // navigate to the route (including hash if present)
      navigate(href);
      setMobileMenuOpen(false);
      return;
    }

    // Fallback — just navigate normally
    navigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container">
        {/* Use handleNavClick so clicking logo always scrolls to top */}
        <a href="/" className="logo" onClick={(e) => handleNavClick(e, "/")}>
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
            <a href="/" onClick={(e) => handleNavClick(e, "/")}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, "/#about")}>
              About
            </a>
          </li>
          <li>
            <a href="/news" onClick={(e) => handleNavClick(e, "/news")}>
              News
            </a>
          </li>
          <li>
            <a href="/events" onClick={(e) => handleNavClick(e, "/events")}>
              Events
            </a>
          </li>
          <li>
            <a href="/live" onClick={(e) => handleNavClick(e, "/live")}>
              Live TV
            </a>
          </li>
          <li>
            <a
              href="/live#videoArchives"
              onClick={(e) => handleNavClick(e, "/live#videoArchives")}
            >
              Video Archives
            </a>
          </li>
          <li>
            {/* cross-page anchor: navigate to "/" with hash so the useEffect handles scrolling */}
            <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
