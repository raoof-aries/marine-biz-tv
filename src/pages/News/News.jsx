import { useState } from "react";
import "./News.css";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsItems = [
    {
      id: 1,
      category: "Technology",
      title:
        "Harnessing AI-enabled Transport into Latin-European Market for Peace and Modernity connectivity for global growth",
      date: "November 2, 2025",
      excerpt:
        "Estonian Maritime, a leading provider of transport communication and maritime technology solutions, is excited to announce a significant expansion into the Asia-Pacific (APAC) offering enhanced satellite-based connectivity and...",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      id: 2,
      category: "Summit",
      title:
        "SQA's Maritime HR & Crew Management Summit: The Premier Maritime Industry Event",
      date: "October 28, 2025",
      excerpt:
        "London, United Kingdom - [15th October, 2025]—SQA, a leading event organizer, is thrilled to announce the SQA's premier 25th Maritime HR & Crew Management Summit, taking place on the 27th of January at...",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
    {
      id: 3,
      category: "Summit",
      title: "25th Maritime HR & Crew Management Summit",
      date: "October 25, 2025",
      excerpt:
        "Copenhagen-Global News: SQA Marklines HR & Crew Management Summit Panel and debate: HR, & Mgr of Seabase 2025 London, UK, Saturday, 18.01.2025 Mr. Mark Cruise, managing director London Sweden...",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
    {
      id: 4,
      category: "Conference",
      title:
        "NAMEPA's Safety at Sea Seminar Addresses Climate Change and New Vessel Models",
      date: "October 20, 2025",
      excerpt:
        "The North American Marine Environment Protection Association announced that it will be hosting its annual Safety at Sea Seminar event at The Astor Conference Center in Washington DC, on Thursday, 14th November 2025...",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      id: 5,
      category: "Awards",
      title: "4th Annual Business Talent Awards",
      date: "October 15, 2025",
      excerpt:
        "GIP Worlds, away the first ever June 20 Ever Zone! (USA) will announce at the Business Talent Awards. Fifteen Hundred (100) newly cars, joining them in their Global 6 Industry! Awards the Marine Maritime...",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    },
    {
      id: 6,
      category: "Environment",
      title:
        "NAMEPA 2025 SNAPPS: Series Celebrating 50 Years of Protecting the Marine Environment",
      date: "October 10, 2025",
      excerpt:
        "The world's 50 years ago saw the convention that created NAMEPA in 1973. To mark the 50 Anniversary of MARPOL, the North American Marine Environment Protection Association NAMEPA will be hosting...",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
  ];

  const categories = [
    "all",
    "Technology",
    "Summit",
    "Conference",
    "Awards",
    "Environment",
  ];

  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="news-page">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero-content">
          <span className="section-tag">Maritime News</span>
          <h1 className="news-hero-title">
            Stay Updated with{" "}
            <span className="text-gradient">Maritime Excellence</span>
          </h1>
          <p className="news-hero-subtitle">
            Connecting the maritime world through innovative broadcasting and
            comprehensive coverage of global marine events, news, and insights.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="news-filter-section">
        <div className="news-container">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-grid-section">
        <div className="news-container">
          <div className="news-grid">
            {filteredNews.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="news-card-overlay">
                    <span className="news-category-badge">{item.category}</span>
                  </div>
                </div>
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <span className="news-date">{item.date}</span>
                  </div>
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-excerpt">{item.excerpt}</p>
                  <a href="#" className="news-read-more">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="news-newsletter">
        <div className="news-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="newsletter-title">Stay in the Loop</h2>
              <p className="newsletter-subtitle">
                Subscribe to our newsletter for the latest maritime news and
                insights delivered directly to your inbox.
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="btn btn-primary newsletter-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default News;
