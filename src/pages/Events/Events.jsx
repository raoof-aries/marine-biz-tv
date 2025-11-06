import { useState } from "react";
import "./Events.css";

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");

  const events = [
    {
      id: 1,
      title: "Maritime HR & Crew Management Summit 2025",
      date: "2025-11-20",
      displayDate: "November 20, 2025",
      time: "09:00 AM - 05:00 PM",
      location: "London, United Kingdom",
      type: "Summit",
      status: "upcoming",
      description:
        "Join industry leaders for a comprehensive discussion on maritime human resources, crew management best practices, and the future of maritime workforce development.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      attendees: "500+",
    },
    {
      id: 2,
      title: "Global Marine Technology Conference",
      date: "2025-11-28",
      displayDate: "November 28-30, 2025",
      time: "08:00 AM - 06:00 PM",
      location: "Singapore",
      type: "Conference",
      status: "upcoming",
      description:
        "Explore cutting-edge maritime technologies, AI integration in shipping, and sustainable solutions for the future of marine transportation.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      attendees: "800+",
    },
    {
      id: 3,
      title: "NAMEPA Safety at Sea Seminar",
      date: "2025-12-05",
      displayDate: "December 5, 2025",
      time: "10:00 AM - 04:00 PM",
      location: "Washington DC, USA",
      type: "Seminar",
      status: "upcoming",
      description:
        "Annual safety seminar addressing climate change impacts, new vessel regulations, and environmental protection in maritime operations.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      attendees: "300+",
    },
    {
      id: 4,
      title: "International Propeller Club Networking Event",
      date: "2025-12-12",
      displayDate: "December 12, 2025",
      time: "06:00 PM - 09:00 PM",
      location: "Athens, Greece",
      type: "Networking",
      status: "upcoming",
      description:
        "Connect with maritime professionals, shipowners, and industry stakeholders in an exclusive networking evening celebrating maritime excellence.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      attendees: "250+",
    },
    {
      id: 5,
      title: "Marine Environment Protection Awards",
      date: "2025-12-18",
      displayDate: "December 18, 2025",
      time: "07:00 PM - 11:00 PM",
      location: "Oslo, Norway",
      type: "Awards",
      status: "upcoming",
      description:
        "Celebrating 50 years of MARPOL and recognizing outstanding contributions to marine environment protection and sustainable maritime practices.",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      attendees: "400+",
    },
    {
      id: 6,
      title: "Decarbonization & Green Shipping Expo",
      date: "2026-01-15",
      displayDate: "January 15-17, 2026",
      time: "09:00 AM - 06:00 PM",
      location: "Rotterdam, Netherlands",
      type: "Expo",
      status: "upcoming",
      description:
        "Discover innovative solutions for maritime decarbonization, alternative fuels, and green shipping technologies shaping the industry's sustainable future.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      attendees: "1000+",
    },
  ];

  const filters = [
    { id: "upcoming", label: "Upcoming Events" },
    { id: "summit", label: "Summits" },
    { id: "conference", label: "Conferences" },
    { id: "networking", label: "Networking" },
  ];

  const filteredEvents =
    selectedFilter === "upcoming"
      ? events
      : events.filter((event) => event.type.toLowerCase() === selectedFilter);

  return (
    <div className="events-page">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="events-hero">
        <div className="events-hero-content">
          <span className="section-tag">Marine Events</span>
          <h1 className="events-hero-title">
            Discover{" "}
            <span className="text-gradient">Upcoming Maritime Events</span>
          </h1>
          <p className="events-hero-subtitle">
            Connect with industry leaders, expand your network, and stay ahead
            of maritime trends at premier global events.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="events-stats">
        <div className="events-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="stat-value">{events.length}+</div>
              <div className="stat-label">Upcoming Events</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-value">3000+</div>
              <div className="stat-label">Expected Attendees</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="stat-value">150+</div>
              <div className="stat-label">Countries Represented</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Filter Section */}
      <section className="events-filter-section">
        <div className="events-container">
          <div className="event-filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${
                  selectedFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-grid-section">
        <div className="events-container">
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-card-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-card-overlay">
                    <div className="event-badges">
                      <span className="event-type-badge">{event.type}</span>
                      <span className="event-attendees-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="event-card-content">
                  <div className="event-date-section">
                    <div className="event-date-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="event-date-info">
                      <div className="event-display-date">
                        {event.displayDate}
                      </div>
                      <div className="event-time">{event.time}</div>
                    </div>
                  </div>

                  <h3 className="event-card-title">{event.title}</h3>

                  <div className="event-location">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </div>

                  <p className="event-card-description">{event.description}</p>

                  {/* <div className="event-card-actions">
                    <a href="#" className="event-learn-more">
                      Learn More
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <button className="event-register-btn btn btn-primary">
                      Register Now
                    </button>
                  </div> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="events-cta">
        <div className="events-container">
          <div className="cta-content">
            <h2 className="cta-title">Want to Host an Event with Us?</h2>
            <p className="cta-subtitle">
              Partner with Marine BizTV to broadcast your maritime event to a
              global audience and maximize your reach.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Get in Touch</button>
              {/* <button className="btn btn-secondary">
                View Partnership Options
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
