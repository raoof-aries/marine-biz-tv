import { useState, useEffect } from "react";
import { Modal, Loader } from "../../components";
import "./Events.css";

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch events
        const eventsResponse = await fetch(
          "https://www.marinebiztv.com/admin/api/services.php?action=events"
        );
        const eventsData = await eventsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch(
          "https://www.marinebiztv.com/admin/api/services.php?action=event_categories"
        );
        const categoriesData = await categoriesResponse.json();

        if (eventsData.status === "success") {
          setEvents(eventsData.data);
        }

        if (categoriesData.status === "success") {
          setCategories(categoriesData.data);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get category name
  const getCategoryName = (event) => {
    // If type_name exists, use it
    if (event.type_name) {
      return event.type_name;
    }

    // Otherwise, find category by type ID
    const category = categories.find((cat) => cat.id === event.type);
    return category ? category.category_name : event.type;
  };

  // Format date to display format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (timeFrom, timeTo) => {
    const formatTimeString = (time) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return `${formatTimeString(timeFrom)} - ${formatTimeString(timeTo)}`;
  };

  // Create filters from categories
  const filters = [
    { id: "upcoming", label: "Upcoming Events" },
    ...categories.map((cat) => ({
      id: cat.id,
      label: cat.category_name,
    })),
  ];

  // Filter events
  const filteredEvents =
    selectedFilter === "upcoming"
      ? events
      : events.filter((event) => event.type === selectedFilter);

  if (loading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }

  if (error) {
    return (
      <div className="events-page">
        <div
          className="events-container"
          style={{ padding: "4rem 0", textAlign: "center" }}
        >
          <p>Error loading events: {error}</p>
        </div>
      </div>
    );
  }

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
          {filteredEvents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p>No events found for this category.</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <article key={event.id} className="event-card">
                  <div className="event-card-image">
                    <img src={event.thumbnail_url} alt={event.event_name} />
                    <div className="event-card-overlay">
                      <div className="event-badges">
                        <span className="event-type-badge">
                          {getCategoryName(event)}
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
                          {formatDate(event.event_date)}
                        </div>
                        <div className="event-time">
                          {formatTime(event.duration_from, event.duration_to)}
                        </div>
                      </div>
                    </div>

                    <h3 className="event-card-title">{event.event_name}</h3>

                    {event.location && event.location !== "0" && (
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
                    )}

                    <p className="event-card-description">
                      {event.event_description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
