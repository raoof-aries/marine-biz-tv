import { useState, useEffect } from "react";
import { Modal, Loader } from "../../components";
import "./News.css";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsItems, setNewsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch news
        const newsResponse = await fetch(
          "https://blacksand.co.in/admin/api/services.php?action=news"
        );
        const newsData = await newsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch(
          "https://blacksand.co.in/admin/api/services.php?action=newsCategories"
        );
        const categoriesData = await categoriesResponse.json();

        if (newsData.status === "success") {
          setNewsItems(newsData.data);
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
  const getCategoryName = (newsItem) => {
    // If category_name exists, use it
    if (newsItem.category_name) {
      return newsItem.category_name;
    }

    // Otherwise, find category by news_type ID
    const category = categories.find((cat) => cat.id === newsItem.news_type);
    return category ? category.category_name : newsItem.news_type;
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

  // Create category filter list
  const categoryFilters = [
    { id: "all", label: "All" },
    ...categories.map((cat) => ({
      id: cat.id,
      label: cat.category_name,
    })),
  ];

  // Filter news
  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.news_type === selectedCategory);

  if (loading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <div
          className="news-container"
          style={{ padding: "4rem 0", textAlign: "center" }}
        >
          <p>Error loading news: {error}</p>
        </div>
      </div>
    );
  }

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
            {categoryFilters.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-grid-section">
        <div className="news-container">
          {filteredNews.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p>No news found for this category.</p>
            </div>
          ) : (
            <div className="news-grid">
              {filteredNews.map((item) => (
                <article key={item.id} className="news-card">
                  <div className="news-card-image">
                    <img src={item.thumbnail_url} alt={item.news_name} />
                    <div className="news-card-overlay">
                      <span className="news-category-badge">
                        {getCategoryName(item)}
                      </span>
                    </div>
                  </div>
                  <div className="news-card-content">
                    <div className="news-card-meta">
                      <span className="news-date">
                        {formatDate(item.news_date)}
                      </span>
                    </div>
                    <h3 className="news-card-title">{item.news_name}</h3>
                    <p className="news-card-excerpt">{item.news_description}</p>
                    <a
                      href={item.thumbnail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-read-more"
                    >
                      Read More
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
