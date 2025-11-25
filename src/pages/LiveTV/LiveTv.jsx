import { useState, useEffect } from "react";
import { Modal, Loader } from "../../components";
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
  const [videoArchives, setVideoArchives] = useState([]);
  const [categories, setCategories] = useState({ all: "All Videos" });
  const [loading, setLoading] = useState(true);

  // Fetch video archives and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both APIs in parallel
        const [archivesRes, categoriesRes] = await Promise.all([
          fetch(
            "https://blacksand.co.in/admin/api/services.php?action=videoarchives"
          ),
          fetch(
            "https://blacksand.co.in/admin/api/services.php?action=videoArchivesCategories"
          ),
        ]);

        const archivesData = await archivesRes.json();
        const categoriesData = await categoriesRes.json();

        // Process categories
        if (categoriesData.status === "success") {
          const categoryMap = { all: "All Videos" };
          categoriesData.data.forEach((cat) => {
            categoryMap[cat.id] = cat.category_name;
          });
          setCategories(categoryMap);
        }

        // Process video archives
        if (archivesData.status === "success") {
          const processedArchives = archivesData.data.map((video) => {
            // Convert YouTube URL to embed format
            let embedUrl = video.video_url;
            if (video.video_url.includes("youtu.be")) {
              const videoId = video.video_url.split("/").pop();
              embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (video.video_url.includes("youtube.com/watch")) {
              const videoId = new URL(video.video_url).searchParams.get("v");
              embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (video.video_url.includes("vimeo.com")) {
              const videoId = video.video_url.split("/").pop();
              embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }

            return {
              id: video.id,
              title: video.video_title,
              description: video.video_description,
              duration: video.video_duration || "N/A",
              category: video.video_type,
              videoUrl: embedUrl,
              thumbnailUrl: video.thumbnail_url,
            };
          });
          setVideoArchives(processedArchives);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }

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

        {/* Archives Section */}
        <section className="live-tv-archives-section" id="videoArchives">
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
            {filteredArchives.length > 0 ? (
              filteredArchives.map((archive) => (
                <div
                  key={archive.id}
                  className="live-tv-archive-card visible"
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
                      {categories[archive.category] || "Uncategorized"}
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
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "2rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                No videos found in this category.
              </p>
            )}
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
