import { useState, useEffect } from "react";
import "./LiveTv.css";

const LiveTv = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [modalData, setModalData] = useState({
    isOpen: false,
    videoUrl: "",
    title: "",
  });
  const [liveVideoSrc, setLiveVideoSrc] = useState(
    "https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV&autoplay=1&muted=1"
  );

  const videoArchives = [
    {
      id: 1,
      title: "GAIP Live: Tech Talk Wednesday",
      description:
        "Weekly discussion on emerging technologies, AI developments, and industry insights with special guests.",
      duration: "1:24:17",
      category: "tech-talk",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=1",
    },
    {
      id: 2,
      title: "Morning Show: Community Updates",
      description:
        "Latest updates from the GAIP community, project showcases, and upcoming events discussion.",
      duration: "45:32",
      category: "community",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=2",
    },
    {
      id: 3,
      title: "Live Coding Session: React Development",
      description:
        "Building a real-time dashboard with React, WebSockets, and modern development practices.",
      duration: "2:15:48",
      category: "coding",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: null,
    },
    {
      id: 4,
      title: "GAIP News Tonight",
      description:
        "Evening news roundup covering tech industry updates, market analysis, and community highlights.",
      duration: "38:29",
      category: "news",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=4",
    },
    {
      id: 5,
      title: "Weekend Workshop: Digital Marketing",
      description:
        "Comprehensive guide to digital marketing strategies, SEO best practices, and social media optimization.",
      duration: "1:52:15",
      category: "workshop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=5",
    },
    {
      id: 6,
      title: "Friday Q&A: Ask the Experts",
      description:
        "Open Q&A session where community members get answers from industry experts and GAIP team members.",
      duration: "1:07:43",
      category: "community",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: null,
    },
    {
      id: 7,
      title: "Special Event: Product Launch",
      description:
        "Exclusive launch event showcasing new GAIP features, roadmap updates, and interactive demonstrations.",
      duration: "1:33:21",
      category: "events",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=7",
    },
    {
      id: 8,
      title: "Tutorial Tuesday: Web Development",
      description:
        "Step-by-step tutorial on building modern web applications with the latest frameworks and tools.",
      duration: "1:18:56",
      category: "coding",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://picsum.photos/320/180?random=8",
    },
  ];

  const categories = {
    all: "All Videos",
    "tech-talk": "Tech Talk",
    community: "Community",
    coding: "Coding",
    news: "News",
    workshop: "Workshop",
    events: "Events",
  };

  const openModal = (videoUrl, title) => {
    setLiveVideoSrc("");
    setModalData({ isOpen: true, videoUrl: videoUrl + "?autoplay=1", title });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalData({ isOpen: false, videoUrl: "", title: "" });
    setLiveVideoSrc(
      "https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV&autoplay=1&muted=1"
    );
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredArchives =
    currentFilter === "all"
      ? videoArchives
      : videoArchives.filter((archive) => archive.category === currentFilter);

  return (
    <div className="live-tv-wrapper">
      {/* Animated Background */}
      <div className="live-tv-bg-animation">
        <div className="live-tv-orb live-tv-orb-1"></div>
        <div className="live-tv-orb live-tv-orb-2"></div>
        <div className="live-tv-orb live-tv-orb-3"></div>
      </div>

      <div className="live-tv-main-wrapper">
        {/* Video Section */}
        <section className="live-tv-video-section">
          {/* <a className="live-tv-back-button" href="https://gaip.co/">
            <span>←</span>
            <p>Back to Home</p>
          </a> */}
          {/* <h1 className="live-tv-page-title">GAIP Live TV</h1> */}
          <div className="live-tv-video-container">
            {liveVideoSrc && (
              <iframe
                className="live-tv-video-frame"
                src={liveVideoSrc}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="live-tv-scroll-indicator">
            <span>Scroll for Archives</span>
            <span>↓</span>
          </div>
        </section>

        {/* Transition Element */}
        {/* <div className="live-tv-transition-element"></div> */}

        {/* Archives Section */}
        <section className="live-tv-archives-section">
          <div className="live-tv-archives-header">
            <h2 className="live-tv-archives-title">Video Archives</h2>
            <div className="live-tv-category-filter">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  className={`live-tv-filter-button ${
                    currentFilter === key ? "active" : ""
                  }`}
                  onClick={() => setCurrentFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="live-tv-archives-grid">
            {filteredArchives.map((archive) => (
              <div
                key={archive.id}
                className={`live-tv-archive-card visible`}
                onClick={() => openModal(archive.videoUrl, archive.title)}
              >
                <div
                  className={`live-tv-card-thumbnail ${
                    !archive.thumbnailUrl ? "no-image" : ""
                  }`}
                  style={
                    archive.thumbnailUrl
                      ? { backgroundImage: `url('${archive.thumbnailUrl}')` }
                      : {}
                  }
                >
                  {!archive.thumbnailUrl && (
                    <span style={{ fontSize: "2rem" }}>🎥</span>
                  )}
                  <div className="live-tv-card-category">
                    {categories[archive.category] || archive.category}
                  </div>
                  <div className="live-tv-card-duration">
                    {archive.duration}
                  </div>
                </div>
                <h3 className="live-tv-card-title">{archive.title}</h3>
                <p className="live-tv-card-description">
                  {archive.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {modalData.isOpen && (
        <div className="live-tv-modal show" onClick={closeModal}>
          <div
            className="live-tv-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="live-tv-modal-header">
              <h3 className="live-tv-modal-title">{modalData.title}</h3>
              <button className="live-tv-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="live-tv-modal-video-container">
              <iframe
                className="live-tv-modal-video"
                src={modalData.videoUrl}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTv;
